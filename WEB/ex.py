import requests

BASE_URL = 'http://localhost:8000'   # 실제 주소로 바꿔주세요
ETAG     = 'etag6853'
DATE     = 'Thu, 19 May 2022 07:33:50 GMT'

headers = {
    'If-None-Match': ETAG,
    'If-Modified-Since': DATE
}

resp = requests.get(f'{BASE_URL}/flag.txt', headers=headers)

if resp.status_code == 304:
    flag = resp.headers.get('X-Flag')
    print('✅ FLAG:', flag)
else:
    print(f'❌ 상태 코드: {resp.status_code}')
    print(resp.text)
