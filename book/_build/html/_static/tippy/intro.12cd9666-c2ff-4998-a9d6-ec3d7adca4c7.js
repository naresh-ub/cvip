selector_to_html = {"a[href=\"syllabus.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Course Logistics and Syllabus<a class=\"headerlink\" href=\"#course-logistics-and-syllabus\" title=\"Link to this heading\">#</a></h1><h2>Course Information<a class=\"headerlink\" href=\"#course-information\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#course-syllabus\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Course Syllabus<a class=\"headerlink\" href=\"#course-syllabus\" title=\"Link to this heading\">#</a></h2><p>Complete details of course syllabus can be found here: <a class=\"reference internal\" href=\"syllabus.html\"><span class=\"std std-doc\">Syllabus</span></a></p>", "a[href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CSE 4/573: Intro to Computer Vision and Image Processing<a class=\"headerlink\" href=\"#cse-4-573-intro-to-computer-vision-and-image-processing\" title=\"Link to this heading\">#</a></h1><p>Welcome to CSE 4/573: CVIP course (Summer 2025). This website contains <strong><em>everything</em> (all material)</strong> for the course. To support engaging and interactive learning, this website is powered by <a class=\"reference external\" href=\"https://jupyterbook.org/\">Jupyter Book</a> and the <a class=\"reference external\" href=\"https://teachbooks.io/\">TeachBooks</a> package. The site hosts all course content in an accessible and interactive format, including self-hosted animated lecture slides via <a class=\"reference external\" href=\"https://revealjs.com/\">Reveal.JS</a>, executable live code blocks with <a class=\"reference external\" href=\"https://github.com/executablebooks/thebe\">Thebe</a>, rich 3D visualizations using <a class=\"reference external\" href=\"https://plotly.com/python/\">Plotly</a>, spaced-repetition flashcards through <a class=\"reference external\" href=\"https://github.com/jmshea/jupytercards\">JupyterCards</a>, and auto-graded practice quizzes via <a class=\"reference external\" href=\"https://github.com/jmshea/jupyterquiz\">Jupyter Quizzes</a>. This platform enhances student engagement by blending theory with hands-on experimentation directly in the browser.</p>", "a[href=\"#instructor\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Instructor<a class=\"headerlink\" href=\"#instructor\" title=\"Link to this heading\">#</a></h2><h3>Course Schedule<a class=\"headerlink\" href=\"#course-schedule\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#course-schedule\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Course Schedule<a class=\"headerlink\" href=\"#course-schedule\" title=\"Link to this heading\">#</a></h3>"}
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
