selector_to_html = {"a[href=\"#step-1-identify-your-category-to-balance-expectations-and-deliverables\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Step 1: Identify your category, to balance expectations and deliverables<a class=\"headerlink\" href=\"#step-1-identify-your-category-to-balance-expectations-and-deliverables\" title=\"Link to this heading\">#</a></h2><p>Students in this course come from different academic and technical backgrounds. To ensure that everyone can work on a meaningful and achievable project, please identify the category that best matches your current experience with Computer Vision.</p>", "a[href=\"#summary-of-deliverables-and-important-deadlines\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Summary of deliverables and important deadlines:<a class=\"headerlink\" href=\"#summary-of-deliverables-and-important-deadlines\" title=\"Link to this heading\">#</a></h2><p>Please check <a class=\"reference internal\" href=\"dates-deadlines.html\"><span class=\"std std-doc\">Dates and Deliverables page</span></a> for more details about the entire course.</p>", "a[href=\"#capstone-project-details-and-deliverables\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Capstone Project Details and Deliverables<a class=\"headerlink\" href=\"#capstone-project-details-and-deliverables\" title=\"Link to this heading\">#</a></h1><p>CSE 4/573 is the <a class=\"reference external\" href=\"https://engineering.buffalo.edu/computer-science-engineering/graduate/degrees-and-programs/ms-in-computer-science-and-engineering/ms-tracks-and-specializations.html\">Capstone Course</a> at UB. The Capstone Project in this course brings concepts from across the degree into a single, semester-long group project.</p><p>Here are the deliverables for the Capstone Project for CSE 4/573 Computer Vision:</p>", "a[href=\"#step-3-go-through-deliverables-and-submit-in-ublearns\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Step 3: Go through deliverables and submit in UBLearns<a class=\"headerlink\" href=\"#step-3-go-through-deliverables-and-submit-in-ublearns\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#step-2-choose-a-project-and-form-your-group\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Step 2: Choose a project and form your group<a class=\"headerlink\" href=\"#step-2-choose-a-project-and-form-your-group\" title=\"Link to this heading\">#</a></h2><p>Once you\u2019ve identified your category, the next step is to explore the list of curated project ideas. These span across classical vision tasks, deep learning, and generative AI, and are marked by level for easy filtering.</p><p>You may work individually or in a group of up to 3 students. Every group must submit a short proposal, choose a project scope appropriate to the category of its members, and begin building.</p>", "a[href=\"dates-deadlines.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Dates and Deliverables<a class=\"headerlink\" href=\"#dates-and-deliverables\" title=\"Link to this heading\">#</a></h1><p>This Computer Vision course runs from <strong>May 27 to August 14, 2025</strong>, meeting every Tuesday and Thursday. The curriculum progresses from fundamental concepts (image formation, processing) through core techniques (stereo vision, feature detection) to advanced topics (VAEs, diffusion models). Key deliverables include:</p>"}
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
