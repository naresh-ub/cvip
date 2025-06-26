selector_to_html = {"a[href=\"#depth-estimation-opencv-implementation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Depth estimation (openCV implementation)<a class=\"headerlink\" href=\"#depth-estimation-opencv-implementation\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#from-scratch-implementation-of-depth-estimation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">From scratch implementation of depth estimation<a class=\"headerlink\" href=\"#from-scratch-implementation-of-depth-estimation\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#depth-estimation-using-stereo-vision\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Depth Estimation using Stereo Vision<a class=\"headerlink\" href=\"#depth-estimation-using-stereo-vision\" title=\"Link to this heading\">#</a></h1><h2>Depth estimation (openCV implementation)<a class=\"headerlink\" href=\"#depth-estimation-opencv-implementation\" title=\"Link to this heading\">#</a></h2>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(`main ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: false,
                placement: 'auto-start', maxWidth: 500, interactive: true, boundary: document.body, appendTo: document.body,
                onShow(instance) {MathJax.typesetPromise([instance.popper]).then(() => {});},
            });
        };
    };
    console.log("tippy tips loaded!");
};
