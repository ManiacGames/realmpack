"""Launch the extracted preview from its own directory, regardless of working folder."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Timer
import os
import webbrowser

root = Path(__file__).resolve().parent
for port in range(4173, 4194):
    try:
        server = ThreadingHTTPServer(("127.0.0.1", port), partial(SimpleHTTPRequestHandler, directory=str(root)))
        break
    except OSError:
        continue
else:
    raise SystemExit("No available local port from 4173 to 4193.")
url = f"http://127.0.0.1:{port}/phaser/"
print(f"RealmPack Phaser: {url}\nKeep this window open while playing. Ctrl+C stops the server.", flush=True)
if not os.getenv("REALMPACK_NO_OPEN"):
    Timer(0.5, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
