#!/usr/bin/env python
# Installs and set's up dependancies, if needed.

from shutil import copyfile
import os

# Check for dependancies
try:
    from intelhex import IntelHex
except:
    try:
        from pip import main as pipmain
    except:
        from pip._internal import main as pipmain

    # Update Pip if needed
    pipmain(['install', "--upgrade", "pip"])

    # Install IntelHex dependancies
    pipmain(['install', 'pyqt5'])

    # Then install IntelHex
    pipmain(['install', 'IntelHex'])

    exit()

# Set's up the team.json if the person forgets
if not os.path.isfile("team.json"):
    copyfile("team.empty_example.json", "team.json")

print("Taadaa!")
print("All dependancies are installed and ready to go.")
print("")
print("Run start.py when ready captain!")
