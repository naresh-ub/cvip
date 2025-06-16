selector_to_html = {"a[href=\"#dates-and-deliverables\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Dates and Deliverables<a class=\"headerlink\" href=\"#dates-and-deliverables\" title=\"Link to this heading\">#</a></h1><p>This Computer Vision course runs from <strong>May 27 to August 14, 2025</strong>, meeting every Tuesday and Thursday. The curriculum progresses from fundamental concepts (image formation, processing) through core techniques (stereo vision, feature detection) to advanced topics (VAEs, diffusion models). Key deliverables include:</p>", "a[href=\"#programming-assignment-10\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">\ud83d\udcdd Programming Assignment (10%)<a class=\"headerlink\" href=\"#programming-assignment-10\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#lecture-dates-and-details\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Lecture Dates and Details<a class=\"headerlink\" href=\"#lecture-dates-and-details\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#course-deliverables-breakdown\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Course Deliverables Breakdown<a class=\"headerlink\" href=\"#course-deliverables-breakdown\" title=\"Link to this heading\">#</a></h2><h3>\ud83d\udcdd Programming Assignment (10%)<a class=\"headerlink\" href=\"#programming-assignment-10\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#submission-policies\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">\u26a0\ufe0f Submission Policies<a class=\"headerlink\" href=\"#submission-policies\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#quizzes-20\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">\u2714\ufe0f Quizzes (20%)<a class=\"headerlink\" href=\"#quizzes-20\" title=\"Link to this heading\">#</a></h3><p><strong>Format</strong>:</p>", "a[href=\"#exams-45\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">\ud83d\udcda Exams (45%)<a class=\"headerlink\" href=\"#exams-45\" title=\"Link to this heading\">#</a></h3><p><strong>Exam Features</strong>:</p>", "a[href=\"#capstone-project-20\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">\ud83c\udfc6 Capstone Project (20%)<a class=\"headerlink\" href=\"#capstone-project-20\" title=\"Link to this heading\">#</a></h3>"}
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
