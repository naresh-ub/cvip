from manim import *

class CustomLinkedList:
    def __init__(self, values, config=None):
        self.values = values
        self.config = {
            "square_size":0.6,
            "scale": 0.5,
            "node_color": WHITE,
            "node_fill_opacity": 1,
            "text_color": BLACK,
            "arrow_color": WHITE,
            "stroke_width": 2.0,
            "buff": 0.5,  # Distance between nodes
        }
        if config:
            self.config.update(config)

    def create_nodes(self):
        nodes = VGroup()
        for index, value in enumerate(self.values):
            # Node is made up of two squares, one for data and one for the link
            data_square = Square(side_length=self.config["square_size"], color=self.config["node_color"],
                                 fill_opacity=self.config["node_fill_opacity"],
                                 stroke_width=self.config["stroke_width"])
            link_square = Square(side_length=self.config["square_size"]-0.03, color=self.config["node_color"],
                                 fill_opacity=0)  # Empty square for link

            # Group the data square and link square
            node = VGroup(data_square, link_square).arrange(RIGHT, buff=0)
            
            # Node value
            text = Tex(value, color=self.config["text_color"]).scale(self.config["scale"])
            text.move_to(data_square.get_center())

            # Labels for 'Data' and 'Link'
            data_label = Tex("Data", color=self.config["arrow_color"]).scale(self.config["scale"]-0.1)
            link_label = Tex("Link", color=self.config["arrow_color"]).scale(self.config["scale"]-0.1)

            # Position labels below their respective squares
            data_label.next_to(data_square, DOWN, buff=0.1)
            link_label.next_to(link_square, DOWN, buff=0.1)
            
            node_group = VGroup(node, text, data_label, link_label)

            if index != 0:
                node_group.next_to(nodes[-1], RIGHT, buff=self.config["buff"])
            nodes.add(node_group)
        
        return nodes

    def create_arrows(self, nodes):
        arrows = VGroup()
        for i in range(len(nodes) - 1):
            start = nodes[i][0][1].get_center()  # Get the center of the link square
            end = nodes[i+1][0][0].get_left()  # Get the left side of the next data square
            arrow = Arrow(start, end, buff=0.1, color=self.config["arrow_color"],
                          stroke_width=self.config["stroke_width"])
            arrows.add(arrow)
        return arrows

    def construct(self):
        nodes = self.create_nodes()
        arrows = self.create_arrows(nodes)
        linked_list = VGroup(nodes, arrows)
        return linked_list