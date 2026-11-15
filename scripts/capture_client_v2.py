import subprocess
import time
import json
import base64
import urllib.request
import asyncio
import os
import websockets

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
review_dir = r'C:\Users\TNEX\OneDrive\Desktop\vastoco\REVIEW_SCREENSHOTS'
docs_dir = r'C:\Users\TNEX\OneDrive\Desktop\vastoco\vastoco-redesign\docs\screenshots'

captures = [
    ('client_v2_discovery_desktop_1440.png', 'http://localhost:4173/clients', 1440, 960, False),
    ('client_v2_discovery_mobile_390.png', 'http://localhost:4173/clients', 390, 844, True),
    ('client_v2_workspace_desktop_1440.png', 'http://localhost:4173/client', 1440, 960, False),
    ('client_v2_workspace_mobile_390.png', 'http://localhost:4173/client', 390, 844, True),
    ('client_v2_compare_desktop_1440.png', 'http://localhost:4173/client/compare', 1440, 960, False),
    ('client_v2_profile_desktop_1440.png', 'http://localhost:4173/client/professionals/naina-kapoor', 1440, 1100, False),
    ('client_v2_booking_desktop_1440.png', 'http://localhost:4173/client/book/naina-kapoor', 1440, 960, False),
    ('client_v2_consultations_desktop_1440.png', 'http://localhost:4173/client/consultations', 1440, 960, False)
]

async def run_captures():
    p = subprocess.Popen([
        chrome,
        '--headless=new',
        '--remote-debugging-port=9223',
        '--hide-scrollbars',
        'about:blank'
    ])
    await asyncio.sleep(1.2)

    try:
        for name, url, w, h, is_mobile in captures:
            req = urllib.request.Request('http://localhost:9223/json/new?' + url, method='PUT')
            with urllib.request.urlopen(req) as resp:
                target = json.loads(resp.read())
            ws_url = target['webSocketDebuggerUrl']

            async with websockets.connect(ws_url) as ws:
                await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
                await ws.recv()
                await ws.send(json.dumps({
                    'id': 2,
                    'method': 'Emulation.setDeviceMetricsOverride',
                    'params': {'width': w, 'height': h, 'deviceScaleFactor': 1, 'mobile': is_mobile}
                }))
                await ws.recv()
                await asyncio.sleep(1.2)
                await ws.send(json.dumps({'id': 3, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
                while True:
                    msg = json.loads(await ws.recv())
                    if msg.get('id') == 3:
                        data = base64.b64decode(msg['result']['data'])
                        for d in [review_dir, docs_dir]:
                            out = os.path.join(d, name)
                            with open(out, 'wb') as f:
                                f.write(data)
                        print(f'[CAPTURED] {name} ({len(data)/1024:.1f} KB)')
                        break

            # Close tab
            req_close = urllib.request.Request(f'http://localhost:9223/json/close/{target["id"]}', method='GET')
            try:
                urllib.request.urlopen(req_close)
            except Exception:
                pass

        print('All Client V2 screenshots captured successfully!')
    finally:
        p.terminate()

asyncio.run(run_captures())

