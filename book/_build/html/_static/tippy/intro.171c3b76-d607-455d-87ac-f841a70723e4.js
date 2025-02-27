selector_to_html = {"a[href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CSE 4/573: Intro to Computer Vision and Image Processing<a class=\"headerlink\" href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\" title=\"Link to this heading\">#</a></h1><p><strong>Welcome, Welcome, Welcome</strong> to the interactive side of the world.</p><p>The Summer 2025 version of this course has been completely revamped on two key fundamentals:</p>"}
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
