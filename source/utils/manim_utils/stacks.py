from manim import *

class CustomStack:
    def __init__(self, config=None):
        self.config = {
            "element_color": BLUE,
            "element_width": 1.5,
            "element_height": 0.5,
            "fill_opacity": 1.0,
            "stroke_width": 2.0,
            "text_color": WHITE,
            "scale": 0.7,
            "buff": 0.1,  # Distance between elements
        }
        if config:
            self.config.update(config)

        self.elements = VGroup()  # Holds the visual elements of the stack

    def push(self, value):
        # Create a new stack element
        new_element = Rectangle(width=self.config["element_width"], height=self.config["element_height"],
                                color=self.config["element_color"], fill_opacity=self.config["fill_opacity"],
                                stroke_width=self.config["stroke_width"])
        element_text = Tex(value, color=self.config["text_color"]).scale(self.config["scale"])
        element_text.move_to(new_element.get_center())

        element_group = VGroup(new_element, element_text)
        element_group.next_to(self.elements, UP, buff=self.config["buff"]) if self.elements else element_group.to_edge(DOWN)

        self.elements.add(element_group)
        # self.update_border()
        return element_group

    def pop(self):
        if self.elements:
            to_pop = self.elements[-1]
            self.elements.remove(to_pop)
            # self.update_border()
            return to_pop
        else:
            return None

    def create_stack(self):
        # Simply return the elements VGroup
        return self.elements


def create_borders(stack_obj):
    line = Line(stack_obj[0].get_bottom()+DOWN*0.2, stack_obj[-1].get_top()).next_to(stack_obj, LEFT, buff = 0.1)
    line2 = line.copy().next_to(stack_obj, RIGHT, buff = 0.1)
    line3 = Line(line.get_start(), line2.get_start())
    
    stack_obj.add(line, line2, line3)
    return stack_obj
