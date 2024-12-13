# from manim import *
# from IPython.display import Video, HTML, display, clear_output, Image
# import requests
# import logging
# import re
# import io
# import time
# import os
# import shutil

# def start():
#     logging.basicConfig(level=logging.INFO)
#     log_capture_string = io.StringIO()
#     ch = logging.StreamHandler(log_capture_string)
#     ch.setLevel(logging.INFO)
#     logger = logging.getLogger('manim')
#     logger.addHandler(ch)
#     return log_capture_string, ch, logger

# q_dict = {'-ql': (480, 854, 15), '-qm': (720, 1280, 30), '-qh': (1080, 1920, 60), '-qk': (2160, 3840, 60)}

# def render_manim(scene_class, **kwargs):
#     """
#     Handles rendering for both pre-initialized Scene objects and Scene classes.
#     """
#     log_capture_string, ch, logger = start()
#     config.flush_cache = True
#     config.pixel_height, config.pixel_width, config.frame_rate = q_dict['-qm']  # Default to medium quality

#     # Dynamically initialize the class using the `create` method
#     if hasattr(scene_class, "create"):
#         scene = scene_class.create(**kwargs)  # Use the factory method to initialize
#     elif issubclass(scene_class, Scene):
#         scene = scene_class(**kwargs)  # Fallback for classes without `create`
#     else:
#         raise TypeError("Input to render_manim must be a Scene class with a 'create' method or subclass of Scene.")

#     scene.render()
    
#     # Pass the scene to the show_local function
#     show_local(scene, log_capture_string)

# def show_local(sc, log_capture_string):
#     config.flush_cache = True
#     scene = sc
#     scene.render()

#     log_contents = log_capture_string.getvalue()
#     file_path_match_video = re.search(r"File ready at '(.+?).mp4'", log_contents)
#     file_path_match_image = re.search(r"File ready at '(.+?).png'", log_contents)
    
#     if file_path_match_video:
#         file_path = file_path_match_video.group(1) + '.mp4'
#         display_file(file_path)

# def display_file(file_path):
#     current_dir = os.getcwd()
#     path_parts = file_path.split(os.sep)
    
#     relative_to_source = ''
#     while not os.path.exists(os.path.join(current_dir, 'source')):
#         current_dir = os.path.dirname(current_dir)
#         relative_to_source = os.path.join('..', relative_to_source)
    
#     relative_to_source = relative_to_source[3:]
    
#     media_folder = os.path.join(current_dir, 'source', '_static', 'media')

#     if not os.path.exists(media_folder):
#         os.makedirs(media_folder)
    
#     timestamp = int(time.time())
#     base_file_name = os.path.basename(file_path)
    
#     print("base file name", base_file_name)
    
#     file_extension = os.path.splitext(file_path)[1].lower()
#     unique_file_name = f"{os.path.splitext(base_file_name)[0]}_{timestamp}{file_extension}"
    
#     local_file_path = os.path.join(media_folder, unique_file_name)
#     print("local_file_path", local_file_path)
    
#     base_name_without_extension = os.path.splitext(base_file_name)[0]
#     for existing_file in os.listdir(media_folder):
#         if existing_file.startswith(base_name_without_extension) and existing_file.endswith('.mp4'):
#             existing_file_path = os.path.join(media_folder, existing_file)
#             os.remove(existing_file_path)
            
#     shutil.copy(file_path, local_file_path)
    
#     shutil.rmtree('media', ignore_errors=True)
    
#     relative_media_path = os.path.join(relative_to_source, '_static', 'media', unique_file_name)
    
#     clear_output(wait=True)
    
#     if file_extension == '.mp4':
#       display(Video(local_file_path, width=500, embed=True))
    
#     elif file_extension == '.png':
#         display(Image(filename=local_file_path))
#     else:
#         raise ValueError(f"Unsupported file extension: {file_extension}")

from manim import *
from IPython.display import Video, HTML, display, clear_output, Image
import numpy as np
import logging
import re
import io
import os
import time
import shutil

# Logging setup
def start():
    logging.basicConfig(level=logging.INFO)
    log_capture_string = io.StringIO()
    ch = logging.StreamHandler(log_capture_string)
    ch.setLevel(logging.INFO)
    logger = logging.getLogger('manim')
    logger.addHandler(ch)
    return log_capture_string, ch, logger

# Quality settings
q_dict = {'low': (480, 854, 15), 'medium': (720, 1280, 30), 'high': (1080, 1920, 60), '4k': (2160, 3840, 60)}

# Rendering utility
def render_manim(scene_class, quality="medium", **kwargs):
    """
    Handles rendering for Scene classes with dynamic initialization.
    """
    log_capture_string, ch, logger = start()
    config.flush_cache = True
    config.pixel_height, config.pixel_width, config.frame_rate = q_dict[quality]  # Default to medium quality

    # Dynamically initialize the class using the `create` method
    if hasattr(scene_class, "create"):
        scene = scene_class.create(**kwargs)  # Use the factory method to initialize
    elif issubclass(scene_class, Scene):
        scene = scene_class(**kwargs)  # Fallback for classes without `create`
    else:
        raise TypeError("Input to render_manim must be a Scene class with a 'create' method or subclass of Scene.")

    try:
        scene.render()
    except FileNotFoundError as e:
        print("Rendering failed due to a missing file. Ensure Manim is configured correctly.")
        print(e)
        return

    # Pass the scene to the show_local function
    show_local(scene, log_capture_string)

# Local display function
def show_local(scene, log_capture_string):
    log_contents = log_capture_string.getvalue()
    file_path_match_video = re.search(r"File ready at '(.+?).mp4'", log_contents)
    file_path_match_image = re.search(r"File ready at '(.+?).png'", log_contents)

    if file_path_match_video:
        file_path = file_path_match_video.group(1) + '.mp4'
        display_file(file_path)
    elif file_path_match_image:
        file_path = file_path_match_image.group(1) + '.png'
        display_file(file_path)
    else:
        print("Could not find the rendered file path in Manim's output.")

def display_file(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    media_folder = '_static/media'

    # Ensure the media folder exists
    if not os.path.exists(media_folder):
        os.makedirs(media_folder)
    
    base_file_name = os.path.basename(file_path)
    base_name_without_extension = os.path.splitext(base_file_name)[0]

    # Remove existing files with the same base name
    for existing_file in os.listdir(media_folder):
        if existing_file.startswith(base_name_without_extension) and existing_file.endswith(file_extension):
            existing_file_path = os.path.join(media_folder, existing_file)
            os.remove(existing_file_path)

    # Create a unique file name for the new file
    timestamp = int(time.time())  # Getting current timestamp to avoid file name collision
    unique_file_name = f"{base_name_without_extension}_{timestamp}{file_extension}"
    # unique_file_name = f"{base_name_without_extension}{file_extension}"  # Use this if timestamp isn't required
    local_file_path = os.path.join(media_folder, unique_file_name)

    # Copy the new file to the media folder
    shutil.copy(file_path, local_file_path)

    # Remove the temporary media folder created by Manim
    shutil.rmtree('media', ignore_errors=True)

    # Clear previous output and display the file
    clear_output(wait=True)
    if file_extension == '.mp4':
        display(Video(local_file_path, width=500, embed=True))
    elif file_extension == '.png':
        display(Image(filename=local_file_path))
    else:
        raise ValueError(f"Unsupported file extension: {file_extension}")