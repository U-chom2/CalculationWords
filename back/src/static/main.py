import base64
from illust import out
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel  # リクエストbodyを定義するために必要
from typing import List  # ネストされたBodyを定義するために必要
from starlette.requests import Request
import os
import sys
from models.base_models import *
from fastapi.middleware.cors import CORSMiddleware
import json
import gensim

app = FastAPI(version='1.1 beta')
app.mount("/", StaticFiles(directory="static"), name="static")
model = gensim.models.KeyedVectors.load("./chive-1.2-mc5_gensim/chive-1.2-mc5.kv")
print("Backend is ready.")


origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def read_root():
    return {"Hello": "World"}

@app.post("/calc_words")
async def get_calced_words(Words: Words):
    word1 = Words.word1.replace("word1=","").split(",")
    word2 = Words.word2.replace("word2=","").split(",")
    operation = Words.operation.replace("operation=","")

    try:
        if operation == '+':
            ans = model.most_similar(positive=(word1 + word2),topn=5)
        elif operation == '-':
            ans = model.most_similar(positive=word1,negative=word2,topn=5)
        else:
            ans = model.most_similar(positive=word1,topn=5)
    except BaseException as ex:
        data_json = json.dumps({ 'words': [], 'illust1': '', 'illust2': '', 'illust3': ''})
        return data_json
    
    data = []
    for m in ans:
        data.append(m[0])

    illust1 = []
    # Word1のイラスト
    if len(word1) != 0:
        for m in word1:
            illust1.append(out(m))
    illust_1 = '!@#$'.join(map(str,illust1))
    illust2 = []
    # Word2のイラスト
    if len(word2) != 0:
        for m in word2:
            illust2.append(out(m))
    illust_2 = '!@#$'.join(map(str,illust2))
    illust_res = []
    # 結果のイラスト
    if len(ans) != 0:
        for m in ans:
            print(m[0])
            illust_res.append(out(m[0]))
    illust_3 = '!@#$'.join(map(str,illust_res))

    data_all = { 'words': data, 'illust1': illust_1, 'illust2': illust_2, 'illust3': illust_3}

    data_json = json.dumps(data_all)
    return data_json