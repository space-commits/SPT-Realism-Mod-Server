import os
import shutil
import zipfile

# Paths
SOURCE_DIR = "F:/SP EFT/SPT-310/user/mods/zSPT-Realism-Mod-Dev"  # Change to your dev folder
BUILD_DIR = "F:/SP EFT/SPT-310/user/mods/zSPT-Realism-Mod-Dev/Build"   # Change to your build folder
PLUGINS_DIR = "F:/SP EFT/SPT-310/BepInEx/plugins"  # Additional source directory
ZIP_NAME = "Realism-Mod-1.5.1-SPT-3.10.5.zip"  # Name of the final package
MOD_SUBFOLDER = "user/mods/SPT-Realism"

# Rules
INCLUDE_EXTENSIONS = {".ts", ".json", ".txt", ".exe", ".md", ".bundle"}  # Exclude files with these extensions
EXCLUDE_FILES = {"tsconfig.json", ".eslintrc.json"}  # Specific files to exclude
EMPTY_FOLDERS = {"user_templates", "ProfileBackups"}  # Ensure these folders are empty
EXCLUDE_FOLDERS = {"types", "Build", "build", "node_modules", ".vscode", ".git", "dev"} 

def clean_build_dir():
    """Delete the existing build folder if it exists."""
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    os.makedirs(BUILD_DIR)

def should_skip_path(path):
    """
    Check if a path should be skipped based on EMPTY_FOLDERS rules.
    Returns True if the path is within an EMPTY_FOLDERS directory.
    """
    rel_path = os.path.relpath(path, SOURCE_DIR)
    path_parts = rel_path.split(os.sep)
    
    # Check if any part of the path matches an empty folder
    for part in path_parts:
        if part in EMPTY_FOLDERS:
            return True
    return False

def find_empty_folder_paths():
    """Find the original paths of empty folders in the source directory."""
    empty_folder_paths = []
    for root, _, _ in os.walk(SOURCE_DIR):
        rel_path = os.path.relpath(root, SOURCE_DIR)
        path_parts = rel_path.split(os.sep)
        
        # If this directory is an empty folder we're looking for
        if any(part in EMPTY_FOLDERS for part in path_parts):
            # Get the path up to and including the empty folder
            for i, part in enumerate(path_parts):
                if part in EMPTY_FOLDERS:
                    empty_folder_paths.append(os.path.join(*path_parts[:i+1]))
                    break
    
    return set(empty_folder_paths)  # Remove duplicates

def copy_plugins():
    """Copy specific files and folders from the plugins directory."""
    # Create BepInEx/plugins directory in build
    plugins_build_dir = os.path.join(BUILD_DIR, "BepInEx", "plugins")
    os.makedirs(plugins_build_dir, exist_ok=True)
    
    # Copy RealismMod.dll
    dll_source = os.path.join(PLUGINS_DIR, "RealismMod.dll")
    if os.path.exists(dll_source):
        shutil.copy2(dll_source, plugins_build_dir)
    else:
        print("Warning: RealismMod.dll not found in plugins directory")
    
    # Copy Realism folder (excluding 'dev' subfolder)
    realism_source = os.path.join(PLUGINS_DIR, "Realism")
    realism_dest = os.path.join(plugins_build_dir, "Realism")
    
    if os.path.exists(realism_source):
        # Use copytree with ignore function to exclude 'dev' folder
        def ignore_dev(dir, files):
            return [f for f in files if f == "dev" or os.path.join(dir, f).endswith("dev")]
        
        # Remove destination if it exists
        if os.path.exists(realism_dest):
            shutil.rmtree(realism_dest)
            
        shutil.copytree(realism_source, realism_dest, ignore=ignore_dev)
    else:
        print("Warning: Realism folder not found in plugins directory")

def copy_files():
    """Copy only the allowed file types while excluding specific files and folders."""
    # First, find all empty folder paths in the source
    empty_folder_paths = find_empty_folder_paths()
    mod_build_dir = os.path.join(BUILD_DIR, MOD_SUBFOLDER)
    os.makedirs(mod_build_dir, exist_ok=True)

    for root, dirs, files in os.walk(SOURCE_DIR):
        # Determine relative path to maintain structure
        relative_path = os.path.relpath(root, SOURCE_DIR)
        dest_path = os.path.join(mod_build_dir, relative_path)

        # Skip excluded folders completely
        dirs[:] = [d for d in dirs if d not in EXCLUDE_FOLDERS]

        # Check if current directory should be skipped
        if should_skip_path(root):
            # Clear dirs to prevent further recursion into this directory
            dirs.clear()
            # Don't process any files in this directory
            continue

        # Ensure the destination folder exists
        os.makedirs(dest_path, exist_ok=True)

        for file in files:
            file_ext = os.path.splitext(file)[1]
            file_path = os.path.join(root, file)

            # Skip files if:
            # - The file is explicitly excluded
            # - The file extension is not in the allowed list
            if file in EXCLUDE_FILES or file_ext not in INCLUDE_EXTENSIONS:
                continue

            dest_file = os.path.join(dest_path, file)
            shutil.copy2(file_path, dest_file)

    # Create empty folders in their original locations
    for empty_folder_path in empty_folder_paths:
        full_path = os.path.join(mod_build_dir, empty_folder_path)
        os.makedirs(full_path, exist_ok=True)

def create_zip():
    """Create a ZIP archive of the build directory, including empty folders."""
    with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(BUILD_DIR):
            # Include empty folders in the zip
            if not files and not dirs:
                arcname = os.path.relpath(root, BUILD_DIR)
                zipf.write(root, arcname)

            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, BUILD_DIR)
                zipf.write(file_path, arcname)

if __name__ == "__main__":
    print("Cleaning build directory...")
    clean_build_dir()
    
    print("Copying main files...")
    copy_files()
    
    print("Copying plugin files...")
    copy_plugins()
    
    print("Creating ZIP archive...")
    create_zip()
    
    print(f"Build process complete! Package saved as {ZIP_NAME}")