# CSE 4/573: Computer Vision & Generative AI

```{admonition} Course Links..
:class: tip

- Location: NSC 215
- Slides: slides.com/naresh-ub/decks/cvip_summer25
- Piazza: Registered students only at University at Buffalo
- Lecture Timings: Tue/Thu - 10:30 AM to 11:50 AM Eastern
```

<!-- Welcome to CSE 4/573: CVIP course (Summer 2025). This website contains **_everything_ (all material)** for the course. To support engaging and interactive learning, this website is powered by [Jupyter Book](https://jupyterbook.org/) and the [TeachBooks](https://teachbooks.io/) package. The site hosts all course content in an accessible and interactive format, including self-hosted animated lecture slides via [Reveal.JS](https://revealjs.com/), executable live code blocks with [Thebe](https://github.com/executablebooks/thebe), rich 3D visualizations using [Plotly](https://plotly.com/python/), spaced-repetition flashcards through [JupyterCards](https://github.com/jmshea/jupytercards), and auto-graded practice quizzes via [Jupyter Quizzes](https://github.com/jmshea/jupyterquiz). This platform enhances student engagement by blending theory with hands-on experimentation directly in the browser. -->

## About the Course

**Overview:**  
A summer course that takes students from classical computer vision foundations all the way to modern generative models and practical systems.

- Covered the full pipeline from **image formation** to **intelligent vision systems**:
  - Mathematical and physical principles of **image formation** and **camera calibration**
  - **Pixel-domain** and **frequency-domain** image processing
- Introduced **geometric methods** central to 3D understanding:
  - **Stereo vision** and **depth estimation**
  - **Epipolar geometry** and related geometric reasoning
- Transitioned into **learning-based approaches**:
  - **Convolutional neural networks (CNNs)** for classification, segmentation, and object detection
- Featured a dedicated **generative vision module**:
  - **Variational Autoencoders (VAEs)**
  - **Generative Adversarial Networks (GANs)**
  - **Diffusion models** and their role in contemporary generative vision
- Emphasized both **theoretical mastery** and **practical skills**:
  - Hands-on development of intelligent vision systems
  - Use of **OpenCV**, **TensorFlow**, and **PyTorch** for real-world applications


## Course Design Experience

**Overview:**  
This was the first UB course to feature a full diffusion-model module, with all generative AI content built from scratch.

- Pioneering focus on **diffusion models** at UB:
  - First course at the University at Buffalo to include a **semester-long module** on diffusion models
- Custom-designed **generative modeling curriculum**:
  - Materials for **VAEs**, **GANs**, and **diffusion models** created entirely from the ground up
  - Combined **intuitive mathematical derivations** with **from-scratch Python implementations**
- Scaffolded **assignment design**:
  - Early assignments on foundational generative modeling concepts
  - Progression to more advanced explorations of generative techniques
- Capstone project integrating **generative methods into applications**:
  - Example themes: controllable image synthesis, multimodal vision-language systems
  - Linked capstone notebook: [capstone project](capstone-project.ipynb)
- Outcome-oriented structure:
  - Ensured **early exposure** to a rapidly evolving research frontier
  - Enabled students to leave with **portfolio-ready projects** demonstrating rigor and creativity

## Course Mentors
- [Dr. Vishnu Lokhande](https://vlokhande-ub.github.io/): Course Design, Course Content (Generative AI), Syllabus.
- [Dr. Ifeoma Nwogu](https://engineering.buffalo.edu/home/research/faculty/diverse-faculty.host.html/content/shared/engineering/computer-science-engineering/profiles/faculty/ladder/nwogu-ifeoma.html): Course Design, Course Structure, Syllabus and Assignments.


## Teaching Philosophy and Approach

**Overview:**  
My teaching centers on intuition, curiosity, and frictionless experimentation through a fully interactive, browser-based ecosystem.

- Instructor: **[Naresh Devulapally](https://naresh-ub.github.io)**
- Core teaching principles:
  - Rooted in **intuition** and **curiosity** rather than rote memorization
  - Emphasis on making abstract concepts **tangible and visual**
- Slide and content design:
  - Every slide crafted **from scratch**
  - Rich **visuals**, **animations**, and **interactive plots** to aid understanding
  - Reinforced learning with **quizzes** and **flashcards** for long-term retention
- Live coding and interactivity:
  - **Interactive live coding** in the browser for all major algorithms
  - Implemented methods **from first principles in Python**
  - No local setup required: students could experiment **without configuring environments**
- Course technology stack and website:
  - Course website built with **[Jupyter Book](https://jupyterbook.org/)** and **TeachBooks**
  - Slides delivered via **[Reveal.JS](https://revealjs.com/)** for animated, web-native presentations
  - Executable code blocks powered by **[Thebe](https://github.com/executablebooks/thebe)**
  - 3D visualizations created with **[Plotly](https://plotly.com/python/)**
  - Spaced-repetition flashcards via **[JupyterCards](https://github.com/jmshea/jupytercards)**
  - Auto-graded practice quizzes integrated into the same ecosystem
- Overall learning experience:
  - Blended **rigorous theory** with **immediate experimentation**
  - Equipped students to **understand, prototype, and innovate** in modern Computer Vision and Generative AI

## Instructor

<table style="width:100%; border-collapse: collapse; border: 1px solid; text-align:center;">
  <tr>
    <th style="width:33%; border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px;">Instructor</th>
    <th style="width:33%; border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px;">Website & Email</th>
    <th style="width:33%; border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px;">Office Hours</th>
  </tr>
  <tr>
    <td style="border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px;">
      <img src="naresh-ub.png" width="80" style="margin-bottom:10px;"/><br>
      Naresh Devulapally
    </td>
    <td style="border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px; line-height:1.6;">
      <a href="https://naresh-ub.github.io">naresh-ub.github.io</a><br>
      devulapa@buffalo.edu
    </td>
    <td style="border: 1px solid gray; text-align:center; vertical-align:middle; padding:10px; line-height:1.6;">
      Tue, Thu: 3:00 PM – 4:00 PM
    </td>
  </tr>
</table>


## Important Links

::::{grid} 1 1 1 2
:class-container: text-left
:gutter: 3

:::{grid-item-card}
:link: ./website-features.html
<!-- :class-header: bg-light -->

**Website Features 💻**
^^^

A video demonstrating all features of this course website.

:::

:::{grid-item-card}
:link: https://buffalo.app.box.com/embed/s/agqkobz1pl5dynjiohwchybpnq5ke9py?sortColumn=date
<!-- :class-header: bg-light -->

**Lecture Recordings 🎥**
^^^

One place (UBBox) for all lecture recordings.

::::


::::{grid} 1 1 1 2
:class-container: text-left
:gutter: 3

:::{grid-item-card}
:link: ./course-schedule.html
<!-- :class-header: bg-light -->

**Course Schedule ⏰**

^^^

Dates and Deliverables throughout the course.
:::

:::{grid-item-card}
:link: ./capstone-project.html
<!-- :class-header: bg-light -->

**Capstone Project 🔭**
^^^

Details about Capstone Course Project.

::::

```{admonition} Course Schedule (Summer 2025). Lecture Notes and Slides.
:class: dropdown, open, tip

  | **Version** | **Date** | **Topic** | **Webpage/Slides** |**Assignments/Exercises** |
  |-|-|-|-|-|
  | | May 27, Tue   | Course Details, Logistics | [Lecture 0](syllabus.md) / [Slides](https://slides.com/naresh-ub/cvip-lec-0)| 
  | CVIP 1.0 | May 27, Tue | What is an Image?| [Lecture 1](lectures/lecture-1.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-1)| 
  | CVIP 1.0 | May 29, Thu  | Image Formation and the Pinhole Camera (Part 1) | [Lecture 2](lectures/lecture-2-3.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-2-3) |
  | CVIP 1.0 | Jun. 3, Tue  | Image Formation and the Pinhole Camera (Part 2) | [Lecture 3](lectures/lecture-2-3.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-2-3) |
  | CVIP 1.0 | Jun. 5, Thu  | Image Processing (Pixel Domain) | [Lecture 4](lectures/lecture-4.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-4) |
  | CVIP 1.0 | Jun. 10, Tue  | Image Processing (Fourier Domain) | [Lecture 5](lectures/lecture-5.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-5) | Quiz 1, Assignment 1 Release |
  | CVIP 1.0 | Jun. 12, Thu  | Stereo Vision, Depth Estimation (Part 1) | [Lecture 6](lectures/lecture-6-7-8.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-6-7-8) |
  | CVIP 1.0 | Jun. 17, Tue   | Stereo Vision, Depth Estimation (Part 2) | [Lecture 7](lectures/lecture-6-7-8.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-6-7-8) | Capstone Project Release |
  | CVIP 1.0 | Jun. 19, Thu  | Juneteenth Holiday | No Lecture | |
  | CVIP 1.0 | Jun. 24, Tue  | Stereo Vision, Depth Estimation (Part 3) | [Lecture 8](lectures/lecture-6-7-8.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-6-7-8) | Quiz 2 |
  | CVIP 1.0 | Jun. 26, Thu  | Feature Detection | [Lecture 9](lectures/lecture-9.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-9) | |
  | CVIP 1.0 | Jul. 1, Tue   | Learning-based Computer Vision methods (Part 1) | [Lecture 10](lectures/lecture-10-11.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-10) | Assignment 1 Due Date |
  | CVIP 1.0 | Jul. 3, Thu  | Learning-based Computer Vision methods (Part 2) and Midterm Review | [Lecture 11](lectures/lecture-10-11.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-10) | |
  | | Jul. 8, Tue | Midterm Exam | | |
  | CVIP 2.0 | Jul. 10, Thu  | Introduction to Generative AI (Computer Vision Applications) | [Lecture 12](lectures/lecture-12.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-12) | Quiz 3 |
  | CVIP 2.0 | Jul. 15, Tue  | Variational AutoEncoders (Part 1) | [Lecture 13](lectures/lecture-13.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-13-14) | |
  | CVIP 2.0 | Jul. 17, Thu  | Variational AutoEncoders (Part 2) | [Lecture 14](lectures/lecture-14.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-13-14) | Capstone Project Milestone 1 Due Date |
  | CVIP 2.0 | Jul. 22, Tue   | Diffusion Models (Part 1) | [Lecture 15](lectures/lecture-15.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-15-16-17) | Quiz 4 |
  | CVIP 2.0 | Jul. 24, Thu  | Diffusion Models (Part 2) | [Lecture 16](lectures/lecture-16.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-15-16-17) | |
  | CVIP 2.0 | Jul. 29, Tue   | Diffusion Models (Part 3) | [Lecture 17](lectures/lecture-17.ipynb) / [Slides](https://slides.com/naresh-ub/cvip-lec-15-16-17) | |
  | CVIP 2.0 | Jul. 31, Thu  | Open slot for Guest Lecture | [Shruti Agarwal from Adobe Research](https://agarwalshruti15.github.io/) | Quiz 5, Capstone Project Milestone 2 Due Date |
  | CVIP 2.0 | Aug. 5, Tue   | Recent Trends, Models, Applications in GenAI | | |
  |  | Aug. 7, Thu  | Final Exam | | 🔥 All the Best 🔥 |
  | CVIP 2.0 | Aug. 12, Tue   | Capstone Project Presentations - Batch 1 | | Quiz 6 |
  | CVIP 2.0 | Aug. 14, Thu  | Capstone Project Presentations - Batch 2 | | Final Project Due Date |
```

```{figure} figures/course_pic.jpeg

---
width: 100%
name: course-pic
align: center
---
-
```

```{figure} figures/course_pic2.jpeg

---
width: 100%
name: course-pic2
align: center
---
In-class pictures with a few students (Students Enrolled: 71)
```


## Student Feedback

<div class="feedback-section" aria-label="Student Feedback Carousel">
  <div class="carousel-header">
    <!-- Replace with your real links -->
    <div class="profile-links">
      <a href="https://www.ratemyprofessors.com/professor/3113460" target="_blank" rel="noopener">RateMyProfessors</a>
      <a href="https://github.com/naresh-ub/cvip/blob/master/book/docs/summer_25_feedback_573.pdf" target="_blank" rel="noopener">UB Course Evaluations</a>
    </div>
    <div class="carousel-controls">
      <button class="carousel-btn" id="prevBtn" aria-label="Previous feedback">◀</button>
      <button class="carousel-btn" id="nextBtn" aria-label="Next feedback">▶</button>
    </div>
  </div>

  <div class="carousel">
    <div class="carousel-track" id="feedbackTrack" tabindex="0" aria-live="polite">
      <!-- Card 1 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"Professor Devulapally is fantastic. He took a really complex and difficult topic and made it incredibly understandable, as long as you put in the effort. He's also very approachable and makes it clear that you can reach out to him for help with anything. Highly recommend his class!"</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <!-- Card 2 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"Professor Naresh's teaching style is outstanding. His course website with live coding makes complex concepts much easier to understand. His deep knowledge of Deep Learning and GenAI is remarkable, and you get to learn a lot from his classes."</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"Professor Devulapally explains complex concepts in computer vision with great clarity and connects theory to real-world use cases. Assignments are challenging but well-structured and rewarding. Very approachable, supportive, and encourages questions. Highly recommend!"</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <!-- Card 3 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"If you're a visual learner you'll be very satisfied with this course, since almost all lectures have 3D visuals for explaining concepts, which was very helpful to me."</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <!-- Card 4 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"Great Course designed by professor and also well tought. Assignements were bit complex but there was given more than time to take care of it. grading was fair and professor also introduced many newer things like live code feature in his course webpage, so he took lot of efforts."</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <!-- Add more .card blocks as needed -->
      <!-- Card 4 -->
      <!-- Card 4 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"It was one of the best courses I have took and the professor was really helpful throughout the course.”</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
      <!-- Card 4 -->
      <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"I took Computer Vision under the professor and it was quite good. He focused on state-of-the-art technology and was always ready with examples. Things were to the point and easy to understand, and he made tough concepts seem so simple it was just amazing. I was not expecting him to teach such tough concepts, but he did, and taught them quite well."</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
       <article class="card" role="group" aria-roledescription="slide">
        <blockquote>"Awesome professor with clear and well-structured lecture delivery. Highly knowledgeable in the subject."</blockquote>
        <div class="student">— Student, Summer 2025</div>
      </article>
    </div>
  </div>
</div>

<script>
  (function () {
    const track = document.getElementById('feedbackTrack');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');

    function cardStep() {
      const first = track.querySelector('.card');
      const trackStyles = window.getComputedStyle(track);
      const gap = parseInt(trackStyles.columnGap || trackStyles.gap || 16, 10);
      return first ? first.getBoundingClientRect().width + gap : 0;
    }

    function updateButtons() {
      const atStart = track.scrollLeft <= 0;
      const atEnd = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
      prev.disabled = atStart;
      next.disabled = atEnd;
    }

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
      setTimeout(updateButtons, 250);
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: cardStep(), behavior: 'smooth' });
      setTimeout(updateButtons, 250);
    });

    // ---- Allow page to scroll vertically; block only horizontal gestures on the track ----
    // Wheel: prevent default ONLY when user intends horizontal scroll (Shift+wheel or deltaX-dominant)
    track.addEventListener('wheel', (e) => {
      const horizontalIntent = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (horizontalIntent) {
        e.preventDefault(); // block horizontal wheel on the track
      } // otherwise let vertical scroll bubble to the page
    }, { passive: false });

    // Touch: allow vertical swipes to bubble; block horizontal swipes on the track
    let touchStartX = 0, touchStartY = 0, decided = false, blockHorizontal = false;

    track.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      decided = false;
      blockHorizontal = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!e.touches || !e.touches[0]) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      // decide once per gesture
      if (!decided && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        blockHorizontal = Math.abs(dx) > Math.abs(dy); // true if horizontal-dominant
        decided = true;
      }

      if (blockHorizontal) {
        e.preventDefault(); // block horizontal swipe on the track
      } // else let vertical swipe scroll the page
    }, { passive: false });

    window.addEventListener('resize', updateButtons);
    updateButtons();
  })();
</script>



### Feedback welcome!

If you found this course website useful, please consider the following:

- Star the Git Repo: github.com/naresh-ub/cvip
- Provide feedback at Rate my Professor: https://www.ratemyprofessors.com/professor/3113460