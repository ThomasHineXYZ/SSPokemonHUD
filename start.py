from shutil import copyfile
import http.server
import os
import socketserver

# Port that the web server will run on
PORT = 251

# SSPokemonHUD Ascii title
print("   __________ ____        __                              __  ____  ______")
print("  / ___/ ___// __ \____  / /_____  ____ ___  ____  ____  / / / / / / / __ \\")
print("  \__ \\__ \/ /_/ / __ \/ //_/ _ \/ __ `__ \/ __ \/ __ \/ /_/ / / / / / / /")
print(" ___/ /__/ / ____/ /_/ / ,< /  __/ / / / / / /_/ / / / / __  / /_/ / /_/ /")
print("/____/____/_/    \____/_/|_|\___/_/ /_/ /_/\____/_/ /_/_/ /_/\____/_____/")
print("")

# Welcome and info text
print("Welcome to the SSPokemonHUD project.")
print("")
print("")

print("If you aren't using an extension, you will have to open up the team.json file in a text editor like Notepad, Notepad++, or Sublime")
print("(The normal Notepad built in to Windows might look funny)")
print("")

print("You will see lots of spam about 'team.json'. This is normal, no need to worry.")
print("")

# Web Server
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("In OBS add a browser source with the following address:")
    print("http://localhost:%s" % (PORT))
    httpd.serve_forever()
