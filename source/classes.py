from manim import *

class Plot(Scene):
    @classmethod
    def create(cls, graph_function, x_range=(-5, 5), y_range=(-5, 5), labels=True, **kwargs):
        """
        Factory method to dynamically initialize the class with custom inputs.
        """
        scene = cls(**kwargs)
        scene.graph_function = graph_function
        scene.x_range = x_range
        scene.y_range = y_range
        scene.points = np.linspace(x_range[0], x_range[1], 200)
        scene.labels = labels
        return scene

    def construct(self):
        # Define the axes
        axes = Axes(
            x_range=self.x_range,  # Adjusted range for better visibility
            y_range=self.y_range,
            y_length=7,
            x_length=7,
            tips=False
        )
        if self.labels:
            axes.add_coordinates(font_size=25)

        self.play(Write(axes))

        # Generate values using linspace and the function
        x_values = self.points
        y_values = self.graph_function(x_values)

        # Convert to points for plotting
        points = [axes.c2p(x, y) for x, y in zip(x_values, y_values)]
        cos_curve = VMobject(color=RED).set_points_smoothly(points)

        # Plot the curve
        self.play(Create(cos_curve))
        self.wait(2)