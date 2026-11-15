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

mobile_captures = [
    ('02_landing_mobile_390px.png', 'http://localhost:4173/'),
    ('04_client_homepage_mobile_390px.png', 'http://localhost:4173/clients'),
    ('06_professional_homepage_mobile_390px.png', 'http://localhost:4173/professionals'),
    ('12_comparison_dialog_mobile_390px.png', 'http://localhost:4173/clients#directory'),
    ('14_explore_directory_mobile_390px.png', 'http://localhost:4173/clients/explore')
]

desktop_captures = [
    ('01_landing_desktop_1440px.png', 'http://localhost:4173/', 1440, 960),
    ('03_client_homepage_desktop_1440px.png', 'http://localhost:4173/clients', 1440, 960),
    ('05_professional_homepage_desktop_1440px.png', 'http://localhost:4173/professionals', 1440, 960),
    ('07_journey_editorial_rows.png', 'http://localhost:4173/professionals#journey', 1440, 1200),
    ('08_benefits_editorial_rows.png', 'http://localhost:4173/professionals#benefits', 1440, 1200),
    ('09_interactive_verification_tabs.png', 'http://localhost:4173/professionals#verification', 1440, 960),
    ('10_comparison_tray_dock.png', 'http://localhost:4173/clients#directory', 1440, 960),
    ('11_comparison_dialog_desktop_1440px.png', 'http://localhost:4173/clients#directory', 1440, 960),
    ('13_explore_directory_desktop_1440px.png', 'http://localhost:4173/clients/explore', 1440, 960),
    ('15_profile_monograph_desktop_1440px.png', 'http://localhost:4173/clients/professional?id=sample-architect', 1440, 960),
    ('16_booking_studio_desktop_1440px.png', 'http://localhost:4173/clients/booking?pro=sample-architect', 1440, 960),
    ('17_onboarding_wizard_desktop_1440px.png', 'http://localhost:4173/professionals/join', 1440, 960),
    ('18_auth_signin_desktop_1440px.png', 'http://localhost:4173/signin', 1440, 960),
    ('19_auth_signup_desktop_1440px.png', 'http://localhost:4173/signup', 1440, 960),
    ('20_error_404_desktop_1440px.png', 'http://localhost:4173/not-found', 1440, 960)
]

async def run_all_captures():
    p = subprocess.Popen([
        chrome,
        '--headless=new',
        '--remote-debugging-port=9222',
        '--hide-scrollbars',
        'about:blank'
    ])
    await asyncio.sleep(1.2)

    try:
        # First capture desktop
        for name, url, w, h in desktop_captures:
            req = urllib.request.Request('http://localhost:9222/json/new?' + url, method='PUT')
            with urllib.request.urlopen(req) as resp:
                target = json.loads(resp.read())
            ws_url = target['webSocketDebuggerUrl']

            async with websockets.connect(ws_url) as ws:
                await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
                await ws.recv()
                await ws.send(json.dumps({
                    'id': 2,
                    'method': 'Emulation.setDeviceMetricsOverride',
                    'params': {'width': w, 'height': h, 'deviceScaleFactor': 1, 'mobile': False}
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
                        print(f'[DESKTOP] {name} ({len(data)/1024:.1f} KB)')
                        break

            # Close tab
            req_close = urllib.request.Request(f'http://localhost:9222/json/close/{target["id"]}', method='GET')
            try:
                urllib.request.urlopen(req_close)
            except Exception:
                pass

        # Now capture mobile
        for name, url in mobile_captures:
            req = urllib.request.Request('http://localhost:9222/json/new?' + url, method='PUT')
            with urllib.request.urlopen(req) as resp:
                target = json.loads(resp.read())
            ws_url = target['webSocketDebuggerUrl']

            async with websockets.connect(ws_url) as ws:
                await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
                await ws.recv()
                await ws.send(json.dumps({
                    'id': 2,
                    'method': 'Emulation.setDeviceMetricsOverride',
                    'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': True}
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
                        print(f'[MOBILE] {name} ({len(data)/1024:.1f} KB)')
                        break

            # Close tab
            req_close = urllib.request.Request(f'http://localhost:9222/json/close/{target["id"]}', method='GET')
            try:
                urllib.request.urlopen(req_close)
            except Exception:
                pass

        # Update primary aliases for PDF
        aliases = [
            ('01_landing_desktop_1440px.png', 'gateway_1440.png'),
            ('02_landing_mobile_390px.png', 'gateway_390.png'),
            ('03_client_homepage_desktop_1440px.png', 'clients_1440.png'),
            ('04_client_homepage_mobile_390px.png', 'clients_390.png'),
            ('05_professional_homepage_desktop_1440px.png', 'professionals_1440.png'),
            ('06_professional_homepage_mobile_390px.png', 'professionals_390.png'),
        ]
        for src, dst in aliases:
            src_f = os.path.join(review_dir, src)
            dst_f = os.path.join(docs_dir, dst)
            if os.path.exists(src_f):
                with open(src_f, 'rb') as f_in, open(dst_f, 'wb') as f_out:
                    f_out.write(f_in.read())
        print('All aliases updated successfully!')
    finally:
        p.terminate()

asyncio.run(run_all_captures())
