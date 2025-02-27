// Taken from a cell in the book which hasn't been converted by Thebe yet
// This gets converted into an empty Thebe cell when calling the render function on it
const newCellHtml = `<div class="cell docutils container">
<div class="cell_input docutils container">
<div class="highlight-ipython3 notranslate"><div class="highlight"><pre id="codecell0"></pre>
</div></div></div></div>`;

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

function setupNewCell(source, output, code) {
  // https://github.com/executablebooks/thebe/blob/main/packages/thebe/src/types.ts
  const newCellInfo = {
    id: thebe.randomId(),
    placeholders: {
      output: output,
      source: source,
    },
  };

  // This will crash if we don't have any real cells in our notebook.
  // In the future we can to add a dummy cell during initialization and then remove it
  const newNotebookCell = new thebeCore.module.ThebeCodeCell(
    newCellInfo.id, // Cell Id
    thebe.notebook.id, // Notebook ID
    code, // Source code
    thebe.notebook.events._config, // Config, metadata and rendermine are the same for all cells, safe to take from the example
    thebe.notebook.metadata,
    thebe.notebook.rendermime
  );

  // Manually attach kernel session
  // The attachSession function only sends out a couple of events we don't care about
  newNotebookCell.session = thebe.notebook.session;

  thebe.notebook.cells.push(newNotebookCell);

  return { newCellInfo, newNotebookCell };
}

function addToThebeControls(cell, element) {
  const controls = cell.querySelector(".thebe-controls");
  if (controls == null) return; // Cell input likely removed
  controls.insertBefore(element, controls.lastChild);
}

function getNotebookCellOfCodeCell(codeCell) {
  const cellId = codeCell
    .querySelector("[data-thebe-id]") // Once rendered a cell has a data-thebe-id attached to it
    .getAttribute("data-thebe-id"); // This corresponds to the id in the notebook
  return thebe.notebook.cells.find((cell) => cell.id === cellId);
}

function finalizeCodeCells(cells) {
  const createButton = (classList, title, text) => {
    const button = document.createElement("button");
    button.classList = classList;
    button.title = title;
    button.innerText = text;
    return button;
  };

  cells.forEach((codeCell, index) => {
    const addCell = createButton(
      ["thebe-button"],
      "adds a new cell underneath",
      "add cell"
    );
    addToThebeControls(codeCell, addCell);

    const clear = createButton(
      ["thebe-button"],
      "clear the output of the cell",
      "clear"
    );
    addToThebeControls(codeCell, clear);

    clear.onclick = () => {
      const notebookCell = getNotebookCellOfCodeCell(codeCell);
      notebookCell.clear();
    };

    addCell.onclick = () => {
      const newCell = createElementFromHTML(newCellHtml);
      codeCell.parentElement.insertBefore(newCell, codeCell.nextSibling);

      // Source is the actual code part of it, we don't want the container bits to be replaced
      const { newCellInfo, newNotebookCell } = setupNewCell(
        newCell.querySelector("pre"),
        undefined,
        ""
      );

      // Turns the code section of the cell into an interactive Thebe cell
      thebe.renderAllCells(
        {
          mountRunButton: true,
          mountRunAllButton: true,
        },
        thebe.notebook, // Notebook
        [newCellInfo] // Cell IDs
      );

      finalizeCodeCells([newCell]); // Add in all extra buttons

      const deleteCell = createButton(
        ["thebe-button"],
        "deletes this cell",
        "delete cell"
      );
      addToThebeControls(newCell, deleteCell);
      deleteCell.onclick = () => {
        newCell.remove();
        let cells = thebe.notebook.cells;
        // Remove cell from notebook too, otherwise their side-effects will still be present when running all
        cells.splice(
          cells.findIndex((cell) => cell.id === newCellInfo.id),
          1
        );
      };
    };
  });
}

function updateThebeButtonStatus(msg, loading = true) {
  const spinner =
    '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div></div>';
    document.querySelector(".thebe-launch-button ").innerHTML = 
    (loading ? spinner : "") + `<span class='status'>${msg}</span>`;
}

/**
 * Add attributes to Thebe blocks to initialize thebe properly
 */
var configureThebe = (thebe_config_obj) => {
  // If we already detect a Thebe cell, don't re-run
  if (document.querySelectorAll("div.thebe-cell").length > 0) {
    return;
  }

  thebe_config = thebe_config_obj;

  // Update thebe buttons with loading message
  updateThebeButtonStatus("Initializing Thebe");

  // Set thebe event hooks
  thebelab.on("status", function (evt, data) {
    console.log("Status changed:", data.status, data.message);

    updateThebeButtonStatus(
      `<span class='launch_msg'>Launching Pyodide kernel: </span><span class='status'>` +
        data.status +
        "</span>"
    );

    if (data.status === "attached") {
      updateThebeButtonStatus(`Waiting for packages to load...`);

      thebelab.events.listeners.status.clear(); // Remove further status message handling
    }
  });
};

/**
 * Update the page DOM to use Thebe elements
 */
var modifyDOMForThebe = () => {
  // We remove all pre-existing cell output because they play poorly with Thebe
  // This also means we need special tracking for cells with removed input because no HTML is generated for their input
  // Hopefully we can achieve this with minimal changes and a special new tag
  // Find all code cells, replace with Thebe interactive code cells

  document.querySelectorAll(".keep").forEach((kept, _) => {
    kept.previousClasses = { ...kept.classList };
    kept.classList.remove(...removedSelectorClasses);
  });

  const cellOutputs = document.querySelectorAll(".cell_output");
  cellOutputs.forEach((output, index) => {
    if (output) {
      output.remove();
    }
  });

  const codeCells = document.querySelectorAll(thebe_selector);
  codeCells.forEach((codeCell, index) => {
    const codeCellId = (index) => `codecell${index}`;
    codeCell.id = codeCellId(index);
    codeCellText = codeCell.querySelector(thebe_selector_input);
    codeCellOutput = codeCell.querySelector(thebe_selector_output);

    // Clean up the language to make it work w/ CodeMirror and add it to the cell
    dataLanguage = detectLanguage(kernelName);

    // Re-arrange the cell and add metadata
    if (codeCellText) {
      codeCellText.setAttribute("data-language", dataLanguage);
      codeCellText.setAttribute("data-executable", "true");
    }

    // Remove sphinx-copybutton blocks, which are common in Sphinx
    codeCell.querySelectorAll("button.copybtn").forEach((el) => {
      el.remove();
    });
  });
};

const loadScriptAsync = async (scriptSource) => {
  console.debug(`Loading script: ${scriptSource}`);
  const script = document.createElement("script");
  script.src = `${scriptSource}`;
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.addEventListener("load", () => {
      resolve();
    });
  });
};

const loadStyleAsync = async (styleSource) => {
  const css = document.createElement("link");
  css.href = styleSource;
  css.rel = "stylesheet";
  document.head.appendChild(css);

  return new Promise((resolve, reject) => {
    css.addEventListener("load", () => {
      resolve();
    });
  });
};

// This function overrides the lookup behaviour inside the Emscripten filesystem:
// https://emscripten.org/docs/api_reference/Filesystem-API.html
// This allows us to lazily fetch files as needed so that Thebe feels like a local notebook
// The lazy strategy reduces the number of requests made to the server, but does have some limitations:
// 1. Imports don't work unless done aggressively (which is implemented, but there are likely breaking edge cases)
// 2. Listing files in the directory will not give an accurate overview of what you can access
// 3. Libraries may do unexpected things that do not work well with the lazy strategy e.g. listing the files before opening them
function override_pyodide_lookup(fs, server_path) {
  // This home was chosen outside the default because:
  // 1. The default /drive home is a mount which does not play well with certain file operations
  // 2. I thought it would help fetching py files from root, but that returns index.html instead of the directory listing
  // This means py files inside the root folder of the server cannot be loaded implcitly, but you can still use open etc. to fetch them
  // NOTE: The LACK of slash at the end is important, keep it that way if you change anything.
  const home = "/home/pyodide/book";

  // Create a file from the string without using the writeFile method
  // writeFile calls lookupPath, which may cause infinite recursion?? (haven't tested)
  function createFileFromString(parentPath, name, string) {
    const parentNode = fs.lookupPath(parentPath).node;

    // 33206 and 0 come from scraping the values used by writeFile
    const node = parentNode.node_ops.mknod(parentNode, name, 33206, 0);

    // Create file here and populate it
    const stream = fs.createStream({
      node: node,
      path: parentPath + "/" + name,
      flags: 1,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      ungotten: [],
      error: false,
    });
    const buffer = new TextEncoder().encode(string);
    stream.stream_ops.write(stream, buffer, 0, buffer.byteLength, 0, true);

    fs.close(stream);
  }

  // Takes a list of directory names which form a path and ensures they all exist
  // This will also aggressively load .py files to ensure importing works as expected
  function createDirectoryStructure(directories) {
    let currentDirectory = "/";
    for (const directory of directories) {
      if (directory === "") continue;
      currentDirectory += directory + "/";
      try {
        fs.mkdir(currentDirectory);
      } catch {}
    }
  }

  // Mirroring the underlying directory structure allows relative pathing to work properly
  const mirroredDirectory = home + server_path;
  createDirectoryStructure(mirroredDirectory.split("/"));
  fs.chdir(mirroredDirectory);

  const old_lookup = fs.lookupPath;
  function new_lookup(path, opts = {}) {
    // Being called from writeFile, or in write mode, we don't want to load in that case
    // This catches any errors caused by things like missing directories
    try {
      return old_lookup(path, opts);
    } catch (exception) {
      // If we're trying to fetch files from outside home, we throw an error since the file wasn't found previously.
      if (!path.startsWith(home)) {
        throw exception;
      }

      const fullPath = path;
      path = path.slice(home.length);

      const pathList = fullPath.split("/");
      const name = pathList[pathList.length - 1]; // Name of file
      const parentPathList = pathList.slice(0, -1); // List of all parent directories

      let request = new XMLHttpRequest();
      request.open("GET", path, false);
      request.send();

      if (request.status !== 200) {
        throw exception;
      }
      createDirectoryStructure(parentPathList);
      createFileFromString(parentPathList.join("/"), name, request.response);
      return old_lookup(fullPath, opts);
    }
  }
  fs.lookupPath = new_lookup;
}

async function runInitCells() {
  const thebeInitCells = document.querySelectorAll(
    ".thebe-init, .tag_thebe-init"
  );
  for (const cell of thebeInitCells) {
    console.log("Initializing Thebe with cell: " + cell.id);
    const notebookCell = getNotebookCellOfCodeCell(cell);

    // Emulate clicking the run button, with more information about execution
    thebe.setButtonsBusy(notebookCell.id);
    await notebookCell.execute();
    thebe.clearButtonsBusy(notebookCell.id);
  }
}

function wrapNakedOutput(element) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("cell_output", "container");
  wrapper.appendChild(element);
  return wrapper;
}

function setupSpecialTaggedElements() {
  for (const taggedElement of window.specialTaggedElements) {
    switch (taggedElement.tag) {
      case "thebe-remove-input-init": {
        taggedElement.element.style.display = "block";

        const cell_input_div =
          taggedElement.element.querySelector(".cell_input");
        cell_input_div.classList.remove("cell_input");
        cell_input_div
          .querySelector(".highlight")
          ?.classList.remove("highlight");
        cell_input_div.querySelector(".thebe-input")?.remove();

        const cell_controls = cell_input_div.querySelector(".thebe-controls");
        if (cell_controls) {
          cell_controls.style.display = "none";
        }

        break;
      }
      case "read-only": {
        const codemirror = taggedElement.element.querySelector(".CodeMirror");
        codemirror.style.filter = "brightness(90%)";
        
        const textarea = taggedElement.element.querySelector("textarea");
        textarea.setAttribute("disabled", "true");

        break;
      }
      default: {
        console.error(`Unrecognized special tag: ${taggedElement.tag}`);
      }
    }
  }
}

// Moves output of hide-input cells to after the drop down menu, this makes more sense
// since we don't want to hide the output as well
function moveHideInputOutput() {
  const taggedCells = document.querySelectorAll(".tag_hide-input");
  for (const cell of taggedCells) {
    const outputArea = cell.querySelector(".jp-OutputArea");
    cell.appendChild(wrapNakedOutput(outputArea));
  }
}

var initThebe = async () => {
  // Remove Rocket now that we're initializing
  document.querySelector(".dropdown-launch-buttons").remove();

  // Add the launch info to the top bar
  document.querySelector(".header-article-items__end .header-article-item").prepend(
    document.querySelector(".thebe-launch-button")
  );

  console.log("[sphinx-thebe]: Loading thebe...");
  document.querySelector(".thebe-launch-button ").innerText = "Loading thebe...";

  const THEBE_CONFIG = JSON.parse(
    document.querySelector("script[type=\"text/x-thebe-config\"]").text
  );
  console.log("thebe configuration:", THEBE_CONFIG);

  await loadScriptAsync(`${THEBE_CONFIG.rootPath}/_static/thebe-lite.min.js `);
  await loadScriptAsync(`${THEBE_CONFIG.rootPath}/_static/index.js`);

  // Runs once the script has finished loading
  console.log("[sphinx-thebe]: Finished loading thebe...");
  configureThebe(THEBE_CONFIG);
  modifyDOMForThebe();
  await thebelab.bootstrap(THEBE_CONFIG);

  setupSpecialTaggedElements();

  document.querySelectorAll(".keep").forEach((kept, _) => {
    //console.log(Object.valueskept.previousClasses);
    Object.values(kept.previousClasses).forEach((clas, _) =>
      kept.classList.add(clas)
    );
  });

  finalizeCodeCells(document.querySelectorAll(thebe_selector));

  // Runs override_pyodide_lookup on the web worker
  // We can't access the web worker directly, but we can execute code on the current kernel
  // Since Pyodide has access to its javascript enviroment through the js package, we do the following steps:
  // 1. Load the js and pyodide_js package
  // 2. Set the fs variable in JS to our pyodide_js, this gives access to pyodide in JS
  // 3. Eval the string og the override_pyodide_lookup function in JS, this brings it into scope
  // 4. Execute the override_pyodide_lookup function in JS, and bake in the relative path from root in the book (the home)
  // NOTE: All functions used in override_pyodide_lookup should be nested inside it, since the web worker cannot access functions in this script

  thebelab.session.kernel.requestExecute({
    code: `import js; import pyodide_js; js.fs = pyodide_js.FS; js.eval("""${override_pyodide_lookup.toString()}"""); js.eval(f"override_pyodide_lookup(fs, '${
      location.pathname.split("/").slice(0, -1).join("/") + "/"
    }')")`,
  });

  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `${THEBE_CONFIG.rootPath}/_static/_hook_fetch_module_finder.py`,
    false
  );
  request.send();

  const fetchImportHookCode = request.response;


  // Enable importing of modules on server
  thebelab.session.kernel.requestExecute({
    code: fetchImportHookCode,
  });

  // Fix for issues with ipywidgets in Thebe
  await thebelab.session.kernel.requestExecute({
    code: `import ipykernel; ipykernel.version_info = (0,0); import micropip; await micropip.install("ipywidgets")`,
  }).done;

  updateThebeButtonStatus("Running pre-intialized cells...");

  await runInitCells();

  updateThebeButtonStatus("Python interaction ready!", false);

  moveHideInputOutput();
};

// Helper function to munge the language name
var detectLanguage = (language) => {
  if (language.indexOf("python") > -1) {
    language = "python";
  } else if (language === "ir") {
    language = "r";
  }
  return language;
};

function handleThebeRemoveInputTag(element) {
  element.style.display = "none";

  window.specialTaggedElements.push({
    tag: "thebe-remove-input-init",
    element: element,
  });

  element.classList.add("tag_thebe-init");
}

function handleDisableExecutionTag(element) {
  document.querySelector(".dropdown-launch-buttons").remove();
}

function handleDisableDownloadTag(element) {
  document.querySelector(".dropdown-download-buttons").remove();
}

function handleAutoExecuteTag(element) {
  initThebeSBT();
}

// Adapted from: https://stackoverflow.com/questions/66381462/javascript-getcomputedstyle-copy-object-without-reference
function copyNodeStyle(sourceNode, targetNode) {
  // 👇️ Get computed styles of original element
  const styles = window.getComputedStyle(sourceNode);

  let cssText = styles.cssText;

  if (!cssText) {
    cssText = Array.from(styles).reduce((str, property) => {
      return `${str}${property}:${styles.getPropertyValue(property)};`;
    }, "");
  }

  // 👇️ Assign CSS styles to the element
  targetNode.style.cssText = cssText;
}

function handleReadOnlyTag(element) {
  window.specialTaggedElements.push({
    tag: "read-only",
    element: element
  });
}

const removedSelectorClasses = ["cell", "cell_output", "cell_input"];
function handleDisableExecutionCellTag(element) {
  element.classList.add("keep");
  removedSelectorClasses.forEach((removedClass, _) => {
    const affected = Array.from(element.getElementsByClassName(removedClass));
    affected.forEach((child, _) => handleDisableExecutionCellTag(child));
  });
}

// Deal with custom-defined tags to properly prepare Thebe and DOM
// Current special tags: thebe-remove-input-init
function consumeSpecialTags() {
  const specialTagsInfo = [
    { tag: "disable-execution-page", handler: handleDisableExecutionTag },
    { tag: "disable-download-page", handler: handleDisableDownloadTag },
    { tag: "auto-execute-page", handler: handleAutoExecuteTag },
    { tag: "disable-execution-cell", handler: handleDisableExecutionCellTag },
    { tag: "thebe-remove-input-init", handler: handleThebeRemoveInputTag },
    { tag: "read-only", handler: handleReadOnlyTag }
  ];

  window.specialTaggedElements = [];

  for (const tagInfo of specialTagsInfo) {
    const cells = document.querySelectorAll(".tag_" + tagInfo.tag);
    for (const cell of cells) {
      tagInfo.handler(cell);
    }
  }
}

if (document.readyState !== "loading") {
  consumeSpecialTags();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    consumeSpecialTags();
  });
}
