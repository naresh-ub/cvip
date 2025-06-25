selector_to_html = {"a[href=\"#slides-rebuilt-with-animations\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Slides rebuilt with animations<a class=\"headerlink\" href=\"#slides-rebuilt-with-animations\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#website-features\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Website Features<a class=\"headerlink\" href=\"#website-features\" title=\"Link to this heading\">#</a></h1><p><strong>Welcome</strong> to the interactive side!</p><p>The Summer 2025 version of this course has been completely revamped on two key fundamentals:</p>"}
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
