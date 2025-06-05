selector_to_html = {"a[href=\"#what-s-happening-this-week\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">What\u2019s happening this week?<a class=\"headerlink\" href=\"#what-s-happening-this-week\" title=\"Link to this heading\">#</a></h1>", "a[href=\"syllabus.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Course Logistics and Syllabus<a class=\"headerlink\" href=\"#course-logistics-and-syllabus\" title=\"Link to this heading\">#</a></h1><h2>Course Information<a class=\"headerlink\" href=\"#course-information\" title=\"Link to this heading\">#</a></h2>", "a[href=\"lectures/lecture1.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">What is a Pixel and what is an Image?<a class=\"headerlink\" href=\"#what-is-a-pixel-and-what-is-an-image\" title=\"Link to this heading\">#</a></h1><p>Images are made up of <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Pixel#:~:text=In%20digital%20imaging%2C%20a%20pixel,can%20be%20manipulated%20through%20software\">pixels</a>, small units that represent the intensity or color at specific coordinates. Each pixel can be a single grayscale value or a tuple of values for color channels like RGB. In scientific computing and computer vision, images are typically stored as NumPy arrays: 2D arrays for grayscale images and 3D arrays (height \u00d7 width \u00d7 channels) for color images. This structured representation allows efficient numerical manipulation, making NumPy a powerful foundation for image processing, filtering, and machine learning applications.</p>", "a[href=\"lectures/lecture2.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">How is an image formed?<a class=\"headerlink\" href=\"#how-is-an-image-formed\" title=\"Link to this heading\">#</a></h1><p>In this lecture, we shall understand the Math and Geometry behind Image Formation. In the <a class=\"reference internal\" href=\"lectures/lecture1.html\"><span class=\"std std-doc\">previous lecture</span></a>, we learned that images are stored/read as <code class=\"docutils literal notranslate\"><span class=\"pre\">numpy</span> <span class=\"pre\">arrays</span></code>. In this lecture we understand the way in which a 3D object is captured on a 2D image plane. In fact, we will see that a <code class=\"docutils literal notranslate\"><span class=\"pre\">camera</span> <span class=\"pre\">is</span> <span class=\"pre\">nothing</span> <span class=\"pre\">but</span> <span class=\"pre\">a</span> <span class=\"pre\">function</span> <span class=\"pre\">that</span> <span class=\"pre\">maps</span> <span class=\"pre\">a</span> <span class=\"pre\">3D</span> <span class=\"pre\">point</span> <span class=\"pre\">in</span> <span class=\"pre\">real-world</span> <span class=\"pre\">onto</span> <span class=\"pre\">a</span> <span class=\"pre\">2D</span> <span class=\"pre\">point</span> <span class=\"pre\">on</span> <span class=\"pre\">the</span> <span class=\"pre\">image</span> <span class=\"pre\">plane</span></code>.</p><p>Let\u2019s get started with an object that we want to capture. For this lecture, let\u2019s choose an object with regular shape.</p>"}
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
