selector_to_html = {"a[href=\"#images-are-simple-numpy-arrays\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Images are simple NumPy Arrays<a class=\"headerlink\" href=\"#images-are-simple-numpy-arrays\" title=\"Link to this heading\">#</a></h2><p>The code below reads an image from <code class=\"docutils literal notranslate\"><span class=\"pre\">sklearn.datasets.load_digits</span></code> and displays that the images are stored as <code class=\"docutils literal notranslate\"><span class=\"pre\">numpy</span> <span class=\"pre\">arrays</span></code>.</p>", "a[href=\"#what-is-a-pixel-and-what-is-an-image\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">What is a Pixel and what is an Image?<a class=\"headerlink\" href=\"#what-is-a-pixel-and-what-is-an-image\" title=\"Link to this heading\">#</a></h1><p>Images are made up of <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Pixel#:~:text=In%20digital%20imaging%2C%20a%20pixel,can%20be%20manipulated%20through%20software\">pixels</a>, small units that represent the intensity or color at specific coordinates. Each pixel can be a single grayscale value or a tuple of values for color channels like RGB. In scientific computing and computer vision, images are typically stored as NumPy arrays: 2D arrays for grayscale images and 3D arrays (height \u00d7 width \u00d7 channels) for color images. This structured representation allows efficient numerical manipulation, making NumPy a powerful foundation for image processing, filtering, and machine learning applications.</p>", "a[href=\"#let-s-create-new-images-programmatically\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Let\u2019s create new images programmatically<a class=\"headerlink\" href=\"#let-s-create-new-images-programmatically\" title=\"Link to this heading\">#</a></h2><p>Now that we know images are just NumPy arrays, we can create and manipulate images programmatically by directly modifying these arrays. Each element in the array corresponds to a pixel, so by setting specific values, we can draw shapes, patterns, or even generate entirely synthetic images from scratch. Using libraries like NumPy for array manipulation and Matplotlib for visualization, we can treat the image as a canvas and write code to \u201cprogrammatically paint\u201d on it, opening the door to procedural art, simulations, and custom data visualizations.</p>"}
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
