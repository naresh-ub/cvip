selector_to_html = {"a[href=\"#theoretical-foundations\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Theoretical Foundations<a class=\"headerlink\" href=\"#theoretical-foundations\" title=\"Link to this heading\">#</a></h2><p>In <strong>Understanding Diffusion Models: A Unified Perspective</strong> (arXiv:2208.11970v1), the forward (noising) and reverse (denoising) processes are introduced as follows:</p>", "a[href=\"#denoising-mlp\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">2) Denoising MLP<a class=\"headerlink\" href=\"#denoising-mlp\" title=\"Link to this heading\">#</a></h2><p>We build a simple MLP to predict <span class=\"math notranslate nohighlight\">\\( \\hat{\\epsilon}_{\\theta}(x_t, t) \\)</span>, the noise present in <span class=\"math notranslate nohighlight\">\\( x_t \\)</span>.<br/>\nThis corresponds to the model used in the DDPM objective, where:</p>", "a[href=\"#diffusionprocess-class\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">3) DiffusionProcess Class<a class=\"headerlink\" href=\"#diffusionprocess-class\" title=\"Link to this heading\">#</a></h2><p>Implements:</p>", "a[href=\"#training-loop\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">5) Training Loop<a class=\"headerlink\" href=\"#training-loop\" title=\"Link to this heading\">#</a></h2><p>We train by:</p>", "a[href=\"#diffusion-model-on-swiss-roll-ddpm\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Diffusion Model on Swiss Roll (DDPM)<a class=\"headerlink\" href=\"#diffusion-model-on-swiss-roll-ddpm\" title=\"Link to this heading\">#</a></h1><p>In this notebook, we demonstrate a basic Diffusion Model training loop on a 2D Swiss Roll dataset.</p>", "a[href=\"#forward-process\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Forward Process<a class=\"headerlink\" href=\"#forward-process\" title=\"Link to this heading\">#</a></h3><p>We define a forward noising process</p>", "a[href=\"#visualization\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">4) Visualization<a class=\"headerlink\" href=\"#visualization\" title=\"Link to this heading\">#</a></h2><p>We visualize:</p>", "a[href=\"#reverse-process\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Reverse Process<a class=\"headerlink\" href=\"#reverse-process\" title=\"Link to this heading\">#</a></h3><p>The reverse process aims to learn</p>", "a[href=\"#notebook-overview\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Notebook Overview<a class=\"headerlink\" href=\"#notebook-overview\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#end-of-notebook\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">End of Notebook<a class=\"headerlink\" href=\"#end-of-notebook\" title=\"Link to this heading\">#</a></h1><p><strong>Summary</strong>:</p>", "a[href=\"#main-execution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">6) Main Execution<a class=\"headerlink\" href=\"#main-execution\" title=\"Link to this heading\">#</a></h2><p>We instantiate the diffusion model, train it, and visualize final results.</p>"}
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
