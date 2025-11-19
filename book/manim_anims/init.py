# lecture1_intro.py
from manim import *
from manim_slides import Slide


def add_shadow(mobject, color=BLACK, opacity=0.2, shift=(0.2, -0.2, 0)):
    """
    Wrap a mobject with a drop shadow:
    - shadow is a filled copy, no stroke
    - shifted slightly
    - placed behind via z_index
    Returns a VGroup(shadow, mobject).
    """
    shadow = (
        mobject.copy()
        .set_fill(color, opacity=opacity)
        .set_stroke(width=0)
        .shift(shift)
    )

    shadow.set_z_index(mobject.z_index - 1)
    mobject.set_z_index(mobject.z_index)

    return VGroup(shadow, mobject)


def remove_shadow(group):
    """
    Given a VGroup(shadow, mobject), return the original mobject.
    (Kept for completeness; not used in this scene.)
    """
    if isinstance(group, VGroup) and len(group) == 2:
        return group[1]
    else:
        raise ValueError("Input is not a VGroup with shadow and mobject.")


UB_BLUE = "#2E74D1"       # UB primary blue
UB_BLUE_DARK = "#245ca6"  # darker footer middle blue

# Global date variable (as requested)
DATE_STR = r"May 27 2025"


class Lecture1Intro(Slide):
    """
    UB lecture title slide for:
      CSE 4/573: Computer Vision and Image Processing
      Instructor: Naresh Kumar Devulapally
      Date: DATE_STR
    """

    COURSE_NAME = r"\textbf{CSE 4/573: Computer Vision and Image Processing}"
    INSTRUCTOR_NAME = r"\textbf{Naresh Kumar Devulapally}"
    UB_LOGO_PATH = "./book/_static/manim_assets/ub_logo_1.png"  # adjust path if needed

    def __init__(self, **kwargs):
        self.course_name = self.COURSE_NAME
        self.instructor_name = self.INSTRUCTOR_NAME
        self.date_str = DATE_STR
        self.ub_logo_path = self.UB_LOGO_PATH
        super().__init__(**kwargs)

    def construct(self):
        # ==========================================================
        # 0. Background
        # ==========================================================
        self.camera.background_color = WHITE

        # ==========================================================
        # 1. Title rounded rectangle + title text
        # ==========================================================
        main_title = r"\textbf{What is an Image?}"
        lecture_num = r"Lecture 1: May 27, 2025"
        subtitle = None  # adjust if you want a subtitle later

        # Title box (with shadow)
        base_title_box = RoundedRectangle(
            corner_radius=0.4,
            width=10.5,
            height=2.2,
            fill_color=UB_BLUE,
            fill_opacity=1.0,
            stroke_color=UB_BLUE,
            stroke_width=0,
        )
        self.title_box = add_shadow(base_title_box, color=BLACK, opacity=0.2)

        # Title text (white on blue)
        self.title_tex = Tex(main_title, color=WHITE).scale(1.0)
        self.lecture_num_tex = Tex(lecture_num, color=BLACK).scale(0.8)

        if subtitle:
            self.subtitle_tex = Tex(subtitle, color=WHITE).scale(0.8)
            self.title_text_group = VGroup(
                self.title_tex, self.subtitle_tex
            ).arrange(DOWN, buff=0.25)
        else:
            self.title_text_group = VGroup(self.title_tex)

        self.title_group = VGroup(self.title_box, self.title_text_group)
        self.title_group.to_edge(UP, buff=1.4)

        # ==========================================================
        # 2. Instructor name and lecture number in center
        # ==========================================================
        self.instructor_tex = Tex(self.instructor_name, color=BLACK).scale(0.9)
        self.instructor_tex.next_to(self.title_group, DOWN, buff=1.5)

        self.lecture_num_tex.next_to(self.instructor_tex, DOWN, buff=0.4)

        # ==========================================================
        # 3. Footer bar (two segments) + footer text
        # ==========================================================
        frame_width = config.frame_width
        footer_height = 0.6
        segment_width1 = frame_width / 2 + 1.7
        segment_width2 = frame_width / 2 - 1.7

        left_rect = Rectangle(
            width=segment_width1,
            height=footer_height,
            fill_color=UB_BLUE,
            fill_opacity=1.0,
            stroke_width=0,
        )
        right_rect = Rectangle(
            width=segment_width2,
            height=footer_height,
            fill_color=UB_BLUE_DARK,
            fill_opacity=1.0,
            stroke_width=0,
        )

        self.footer_rects = VGroup(left_rect, right_rect).arrange(RIGHT, buff=0)

        # Horizontal margin so footer doesn't touch screen edges
        margin_x = 0.5
        self.footer_rects.set_width(frame_width - 2 * margin_x)

        # Vertical gap from bottom
        self.footer_rects.to_edge(DOWN, buff=0.2)

        # Footer text (white)
        course_footer_tex = Tex(self.course_name, color=WHITE).scale(0.6)
        instructor_footer_tex = Tex(self.instructor_name, color=WHITE).scale(0.6)
        date_footer_tex = Tex(self.date_str, color=WHITE).scale(0.4)

        course_footer_tex.move_to(left_rect)
        instructor_footer_tex.move_to(right_rect)

        self.footer_text_group = VGroup(
            course_footer_tex, instructor_footer_tex, date_footer_tex
        )
        self.footer_group = VGroup(self.footer_rects, self.footer_text_group)

        # ==========================================================
        # 4. UB logo at bottom-right above footer
        # ==========================================================
        self.ub_logo = ImageMobject(self.ub_logo_path).scale(0.1)
        self.ub_logo.next_to(self.footer_rects, UP, buff=0.3)
        self.ub_logo.align_to(self.footer_rects, RIGHT)

        # ==========================================================
        # 5. Animations for the FIRST slide (title slide)
        # ==========================================================
        self.play(
            FadeIn(self.title_box),
            Write(self.title_text_group),
            Write(self.instructor_tex),
            FadeIn(self.footer_rects),
            Write(self.footer_text_group),
            FadeIn(self.ub_logo),
            Write(self.lecture_num_tex),
            run_time=2.0,
        )
        self.wait(3)

        # End of Slide 1
        self.next_slide()

        # Fade out box + instructor/lecture number, keep title text only
        self.play(
            FadeOut(self.title_box),
            FadeOut(self.instructor_tex),
            FadeOut(self.ub_logo),
            FadeOut(self.lecture_num_tex),
            run_time=0.8,
        )
        self.title_text_group.set_color(BLACK)

        # Move title text to top-left
        self.play(
            self.title_text_group.animate.to_edge(UL, buff=0.5),
            run_time=1.0,
        )

        # End of "header only" slide
        self.next_slide()

        # ==========================================================
        # 6. Pinhole camera animation (multi-slide)
        # ==========================================================

        # Geometry constants
        axis_y = -1.0    # y-coordinate of the main horizontal line
        Z_tracker = ValueTracker(4.0)   # object distance Z (will animate)
        H_value = 2.0                   # object height (above axis)
        f_value = 3.0                   # focal length (distance to image plane)

        # 6.1 Main horizontal line (optical axis)
        optical_axis = Line(
            start=np.array([-6, axis_y, 0]),
            end=np.array([6, axis_y, 0]),
            color=BLACK,
        ).set_stroke(width=2)

        # Tree object (always_redraw so it moves when Z changes)
        def get_tree():
            Z = Z_tracker.get_value()
            x_obj = -Z

            trunk_height = 0.8
            trunk = Rectangle(
                width=0.25,
                height=trunk_height,
                fill_color="#8B4513",  # brown
                fill_opacity=1.0,
                stroke_color=BLACK,
                stroke_width=1,
            )

            canopy = Triangle(
                fill_color=GREEN,
                fill_opacity=1.0,
                stroke_color=BLACK,
                stroke_width=1,
            )
            canopy.scale(0.8)

            tree = VGroup(trunk, canopy).arrange(UP, buff=0)

            # Scale tree so its total height is exactly H_value
            current_height = tree.height
            if current_height > 0:
                scale_factor = H_value / current_height
                tree.scale(scale_factor)

            # Align bottom of tree exactly on axis_y
            bottom_y = tree.get_bottom()[1]
            tree.shift(DOWN * (bottom_y - axis_y))  # shift so bottom_y -> axis_y

            # Move to correct x position
            tree.shift(RIGHT * x_obj)

            # Add "H" label inside tree
            H_label = Tex("Object", color=BLACK).scale(0.7)
            H_label.move_to(tree.get_center() + UP * 1.5)
            return VGroup(tree, H_label)

        tree_group = always_redraw(get_tree)

        # ---------------- Slide 2: axis + tree ----------------
        self.play(Create(optical_axis), run_time=1.0)
        self.play(FadeIn(tree_group), run_time=1.0)
        self.next_slide()

        # 6.2 Image plane (vertical line at x = f)
        image_plane = Line(
            start=np.array([f_value, axis_y - 2, 0]),
            end=np.array([f_value, axis_y + 3, 0]),
            color=BLACK,
        ).set_stroke(width=2)

        image_plane_label = Tex(r"image plane", color=BLACK).scale(0.6)
        image_plane_label.next_to(image_plane, UP + RIGHT, buff=0.3)

        self.play(Create(image_plane), run_time=1.0)
        self.play(FadeIn(image_plane_label), run_time=1.0)

        self.next_slide()

        # 6.3 Pinhole camera + arrow + label
        pinhole_point = np.array([0, axis_y, 0])
        pinhole = Dot(pinhole_point, color=BLACK)

        pinhole_label = Tex("pinhole camera", color=BLACK).scale(0.6)
        pinhole_label.next_to(pinhole, UP*4 + RIGHT, buff=0.3)

        pinhole_arrow = Arrow(
            start=pinhole_label.get_bottom() + DOWN * 0.1,
            end=pinhole_point + UP * 0.15 + RIGHT * 0.05,
            stroke_width=2,
            buff=0.0,
            color=BLACK,
        )

        self.play(
            FadeIn(pinhole),
            FadeIn(pinhole_label),
            FadeIn(pinhole_arrow),
            run_time=1.0,
        )
        self.next_slide()

        # 6.4 Distance annotations: Z and f

        def get_Z_group():
            Z = Z_tracker.get_value()
            x_obj = -Z
            start = np.array([x_obj, axis_y, 0])
            end = np.array([0.0, axis_y, 0])
            line = Line(start, end, color=ORANGE).set_stroke(width=3)
            label = Tex("Z", color=BLACK).scale(0.6)
            label.next_to(line, DOWN, buff=0.1)
            return VGroup(line, label)

        Z_group = always_redraw(get_Z_group)

        f_line = Line(
            start=pinhole_point,
            end=np.array([f_value, axis_y, 0]),
            color=YELLOW,
        ).set_stroke(width=2)
        f_label = Tex("f", color=BLACK).scale(0.6)
        f_label.next_to(f_line, DOWN, buff=0.1)
        f_group = VGroup(f_line, f_label)

        self.play(
            FadeIn(Z_group),
            FadeIn(f_group),
            run_time=1.0,
        )
        self.next_slide()

        # 6.5 Light ray from sun → top of object → pinhole → image plane

        sun_pos = np.array([-6, axis_y + 3, 0])
        sun = Circle(radius=0.2, color=BLACK).set_fill(YELLOW, opacity=1.0)
        sun.move_to(sun_pos)

        def get_top_object():
            Z = Z_tracker.get_value()
            x_obj = -Z
            return np.array([x_obj, axis_y + H_value, 0])

        def get_top_image():
            Z = Z_tracker.get_value()
            # y_image distance from axis (inverted): y = -f * H / Z
            y_offset = -f_value * H_value / Z
            return np.array([f_value, axis_y + y_offset, 0])

        # Rays (always_redraw so they update with Z)
        def get_sun_to_obj_ray():
            return Line(sun_pos, get_top_object(), color=BLACK).set_stroke(width=2)

        def get_obj_to_pinhole_ray():
            return Line(get_top_object(), pinhole_point, color=BLACK).set_stroke(width=2)

        def get_pinhole_to_image_ray():
            return Line(pinhole_point, get_top_image(), color=BLACK).set_stroke(width=2)

        sun_to_obj_ray = always_redraw(get_sun_to_obj_ray)
        obj_to_pinhole_ray = always_redraw(get_obj_to_pinhole_ray)
        pinhole_to_image_ray = always_redraw(get_pinhole_to_image_ray)

        self.play(FadeIn(sun), run_time=0.5)
        self.play(
            FadeIn(sun_to_obj_ray),
            FadeIn(obj_to_pinhole_ray),
            FadeIn(pinhole_to_image_ray),
            run_time=1.5,
        )
        self.next_slide()

        # 6.6 Fade out sun and ray from sun → object (keep rest of rays)
        self.play(
            FadeOut(sun),
            FadeOut(sun_to_obj_ray),
            run_time=1.0,
        )
        self.next_slide()

        # 6.7 Annotate object height H and image height y

        def get_object_height_group():
            Z = Z_tracker.get_value()
            x_obj = -Z
            base = np.array([x_obj, axis_y, 0])
            top = np.array([x_obj, axis_y + H_value, 0])
            line = Line(base, top, color=BLACK).set_stroke(width=2)
            label = Tex("H", color=BLACK).scale(0.6)
            label.next_to(line, LEFT, buff=0.1)
            return VGroup(line, label)

        def get_image_height_group():
            base = np.array([f_value, axis_y, 0])
            top = get_top_image()
            line = Line(base, top, color=GREEN).set_stroke(width=2)
            label = Tex("y", color=BLACK).scale(0.6)
            # place label on the side away from axis if inverted
            side = RIGHT if top[1] < axis_y else LEFT
            label.next_to(line, side, buff=0.1)
            return VGroup(line, label)

        object_height_group = always_redraw(get_object_height_group)
        image_height_group = always_redraw(get_image_height_group)

        self.play(
            FadeIn(object_height_group),
            FadeIn(image_height_group),
            run_time=1.5,
        )
        self.next_slide()

        # 6.8 Move tree closer to pinhole → image grows
        self.play(
            Z_tracker.animate.set_value(2.8),
            run_time=3.0,
            rate_func=smooth,
        )
        self.next_slide()

        # 6.9 Move tree farther from pinhole → image shrinks
        self.play(
            Z_tracker.animate.set_value(5.5),
            run_time=3.0,
            rate_func=smooth,
        )
        self.wait(1)
        # (You can add another next_slide() here if you want a final pinned frame)