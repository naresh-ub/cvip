from manim import *

class CustomGrid:
    def __init__(self, grid_data, config=None):
        self.config = {
            "cell_size": 0.5,  # Size of each cell in the grid
            "cell_color": "#dde5b6",  # Color of the grid cells
            "text_color": WHITE,  # Color of the text in cells
            "stroke_width": 2.0,  # Width of the cell borders
        }
        if config:
            self.config.update(config)

        self.grid_data = grid_data
        self.grid_mobject = self.create_grid()

    def create_grid(self):
        grid = VGroup()
        for i, row in enumerate(self.grid_data):
            for j, value in enumerate(row):
                cell = Square(side_length=self.config["cell_size"])
                cell.set_stroke(color=self.config["cell_color"], width=self.config["stroke_width"])
                cell.set_fill(color=self.config["cell_color"], opacity=0.5)
                cell_text = Text(str(value), color=self.config["text_color"]).scale(0.3)
                cell_text.move_to(cell.get_center())

                cell_group = VGroup(cell, cell_text)
                cell_group.move_to(np.array([j*self.config["cell_size"], -i*self.config["cell_size"], 0]))
                grid.add(cell_group)
        
        return grid

    def get_grid(self):
        return self.grid_mobject