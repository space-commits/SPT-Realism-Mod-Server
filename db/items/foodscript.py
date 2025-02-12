import json
import os

directory = "F:/SP EFT/SPT-380-141/user/mods/zSPT-Realism-Mod-Dev/db/items"
filename = "buffs_food.json"
file_path = os.path.join(directory, filename)

def modify_value(data):
    for buffs_key in data:
        for buff in data[buffs_key]:
            if buff["BuffType"] in ["EnergyRate"] and buff["Duration"] > 0:
                buff["Duration"] *= 1.25
                buff["Duration"] = round(buff["Duration"], 3)
    return data


if not os.path.exists(file_path):
    print(f"The file {file_path} does not exist.")
else:
    # Read the JSON file
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    # Modify the data
    modified_data = modify_value(data)
    
    # Write the modified data back to the file
    with open(file_path, 'w') as file:
        json.dump(modified_data, file, indent=4)

    print(f"File {filename} has been updated successfully.")