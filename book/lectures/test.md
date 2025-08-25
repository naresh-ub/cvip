# Neural Networks, Universal Approximation, and Feature Extraction (with a CIFAR-10 MLP) (PyTorch)

```{admonition} Run this webpage in Google Colab using the <i class="fas fa-rocket"></i> icon.
:class: warning
This lecture notes uses packages including pytorch, torchvision. Use Google Colab icon to run the code. Pytorch does not work with live code yet.
```

This notebook introduces the core math behind feed-forward neural networks, the **Universal Approximation Theorem (UAT)**, essentials shared by (almost) all neural networks (problem setup, losses, optimization), and the idea of **feature extraction** as learned representations. We finish by training a simple **fully connected network** (no convolutions) on **CIFAR-10** to make the concepts concrete.

## 1. What is a (feed-forward) neural network?

We observe a dataset $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^n$ with inputs $x_i \in \mathbb{R}^d$ and labels $y_i$ (e.g., $y_i \in \{0,\dots,9\}$ for example CIFAR-10). A feed-forward neural network is a **parametric function**

$$
f_\theta:\mathbb{R}^d \to \mathbb{R}^K,\quad \theta \in \Theta,
$$

built by composing **affine layers** and **nonlinearities**:

$$
\begin{aligned}
h^{(0)} &= x \\
z^{(\ell)} &= W^{(\ell)} h^{(\ell-1)} + b^{(\ell)} \\
h^{(\ell)} &= \sigma\!\big(z^{(\ell)}\big) \quad \text{(element-wise)} \\
\text{logits } o &= W^{(L)} h^{(L-1)} + b^{(L)}, \quad f_\theta(x) = o.
\end{aligned}
$$

Here $\sigma$ is a nonlinear activation (e.g., ReLU: $\sigma(t)=\max\{0,t\}$). The vector $h^{(\ell)}$ is the **feature representation** after layer $\ell$; the last linear layer produces **class logits** $o\in\mathbb{R}^K$.

For classification, we convert logits to probabilities using **softmax**:

$$
p(y=k\mid x;\theta) \;=\; \frac{\exp(o_k)}{\sum_{j=1}^K \exp(o_j)}.
$$

## 2. Universal Approximation Theorem (UAT)

**Informal statement.** A feed-forward network with a **single hidden layer** and a **suitable nonlinearity** (e.g., sigmoidal, or modern choices like ReLU under similar conditions) can approximate any **continuous function** on a **compact set** to **arbitrary accuracy**, provided it has **enough hidden units**.

**Meaning.** Neural nets are *expressive enough* to fit (approximate) essentially any continuous target you might care about. However, UAT says **nothing** about:
- how many units are needed for a *good* approximation,
- whether **gradient-based training** will find those parameters,
- **generalization** to unseen data.

**Classic references.**
- Cybenko (1989) proved UAT for sigmoidal activations. :contentReference[oaicite:0]{index=0}  
- See also textbook expositions (e.g., Goodfellow–Bengio–Courville, Ch. 6). :contentReference[oaicite:1]{index=1}

## 3. Universal components across (most) neural networks

### 3.1 Problem statement & Empirical Risk Minimization (ERM)

Given a parametric model $f_\theta$ and loss $\ell(\cdot,\cdot)$, we minimize the **empirical risk**:

$$
\hat{R}(\theta) \;=\; \frac{1}{n}\sum_{i=1}^n \ell\!\big(f_\theta(x_i), y_i\big).
$$

### 3.2 Loss functions
For $K$-class classification with one-hot labels, the **cross-entropy** loss is

$$
\ell\big(f_\theta(x), y\big) \;=\; -\sum_{k=1}^K \mathbf{1}\{y=k\}\,\log p(y=k\mid x;\theta).
$$

With logits $o$ and softmax $p$, the cross-entropy is implemented as `torch.nn.CrossEntropyLoss` (which is numerically stable).

### 3.3 Optimization by (stochastic) gradient descent
We update parameters by

$$
\theta \leftarrow \theta - \eta\, \nabla_\theta \hat{R}_\mathcal{B}(\theta),
$$

where $\eta>0$ is the **learning rate**, and $\hat{R}_\mathcal{B}$ is the loss over a **mini-batch** $\mathcal{B}$. Popular optimizers (SGD, Adam) use momentum, adaptive step sizes, etc.

### 3.4 Regularization & generalization
Typical techniques:
- **Weight decay (L2)**: adds $\lambda\|\theta\|_2^2$ to penalize large weights.
- **Dropout**: randomly zeroes hidden units during training to reduce co-adaptation.
- **Early stopping**: stop training when validation loss stops improving.

For deeper theory of learning and generalization, see standard textbooks. :contentReference[oaicite:2]{index=2}
