import json
import os

# Get the directory
directory = "F:/SP EFT/SPT-310/user/mods/zSPT-Realism-Mod-Dev/db/bots/loadouts/weaponPresets"

# Get the filename
filename = "presets.json"

# Create the full file path by joining the directory and filename
file_path = os.path.join(directory, filename)

# Check if the file exists
if not os.path.exists(file_path):
    print(f"The file {file_path} does not exist.")
else:
    # Read the JSON file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Create a new dictionary to store the modified data
    output_data = {}

    # Iterate through the JSON objects and update the keys
for item in data["weaponBuilds"]:
    name = item["Name"]
    output_data[name] = item

    # Write the modified JSON back to a new file
    output_filename = "output.json"
    modified_file_path = os.path.join(directory, output_filename)

with open(modified_file_path, "w") as output_file:
    json.dump(output_data, output_file, indent=4)

    print(f"Keys updated and JSON file written to '{modified_file_path}'.")