selector_to_html = {"a[href=\"#revise-your-concepts-with-flashcards\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Revise your concepts with Flashcards<a class=\"headerlink\" href=\"#revise-your-concepts-with-flashcards\" title=\"Link to this heading\">#</a></h1>", "a[href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CSE 4/573: Intro to Computer Vision and Image Processing<a class=\"headerlink\" href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\" title=\"Link to this heading\">#</a></h1><p><strong>Course Teaser</strong></p>", "a[href=\"#jupyter-quiz-integration\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Jupyter Quiz integration<a class=\"headerlink\" href=\"#jupyter-quiz-integration\" title=\"Link to this heading\">#</a></h1>", "a[href=\"#interactive-live-coding\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Interactive Live coding<a class=\"headerlink\" href=\"#interactive-live-coding\" title=\"Link to this heading\">#</a></h2><p>Just click on the <span class=\"fa fa-rocket\"></span> \u2013&gt; <span class=\"guilabel\">Live Code</span> (on the top right of any page) and voila, play with the code as much as you want.</p>", "a[href=\"#plotly-for-interactive-plots\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Plotly for interactive plots<a class=\"headerlink\" href=\"#plotly-for-interactive-plots\" title=\"Link to this heading\">#</a></h1>", "a[href=\"#slides-rebuilt-with-animations\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Slides rebuilt with animations<a class=\"headerlink\" href=\"#slides-rebuilt-with-animations\" title=\"Link to this heading\">#</a></h2><p>Here is the convolution equation that we discussed in the slides above.</p>"}
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
