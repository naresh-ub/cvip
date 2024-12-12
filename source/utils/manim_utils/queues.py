from manim import *

class CustomQueue:
    def __init__(self, config=None):
        self.config = {
            "element_color": GREEN,
            "element_size": 1,  # Making elements squares
            "fill_opacity": 1.0,
            "stroke_width": 2.0,
            "text_color": WHITE,
            "scale": 0.7,
            "buff": 0.2,  # Distance between elements
        }
        if config:
            self.config.update(config)
        
        self.elements = VGroup()  # Holds the visual elements of the queue

    def enqueue(self, value, scene, play = False):
        # Create a new queue element
        new_element = Square(side_length=self.config["element_size"],
                             color=self.config["element_color"],
                             fill_opacity=self.config["fill_opacity"],
                             stroke_width=self.config["stroke_width"])
        element_text = Tex(value, color=self.config["text_color"]).scale(self.config["scale"])
        element_text.move_to(new_element.get_center())

        element_group = VGroup(new_element, element_text)

        start = ORIGIN - RIGHT *2

        element_group.move_to(start)
        
        if self.elements:
          end = self.elements[-1].get_left() + LEFT*(1-self.config["buff"])
        else:
          end = ORIGIN + RIGHT*2
        
        if play:
          scene.play(element_group.animate.move_to(end))

        if self.elements:
          element_group.next_to(self.elements[-1], LEFT, buff = self.config["buff"])
        else:
          element_group.move_to(end)
  
        self.elements.add(element_group)
        
        return self.elements

    def dequeue(self, scene):
        if self.elements:
            # Remove the first element from the elements VGroup
            to_dequeue = self.elements[0]
            self.elements.remove(to_dequeue)
            # Animate the element sliding out to the right
            return scene.play(to_dequeue.animate.move_to(RIGHT * 4).set_color(BLACK))
        else:
            return None

    def create_queue(self):
        # Simply return the elements VGroup
        return self.elements

    def create_borders(self, queue_obj, scene):
          line = Line(queue_obj[0].get_right()+RIGHT*0.2, queue_obj[-1].get_left()).next_to(queue_obj, UP, buff = 0.1)
          line2 = line.copy().next_to(queue_obj, DOWN, buff = 0.1)
          # line3 = Line(line.get_start(), line2.get_start())
          
          queue_obj.add(line, line2)
          return queue_obj