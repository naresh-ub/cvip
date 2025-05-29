selector_to_html = {"a[href=\"syllabus.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Course Logistics and Syllabus<a class=\"headerlink\" href=\"#course-logistics-and-syllabus\" title=\"Link to this heading\">#</a></h1><h2>Summary of the syllabus<a class=\"headerlink\" href=\"#summary-of-the-syllabus\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CSE 4/573: Intro to Computer Vision and Image Processing<a class=\"headerlink\" href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\" title=\"Link to this heading\">#</a></h1><p>Welcome to the CSE 4/573: Computer Vision and Image Processing course. CVIP is a Capstone Course for AI/ML course track grad students at UB.</p>", "a[href=\"#instructors\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Instructors<a class=\"headerlink\" href=\"#instructors\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#table-of-contents\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Table of Contents<a class=\"headerlink\" href=\"#table-of-contents\" title=\"Link to this heading\">#</a></h2><p><em>Will be updated daily as a the lectures progress.</em></p><p><strong>Module 1: Introduction and Image Formation</strong></p>", "a[href=\"#course-syllabus\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Course Syllabus<a class=\"headerlink\" href=\"#course-syllabus\" title=\"Link to this heading\">#</a></h2><p>Complete details of course syllabus can be found here: <a class=\"reference internal\" href=\"syllabus.html\"><span class=\"std std-doc\">Syllabus</span></a></p>"}
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
