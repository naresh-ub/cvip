// book/_static/js/thebe-init.js
(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function waitForPyodide() {
    for (let i = 0; i < 200; i++) {
      if (window.pyodide && window.pyodide.runPythonAsync) return;
      await sleep(50);
    }
    console.warn("[thebe-init] Pyodide not ready.");
  }

  async function fetchRequirements() {
    try {
      const url = new URL("_static/thebe-requirements.txt", window.location.href);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) return [];
      return (await res.text())
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"));
    } catch { return []; }
  }

  await waitForPyodide();
  const reqs = await fetchRequirements();
  if (!reqs.length) {
    console.log("[thebe-init] no extra runtime packages requested.");
    return;
  }

  console.log("[thebe-init] installing via micropip:", reqs);
  try {
    await window.pyodide.loadPackage("micropip");
    for (const spec of reqs) {
      try {
        await window.pyodide.runPythonAsync(`import micropip; await micropip.install("${spec}")`);
      } catch (e) {
        console.warn(`[thebe-init] failed to install ${spec} (likely requires native code).`, e);
      }
    }
    console.log("[thebe-init] runtime packages installed.");
  } catch (e) {
    console.warn("[thebe-init] micropip not available:", e);
  }
})();
