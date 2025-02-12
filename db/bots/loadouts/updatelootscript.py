import json
import os

# Function to convert list to dictionary with default values
def list_to_dict_with_values(items_list, default_value=1):
    return {item: default_value for item in items_list}

# Path to your JSON file
file_path = 'F:/SP EFT/SPT-380-141/user/mods/zSPT-Realism-Mod-Dev/db/bots/loadouts/templates/keys.json'

# Load your JSON data
with open(file_path, 'r') as file:
    data = json.load(file)

# Iterate over each template object
# for key in data.keys():
#     if isinstance(data[key], list):
#         data[key] = list_to_dict_with_values(data[key], default_value=1)

for template_key, template_value in data.items():
    # Check if 'inventory' key exists
    if 'inventory' in template_value and 'items' in template_value['inventory']:
        items = template_value['inventory']['dynamic_looting']
        # Convert each list in items to a dictionary with default values
        for item_key, item_list in items.items():
            items[item_key] = list_to_dict_with_values(item_list, default_value=1)  # Adjust default_value as needed

# Save the modified data back to the JSON file
with open(file_path, 'w') as file:
    json.dump(data, file, indent=4)

print("Conversion completed.")