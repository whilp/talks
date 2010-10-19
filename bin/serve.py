from SimpleHTTPServer import (SimpleHTTPRequestHandler, 
    BaseHTTPServer)

SimpleHTTPRequestHandler.extensions_map.update({
    ".svg": "image/svg+xml",
})

BaseHTTPServer.test(
    SimpleHTTPRequestHandler, 
    BaseHTTPServer.HTTPServer)
