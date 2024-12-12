# from manim import *
# import requests
# from IPython.display import HTML, display, clear_output, Image
# import logging
# import re
# import io
# import time

# def start():
#     logging.basicConfig(level=logging.INFO)
#     log_capture_string = io.StringIO()
#     ch = logging.StreamHandler(log_capture_string)
#     ch.setLevel(logging.INFO)
#     logger = logging.getLogger('manim')
#     logger.addHandler(ch)
#     return log_capture_string, ch, logger

# q_dict = {'-ql': (480, 854, 15), '-qm': (720, 1280, 30), '-qh': (1080, 1920, 60), '-qk': (2160, 3840, 60)}

# def show(quality_flag, sc, log_capture_string):
#     config.flush_cache = True
#     scene = sc
#     scene.render()

#     log_contents = log_capture_string.getvalue()
#     file_path_match_video = re.search(r"File ready at '(.+?).mp4'", log_contents)
#     file_path_match_image = re.search(r"File ready at '(.+?).png'", log_contents)

#     if file_path_match_video:
#         file_path = file_path_match_video.group(1) + '.mp4'
#         display_video_or_image(file_path, is_video=True)
#     elif file_path_match_image:
#         file_path = file_path_match_image.group(1) + '.png'
#         display_video_or_image(file_path, is_video=False)
#     else:
#         print("Could not find the file path in Manim's output.")

# def display_video_or_image(file_path, is_video):
#     clear_output(wait=True)
#     if is_video:
#         video_url = upload_file(file_path)
#         if video_url:
#             display(HTML(f"""
#             <div style="width: 100%;">
#               <video width="100%" controls playsinline>
#                   <source src="{video_url}" type="video/mp4">
#                   Your browser does not support the video tag.
#               </video>
#             </div>
#             """))
#     else:
#         display(Image(filename=file_path))

# def upload_file(file_path):
#     with open(file_path, 'rb') as f:
#         response = requests.post('https://transfer.adttemp.com.br/', files={'file': f})
#         if response.status_code == 200:
#             return response.text.strip()
#     return None

# import os
# import shutil
# import logging
# import io
# import re
# from IPython.display import HTML

# def render_manim(scene_class, quality, render_mode):
#     log_capture_string, ch, logger = start()
#     config.flush_cache = True
#     config.pixel_height, config.pixel_width, config.frame_rate = q_dict[quality]
#     scene = scene_class()

#     if render_mode == "local":
#         show_local(quality, scene, log_capture_string)
#     elif render_mode == "browser":
#         show(quality, scene, log_capture_string)
#     else:
#         raise ValueError(f"Invalid render_mode: {render_mode}. Choose 'local' or 'browser'.")

# def show_local(quality, sc, log_capture_string):
#     config.flush_cache = True
#     scene = sc
#     scene.render()

#     log_contents = log_capture_string.getvalue()
#     # print(log_contents)
#     file_path_match_video = re.search(r"File ready at '(.+?).mp4'", log_contents)
#     file_path_match_image = re.search(r"File ready at '(.+?).png'", log_contents)

#     # Determine the most recent file type based on the log contents
#     if file_path_match_video or file_path_match_image:
#         if file_path_match_video and file_path_match_image:
#             # If both types are found, determine the latest by their position in the log
#             video_pos = log_contents.rfind(file_path_match_video.group(0))
#             image_pos = log_contents.rfind(file_path_match_image.group(0))
#             if video_pos > image_pos:
#                 display_file(file_path_match_video.group(1) + '.mp4')
#             else:
#                 display_file(file_path_match_image.group(1) + '.png')
#         elif file_path_match_video:
#             display_file(file_path_match_video.group(1) + '.mp4')
#         elif file_path_match_image:
#             display_file(file_path_match_image.group(1) + '.png')
#     else:
#         print("Could not find the file path in Manim's output.")

# def display_file(file_path):
#     # Get the current working directory
#     current_dir = os.getcwd()
    
#     # Split the file path by system path separator
#     path_parts = file_path.split(os.sep)
    
#     # Traverse back from the current directory to find the "source" folder
#     relative_to_source = ''
#     while not os.path.exists(os.path.join(current_dir, 'source')):
#         print("Current dir:", current_dir)
#         current_dir = os.path.dirname(current_dir)  # Move up one directory
#         relative_to_source = os.path.join('..', relative_to_source)  # Add one level up to relative path
    
#     # remove "../" from the start of the relative path
#     relative_to_source = relative_to_source[3:]
    
#     print("Relative to source:", relative_to_source)

#     # Get the path to the "_static/media" folder inside "source"
#     media_folder = os.path.join(current_dir, 'source', '_static', 'media')

#     # Check if the media folder exists, and create it if not
#     if not os.path.exists(media_folder):
#         os.makedirs(media_folder)
    
#     # Create a unique file name to avoid collisions
#     timestamp = int(time.time())  # Current timestamp to avoid file name collision
#     base_file_name = os.path.basename(file_path)
#     file_extension = os.path.splitext(file_path)[1].lower()
#     unique_file_name = f"{os.path.splitext(base_file_name)[0]}_{timestamp}{file_extension}"
    
#     # Define the local file path (absolute) and relative file path for rendering
#     local_file_path = os.path.join(media_folder, unique_file_name)
    
#     # Remove any existing files with the same base name
#     base_name_without_extension = os.path.splitext(base_file_name)[0]
#     for existing_file in os.listdir(media_folder):
#         if existing_file.startswith(base_name_without_extension) and existing_file.endswith('.mp4'):
#             existing_file_path = os.path.join(media_folder, existing_file)
#             os.remove(existing_file_path)  # Remove the old file
    
#     # Copy the file to the local path if needed
#     shutil.copy(file_path, local_file_path)
    
#     # Delete the media folder in current directory
#     shutil.rmtree('media', ignore_errors=True)
    
#     # Relative path for rendering (this works in deployed docs)
#     relative_media_path = os.path.join(relative_to_source, '_static', 'media', unique_file_name)
    
#     # Clear previous output
#     clear_output(wait=True)
    
#     # Render the file based on its extension
#     if file_extension == '.mp4':
#         display(HTML(f"""
#         <div style="width: 100%;">
#           <video width="100%" controls playsinline>
#               <source src="{relative_media_path}" type="video/mp4">
#               Your browser does not support the video tag.
#           </video>
#         </div>
#         """))
#     elif file_extension == '.png':
#         display(Image(filename=relative_media_path))
#     else:
#         raise ValueError(f"Unsupported file extension: {file_extension}")

from manim import *
from IPython.display import Video, HTML, display, clear_output, Image
import requests
import logging
import re
import io
import time
import os
import shutil

def start():
    logging.basicConfig(level=logging.INFO)
    log_capture_string = io.StringIO()
    ch = logging.StreamHandler(log_capture_string)
    ch.setLevel(logging.INFO)
    logger = logging.getLogger('manim')
    logger.addHandler(ch)
    return log_capture_string, ch, logger

# q_dict = {'-ql': (480, 854, 15), '-qm': (720, 1280, 30), '-qh': (1080, 1920, 60), '-qk': (2160, 3840, 60)}

def render_manim(scene_class):
    log_capture_string, ch, logger = start()
    config.flush_cache = True
    config.pixel_height, config.pixel_width, config.frame_rate = (1080, 1920, 60)
    scene = scene_class
    show_local(scene, log_capture_string)

def show_local(sc, log_capture_string):
    config.flush_cache = True
    scene = sc
    scene.render()

    log_contents = log_capture_string.getvalue()
    file_path_match_video = re.search(r"File ready at '(.+?).mp4'", log_contents)
    file_path_match_image = re.search(r"File ready at '(.+?).png'", log_contents)
    
    if file_path_match_video:
        file_path = file_path_match_video.group(1) + '.mp4'
        display_file(file_path)

def display_file(file_path):
    current_dir = os.getcwd()
    path_parts = file_path.split(os.sep)
    
    relative_to_source = ''
    while not os.path.exists(os.path.join(current_dir, 'source')):
        current_dir = os.path.dirname(current_dir)
        relative_to_source = os.path.join('..', relative_to_source)
    
    relative_to_source = relative_to_source[3:]
    
    media_folder = os.path.join(current_dir, 'source', '_static', 'media')

    if not os.path.exists(media_folder):
        os.makedirs(media_folder)
    
    timestamp = int(time.time())
    base_file_name = os.path.basename(file_path)
    
    print("base file name", base_file_name)
    
    file_extension = os.path.splitext(file_path)[1].lower()
    unique_file_name = f"{os.path.splitext(base_file_name)[0]}_{timestamp}{file_extension}"
    
    local_file_path = os.path.join(media_folder, unique_file_name)
    print("local_file_path", local_file_path)
    
    base_name_without_extension = os.path.splitext(base_file_name)[0]
    for existing_file in os.listdir(media_folder):
        if existing_file.startswith(base_name_without_extension) and existing_file.endswith('.mp4'):
            existing_file_path = os.path.join(media_folder, existing_file)
            os.remove(existing_file_path)
            
    # print(file_path, local_file_path)
    
    shutil.copy(file_path, local_file_path)
    
    shutil.rmtree('media', ignore_errors=True)
    
    relative_media_path = os.path.join(relative_to_source, '_static', 'media', unique_file_name)
    
    # print("relative_media_path", "1080p60", relative_media_path)
    
    clear_output(wait=True)
    
    if file_extension == '.mp4':
      display(Video(local_file_path, width=500, embed=True))
    
    elif file_extension == '.png':
        display(Image(filename=local_file_path))
    else:
        raise ValueError(f"Unsupported file extension: {file_extension}")