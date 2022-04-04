import base64
import requests
import random
import bs4
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

def image(data):
    Res = requests.get("https://www.google.com/search?hl=jp&q=" + data + "&btnG=Google+Search&tbs=0&safe=off&tbm=isch")
    Html = Res.text
    Soup = bs4.BeautifulSoup(Html,'lxml')
    links = Soup.find_all("img")
    if len(links) == 0:
        return 'https://jmva.or.jp/wp-content/uploads/2018/07/noimage.png'
    else:
        link = random.choice(links).get("src")
        while True:
            if link.endswith('.gif'):
                link = random.choice(links).get("src")
            else:
                break
        return link
        
def download_img(url):
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        rawData = base64.b64encode(r.raw.data)
        return rawData
    return
    
def out(data):
    link = image(data)
    return download_img(link)

# while True:
#     num = input("検索回数:")
#     data = input("検索ワード:")
#     for _ in range(int(num)):
#         link = image(data)
#         download_img(link, code())
#     print("OK")

# https://qiita.com/Yuki-Takatsu/items/3f30727d5b21a83ea4ed