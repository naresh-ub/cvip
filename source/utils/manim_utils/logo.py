import sys
import os
sys.path.append('utils/manim_utils')

current_dir = os.path.dirname(os.path.abspath(__file__))

# Assuming 'utils' is one level above 'mth-531'
utils_path = os.path.abspath(os.path.join(current_dir, '..', "utils", "manim_utils"))

# Add 'utils' directory to sys.path if it's not already added
if utils_path not in sys.path:
    sys.path.append(utils_path)

from manim import *
from arrays import *
from graphs import *
from grids import *
from linkedlists import *
from queues import *
from stacks import *
from stacks import *
from trees import *
import random

class Logo(MovingCameraScene):
    def construct(self):
        array = [-1, 0, 2, 1, 1]  # Example array

        vertices = [8, 3, 10, 1, 6, 14, 4, 7, 13]
        edges = [(8, 3), (8, 10), (3, 1), (3, 6), (10, 14),
                 (6, 4), (6, 7), (14, 13)]

        scale = 0.5
        num_squares = 8
        random.seed(15)
        text_col = "#fcecae" #f8af86 #fcecae

        def create_group():
            # Assuming arr_obj is a function that creates the desired object
            squares = arr_obj(array, scale=scale, square_size=1, color=GOLD, fill=PURPLE, text_color=YELLOW)
            squares.move_to(ORIGIN)

            arrow1 = Arrow(ORIGIN, DOWN, buff=0).next_to(squares[0], DOWN, buff=0).scale(scale)
            arrow2 = Arrow(ORIGIN, UP, buff=0).next_to(squares[4], UP, buff=0).scale(scale)
            arrow3 = Arrow(ORIGIN, DOWN, buff=0).next_to(squares[2], DOWN, buff=0).scale(scale)

            num1 = Tex("i = 0").next_to(arrow1, DOWN, buff=0).scale(scale)
            num2 = Tex("j = 4").next_to(arrow2, UP, buff=0).scale(scale)
            num3 = Tex("k = 2").next_to(arrow3, DOWN, buff=0).scale(scale)

            array_group = VGroup(squares, num1, num2, num3, arrow1, arrow2, arrow3).scale(0.7)
            array_text = Tex(r"\textbf{Arrays}").next_to(array_group, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            array_group.add(array_text)

            # Custom Tree
            tree_obj = CustomTree(vertices=vertices, edges = edges)
            graph = tree_obj.create_tree()
            arrows = tree_obj.create_arrows(graph)
            tree_group = VGroup(graph, arrows).scale(scale)
            tree_text = Tex(r"\textbf{Trees}").next_to(tree_group, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            tree_group.add(tree_text)
            
            # Custom Graph
            graph_obj = CustomGraph(vertices=vertices, edges = edges)
            graph1 = graph_obj.create_graph()
            # graph_arrows = graph_obj.create_arrows(graph1)
            graph_group = VGroup(graph1).scale(scale)
            graph_text = Tex(r"\textbf{Graphs}").move_to(graph_group.get_center()).scale(scale).set_color(text_col)
            graph_group.add(graph_text)

            # Linked List
            linked_list_values = ["A", "B", "C", "D", "E"]
            linked_list = CustomLinkedList(linked_list_values)
            ll_group = linked_list.construct()
            head_label = Tex("Head", color=WHITE).scale(0.5)
            head_label.next_to(ll_group[0][0][0][0], UP, buff=0.1)
            ll_group.add_to_back(head_label)
            ll_group.scale(scale)
            ll_text = Tex(r"\textbf{Linked Lists}").next_to(ll_group, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            ll_group.add(ll_text)

            # Stack
            elements = ["A", "B", "C"]
            stack = CustomStack()
            stack_obj = VGroup()

            for e in elements:
                ele = stack.push(e)
                stack_obj.add(ele)
        
            stack_obj = create_borders(stack_obj).scale(scale)
            stack_text = Tex(r"\textbf{Stack}").next_to(stack_obj, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            stack_obj.add(stack_text)

            # Queue
            queue = CustomQueue()

            animate_queue = False
            
            # Enqueue elements into the queue
            elements = queue.enqueue("1", self, animate_queue)
            elements = queue.enqueue("2", self, animate_queue)
            elements = queue.enqueue("3", self, animate_queue)

            queue = queue.create_borders(elements, self).scale(scale)
            q_text = Tex("Queue").next_to(queue, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            queue.add(q_text)

            # Grid
            grid_data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
            custom_grid = CustomGrid(grid_data)
            grid_obj = custom_grid.get_grid().scale(scale*1.5)
            grid_text = Tex(r"\textbf{Dynamic}").next_to(grid_obj, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            grid_text1 = Tex(r"\textbf{Programming}").next_to(grid_text, DOWN, buff = -0.1).scale(scale).set_color(text_col)

            grid_obj.add(grid_text, grid_text1)

            # Matrix
            m0 = Matrix([["\pi", 3], [1, 2], [1, 5]])
            bra = m0.get_brackets()
            colors = [BLUE, GREEN]
            for k in range(len(colors)):
                bra[k].set_color(colors[k])
            
            m0.scale(scale)
            matrix_text = Tex(r"\textbf{Matrices}").next_to(m0, DOWN, buff = 0.1).scale(scale).set_color(text_col)
            m0.add(matrix_text)


            return VGroup(m0, graph_group, 
                          grid_obj, ll_group, 
                          tree_group, array_group, stack_obj,
                          queue)

        groups = create_group()

        # Grid dimensions
        rows = cols = int(np.ceil(np.sqrt(num_squares)))
        grid_width = config.frame_width / cols
        grid_height = config.frame_height / rows

        # Define a smaller central exclusion zone
        exclusion_radius = 0.3

        positions = []
        for row in range(rows):
            for col in range(cols):
                x = col * grid_width - config.frame_width / 2 + grid_width / 2
                y = row * grid_height - config.frame_height / 2 + grid_height / 2

                # Exclude a smaller central area
                if not (-exclusion_radius < x < exclusion_radius and -exclusion_radius < y < exclusion_radius):
                    positions.append(np.array([x, y, 0]))
        random.seed(5)
        # random.shuffle(positions)
        selected_positions = positions[:num_squares]

        animations = []

        for group, pos in zip(groups, selected_positions):
            # group.rotate(PI/30)  # 45 degree rotation
            group.move_to(pos)
            animations.append(Create(group))

        channel_name = VGroup()
        channel_name.add(Tex("Visualizing", font_size=10).move_to(ORIGIN))
        channel_name.add(Tex("Data Structures", font_size=10).next_to(channel_name[0], DOWN, buff = 0))

        # channel_name.scale(0.1)
        animations.append(FadeIn(channel_name))

        self.play(*animations)
        self.wait(0.8)

        self.play(self.camera.frame.animate.scale(0.1).move_to(channel_name), run_time = 3)

        # leetcode_svg = "manim_utils/leetcode.svg"
        # leetcode_logo = SVGMobject(leetcode_svg).scale(0.11)
        # leetcode_logo[2].set_color(WHITE)

        # # print("Number of elements", len(leetcode_logo))
        # leetcode_logo.next_to(channel_name, RIGHT, buff = 0.02)
        # self.play(Create(leetcode_logo), run_time = 1)
        self.wait()