// book/_static/js/thebe-init.js
(async () => {
  // Wait for Pyodide kernel to be ready
  async function waitForPyodide() {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let i = 0; i < 200; i++) {
      if (window.pyodide && window.pyodide.runPythonAsync) return;
      await delay(50);
    }
    console.warn("[thebe-init] Pyodide not detected in time.");
  }

  async function fetchRequirements() {
    const url = new URL("_static/thebe-requirements.txt", window.location.href);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.warn("[thebe-init] requirements file not found:", url.toString());
      return [];
    }
    const text = await res.text();
    return text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
  }

  await waitForPyodide();
  const reqs = await fetchRequirements();
  if (!reqs.length) {
    console.log("[thebe-init] no runtime packages requested.");
    return;
  }

  console.log("[thebe-init] installing runtime packages via micropip:", reqs);

  try {
    await window.pyodide.loadPackage("micropip"); // ensure micropip in scope
    await window.pyodide.runPythonAsync(`
import micropip, sys
print("[thebe-init] Python version:", sys.version)
    `);

    // Install one by one to get clearer errors
    for (const spec of reqs) {
      try {
        console.log("[thebe-init] micropip.install", spec);
        await window.pyodide.runPythonAsync(`
import micropip
await micropip.install("${spec}")
        `);
      } catch (e) {
        console.warn(`[thebe-init] Failed to install ${spec}. If it has native code, Pyodide cannot build it in the browser.`, e);
      }
    }
    console.log("[thebe-init] runtime packages ready.");
  } catch (e) {
    console.warn("[thebe-init] micropip load/install failed:", e);
  }
})();
