import os
import shutil

# --- IMPORTANT ---
# This script should be located in the root directory of your Next.js project.
# Example: C:\work\next js websites\BSU UAE\source files\cleanup_project.py

# Get the current directory where the script is located
project_root = os.getcwd()

# List of files and directories to be deleted
files_to_delete = [
    # App directory pages
    "app/page.jsx",
    "app/contact-four/page.jsx",
    "app/contact-three/page.jsx",
    "app/contact-two/page.jsx",
    "app/services-two/page.jsx",
    "app/team-two/page.jsx",
    "app/team-three/page.jsx",
    
    # Components for Home One and Home Three
    "components/layout/headers/header-two.jsx",
    "components/layout/headers/header-three.jsx",
    "components/layout/footers/footer-one.jsx",
    "components/layout/footers/footer-three.jsx",
    "components/layout/headers/offcanvas.jsx",
    "components/layout/headers/menu_sidebar/menu-one.jsx",
    "components/layout/headers/menu_sidebar/menu-three.jsx",
    "components/pages/contacts/contact-four.jsx",
    "components/pages/contacts/contact-three.jsx",
    "components/pages/contacts/contact-two.jsx",
]

directories_to_delete = [
    # App directory folders
    "app/home-three",
    
    # Component folders
    "components/pages/homes/home",
    "components/pages/homes/home-3",
    "components/pages/services/service-two",
    "components/pages/teams/team-2",
    "components/pages/teams/team-3",

    # Folders for specific contact pages
    "app/contact-four",
    "app/contact-three",
    "app/contact-two",
]

def delete_path(path_to_delete, is_dir=False):
    """Deletes a file or a directory and prints the status."""
    full_path = os.path.join(project_root, path_to_delete)
    
    # Normalize path for the OS
    full_path = os.path.normpath(full_path)

    try:
        if not os.path.exists(full_path):
            print(f"SKIPPED: '{path_to_delete}' does not exist.")
            return

        if is_dir:
            shutil.rmtree(full_path)
            print(f"DELETED FOLDER: '{path_to_delete}'")
        else:
            os.remove(full_path)
            print(f"DELETED FILE:   '{path_to_delete}'")
            
    except Exception as e:
        print(f"ERROR: Could not delete '{path_to_delete}'. Reason: {e}")

# --- Deletion Process ---
print("Starting project cleanup...\n")

print("--- Deleting files ---")
for f in files_to_delete:
    delete_path(f, is_dir=False)

print("\n--- Deleting directories ---")
for d in directories_to_delete:
    delete_path(d, is_dir=True)

print("\nCleanup complete!")
print("Please review the manual steps to finish setting up your project.")
