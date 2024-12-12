from manim import *

def arr_obj(array, blank = False, scale = 1, square_size = 0.5, color = None, fill = None, text_color = None, mode = "manimce"):
    if mode == "manimce":
        squares = VGroup()
        for index, number in enumerate(array):
                
                if fill:
                    square = Square(side_length=square_size, color = color, fill_color = fill, fill_opacity=0.6, stroke_width=1.5)
                else:
                    square = Square(side_length=square_size, color = color, stroke_width=1.5)
                
                if text_color:
                    num = Tex(number, color = text_color)
                else:
                    num = Tex(number)

                if not blank:
                    num.move_to(square.get_center()).scale(square_size)
                    square_group = VGroup(square, num)
                else:
                    square_group = VGroup(square)
                
                if index != 0:
                    square_group.next_to(squares[-1], RIGHT, buff=0)  # No gap between squares
                squares.add(square_group)

        squares.scale(scale)
    else:
        pass

    return squares
