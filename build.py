import os
import shutil

book_name = "book"

# Set the parent directory to the 'docs' folder within the current directory
parent_directory = os.path.join(os.getcwd(), book_name)
target_folders = ["_build"]

# Construct the full path for each folder and delete if it exists
for folder in target_folders:
    # Construct the full path to the target folder
    target_folder_path = os.path.join(parent_directory, folder)
    
    # Check if the target folder exists within the 'docs' directory
    if os.path.exists(target_folder_path) and os.path.isdir(target_folder_path):
        # If the target folder exists, delete it permanently
        shutil.rmtree(target_folder_path)
        print(f"Deleted '{folder}'.")
    else:
        # If the target folder does not exist, do nothing
        print(f"'{folder}' does not exist in 'docs'.")

os.system("teachbooks build {}/".format(book_name))




