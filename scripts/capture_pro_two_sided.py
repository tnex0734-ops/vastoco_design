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
temp_profile = r'C:\Users\TNEX\AppData\Local\Temp\chrome_pro_qa_profile_v2'

for d in [review_dir, docs_dir]:
    os.makedirs(d, exist_ok=True)

if os.path.exists(temp_profile):
    try:
        shutil.rmtree(temp_profile, ignore_errors=True)
    except Exception:
        pass

captures = [
    ('pro_portal_desktop_1440.png', 'http://localhost:4173/professionals', 1440, 960, False, None),
    ('pro_portal_mobile_390.png', 'http://localhost:4173/professionals', 390, 844, True, None),
    ('pro_dashboard_desktop_1440.png', 'http://localhost:4173/professional', 1440, 960, False, None),
    ('pro_dashboard_mobile_390.png', 'http://localhost:4173/professional', 390, 844, True, None),
    ('pro_briefs_feed_desktop_1440.png', 'http://localhost:4173/professional/briefs', 1440, 960, False, None),
    ('pro_briefs_feed_mobile_390.png', 'http://localhost:4173/professional/briefs', 390, 844, True, None),
    ('pro_brief_detail_composer_desktop_1440.png', 'http://localhost:4173/professional/briefs/brief-noida-44', 1440, 1050, False, None),
    ('pro_brief_detail_composer_mobile_390.png', 'http://localhost:4173/professional/briefs/brief-noida-44', 390, 844, True, None),
    ('pro_offers_pipeline_desktop_1440.png', 'http://localhost:4173/professional/offers', 1440, 960, False, None),
    ('pro_offers_pipeline_mobile_390.png', 'http://localhost:4173/professional/offers', 390, 844, True, None),
    ('pro_schedule_agenda_desktop_1440.png', 'http://localhost:4173/professional/consultations', 1440, 960, False, None),
    ('pro_schedule_calendar_desktop_1440.png', 'http://localhost:4173/professional/consultations', 1440, 960, False, 'document.querySelector("[data-view=\'calendar\']")?.click()'),
    ('pro_portfolio_mgmt_desktop_1440.png', 'http://localhost:4173/professional/portfolio', 1440, 960, False, None),
    ('pro_verification_tracker_desktop_1440.png', 'http://localhost:4173/professional/verification', 1440, 960, False, None),
    ('pro_settings_payouts_desktop_1440.png', 'http://localhost:4173/professional/settings', 1440, 960, False, None),
    ('client_briefs_and_offers_desktop_1440.png', 'http://localhost:4173/client/briefs', 1440, 960, False, None),
    ('client_briefs_and_offers_mobile_390.png', 'http://localhost:4173/client/briefs', 390, 844, True, None),
]

_msg_id = 0
async def call_cdp(ws, method, params=None):
    global _msg_id
    _msg_id += 1
    req_id = _msg_id
    payload = {'id': req_id, 'method': method}
    if params is not None:
        payload['params'] = params
    await ws.send(json.dumps(payload))
    while True:
        resp = json.loads(await ws.recv())
        if resp.get('id') == req_id:
            return resp

async def run_captures():
    port = 9228
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
        with urllib.request.urlopen(f'http://localhost:{port}/json') as resp:
            targets = json.loads(resp.read())
        page_target = [t for t in targets if t.get('type') == 'page'][0]
        ws_url = page_target['webSocketDebuggerUrl']

        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            await call_cdp(ws, 'Page.enable')

            for name, url, w, h, is_mobile, js_action in captures:
                await call_cdp(ws, 'Emulation.setDeviceMetricsOverride', {
                    'width': w,
                    'height': h,
                    'deviceScaleFactor': 2,
                    'mobile': is_mobile
                })

                await ws.send(json.dumps({'id': 99999, 'method': 'Page.navigate', 'params': {'url': url}}))
                while True:
                    ev = json.loads(await ws.recv())
                    if ev.get('method') == 'Page.loadEventFired':
                        break

                await asyncio.sleep(0.8)

                if js_action:
                    await call_cdp(ws, 'Runtime.evaluate', {'expression': js_action})
                    await asyncio.sleep(0.5)

                shot_res = await call_cdp(ws, 'Page.captureScreenshot', {'format': 'png'})
                data = base64.b64decode(shot_res['result']['data'])

                for d in [review_dir, docs_dir]:
                    path = os.path.join(d, name)
                    with open(path, 'wb') as f:
                        f.write(data)

                print(f'Captured: {name} ({len(data)/1024:.1f} KB)')

    finally:
        p.terminate()
        p.wait()

if __name__ == '__main__':
    asyncio.run(run_captures())
