selector_to_html = {"a[href=\"#classifier-free-guidance\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">3. Classifier-Free Guidance<a class=\"headerlink\" href=\"#classifier-free-guidance\" title=\"Link to this heading\">#</a></h2><p>Training a separate classifier can be costly.<br/>\n<strong>Classifier-Free Guidance (CFG)</strong> avoids this by training the denoising model both with and without conditions:</p>", "a[href=\"#conditional-diffusion-models\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Conditional Diffusion Models<a class=\"headerlink\" href=\"#conditional-diffusion-models\" title=\"Link to this heading\">#</a></h1><h2>1. Conditional Diffusion Models<a class=\"headerlink\" href=\"#id1\" title=\"Link to this heading\">#</a></h2><p>Standard diffusion models sample from an unconditional distribution <span class=\"math notranslate nohighlight\">\\( p(\\mathbf{x}) \\)</span>.<br/>\nTo control the generation process, we condition on auxiliary information <span class=\"math notranslate nohighlight\">\\( \\mathbf{y} \\)</span> (e.g., class labels, text prompts, segmentation masks).</p><p>The conditional generative process is:</p>", "a[href=\"#classifier-guidance\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">2. Classifier Guidance<a class=\"headerlink\" href=\"#classifier-guidance\" title=\"Link to this heading\">#</a></h2><p>One approach is to train a separate classifier <span class=\"math notranslate nohighlight\">\\( C(\\mathbf{y} \\mid \\mathbf{x}_t) \\)</span> that works on noisy images.</p><p>During sampling, we adjust the reverse step using the gradient of the classifier:</p>", "a[href=\"#id1\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">1. Conditional Diffusion Models<a class=\"headerlink\" href=\"#id1\" title=\"Link to this heading\">#</a></h2><p>Standard diffusion models sample from an unconditional distribution <span class=\"math notranslate nohighlight\">\\( p(\\mathbf{x}) \\)</span>.<br/>\nTo control the generation process, we condition on auxiliary information <span class=\"math notranslate nohighlight\">\\( \\mathbf{y} \\)</span> (e.g., class labels, text prompts, segmentation masks).</p><p>The conditional generative process is:</p>", "a[href=\"#cross-attention-in-latent-diffusion-models-ldms\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">4. Cross Attention in Latent Diffusion Models (LDMs)<a class=\"headerlink\" href=\"#cross-attention-in-latent-diffusion-models-ldms\" title=\"Link to this heading\">#</a></h2><p>In latent diffusion, conditioning information (e.g., text embeddings) is injected via <strong>cross-attention</strong>:</p>", "a[href=\"#cross-attention-maps-and-image-editing\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">5. Cross Attention Maps and Image Editing<a class=\"headerlink\" href=\"#cross-attention-maps-and-image-editing\" title=\"Link to this heading\">#</a></h2><p>Cross-attention maps reveal <strong>which parts of the image correspond to which words/conditions</strong>.</p>", "a[href=\"#summary\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">6. Summary<a class=\"headerlink\" href=\"#summary\" title=\"Link to this heading\">#</a></h2><p>For hands-on exploration:</p>"}
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
