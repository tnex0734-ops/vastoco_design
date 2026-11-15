import subprocess
import time
import json
import base64
import urllib.request
import asyncio
import os
import shutil
import websockets

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
review_dir = r'C:\Users\TNEX\OneDrive\Desktop\vastoco\REVIEW_SCREENSHOTS'
docs_dir = r'C:\Users\TNEX\OneDrive\Desktop\vastoco\vastoco-redesign\docs\screenshots'
temp_profile = r'C:\Users\TNEX\AppData\Local\Temp\chrome_qa_temp_profile'

for d in [review_dir, docs_dir]:
    os.makedirs(d, exist_ok=True)

if os.path.exists(temp_profile):
    try:
        shutil.rmtree(temp_profile, ignore_errors=True)
    except Exception:
        pass

captures = [
    ('client_polish_discovery_desktop_1440.png', 'http://localhost:4173/clients', 1440, 960, False, None),
    ('client_polish_discovery_mobile_390.png', 'http://localhost:4173/clients', 390, 844, True, None),
    ('client_polish_pro_detail_desktop_1440.png', 'http://localhost:4173/client/professionals/naina-kapoor', 1440, 1100, False, None),
    ('client_polish_pro_detail_mobile_390.png', 'http://localhost:4173/client/professionals/naina-kapoor', 390, 844, True, None),
    ('client_polish_account_view_desktop_1440.png', 'http://localhost:4173/client/profile', 1440, 1000, False, None),
    ('client_polish_account_view_mobile_390.png', 'http://localhost:4173/client/profile', 390, 844, True, None),
    ('client_polish_account_edit_desktop_1440.png', 'http://localhost:4173/client/profile', 1440, 1100, False, 'document.querySelector("[data-action=\'start-edit-profile\']").click()'),
    ('client_polish_account_edit_mobile_390.png', 'http://localhost:4173/client/profile', 390, 844, True, 'document.querySelector("[data-action=\'start-edit-profile\']").click()'),
    ('client_polish_compare_desktop_1440.png', 'http://localhost:4173/client/compare', 1440, 960, False, None),
    ('client_polish_consultations_desktop_1440.png', 'http://localhost:4173/client/consultations', 1440, 960, False, None),
    ('client_polish_booking_desktop_1440.png', 'http://localhost:4173/client/book/naina-kapoor', 1440, 960, False, None),
    ('client_polish_empty_search_desktop_1440.png', 'http://localhost:4173/clients', 1440, 960, False, 'const inp = document.querySelector("[data-discovery-search]"); if (inp) { inp.value = "xyznonexistent"; inp.dispatchEvent(new Event("input", { bubbles: true })); }')
]

async def run_captures():
    port = 9226
    p = subprocess.Popen([
        chrome,
        '--headless=new',
        f'--remote-debugging-port={port}',
        f'--user-data-dir={temp_profile}',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--hide-scrollbars',
        'about:blank'
    ])
    await asyncio.sleep(2.0)

    try:
        # Get the initial page target
        with urllib.request.urlopen(f'http://localhost:{port}/json') as resp:
            targets = json.loads(resp.read())
        page_target = [t for t in targets if t.get('type') == 'page'][0]
        ws_url = page_target['webSocketDebuggerUrl']

        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
            await ws.recv()

            msg_id = 10
            for name, url, w, h, is_mobile, js_action in captures:
                msg_id += 1
                await ws.send(json.dumps({
                    'id': msg_id,
                    'method': 'Emulation.setDeviceMetricsOverride',
                    'params': {'width': w, 'height': h, 'deviceScaleFactor': 1, 'mobile': is_mobile}
                }))
                await ws.recv()

                msg_id += 1
                await ws.send(json.dumps({
                    'id': msg_id,
                    'method': 'Page.navigate',
                    'params': {'url': url}
                }))
                await ws.recv()
                await asyncio.sleep(1.0)

                if js_action:
                    msg_id += 1
                    await ws.send(json.dumps({
                        'id': msg_id,
                        'method': 'Runtime.evaluate',
                        'params': {'expression': js_action}
                    }))
                    await ws.recv()
                    await asyncio.sleep(0.5)

                msg_id += 1
                capture_id = msg_id
                await ws.send(json.dumps({'id': capture_id, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
                while True:
                    raw = await ws.recv()
                    msg = json.loads(raw)
                    if msg.get('id') == capture_id:
                        data = base64.b64decode(msg['result']['data'])
                        for d in [review_dir, docs_dir]:
                            out = os.path.join(d, name)
                            with open(out, 'wb') as f:
                                f.write(data)
                        print(f'[CAPTURED] {name} ({len(data)/1024:.1f} KB)')
                        break

        print('All Client Polish screenshots captured successfully!')
    finally:
        p.terminate()

asyncio.run(run_captures())
