import base64
from illust import out
from fastapi import FastAPI
from pydantic import BaseModel  # リクエストbodyを定義するために必要
from typing import List  # ネストされたBodyを定義するために必要
from starlette.requests import Request
import os
import sys
from models.base_models import *
from fastapi.middleware.cors import CORSMiddleware
import json
from gensim.models import word2vec

app = FastAPI(version='1.1 beta')
model = word2vec.Word2Vec.load("./wikipedia_for_w2v.model")

origins = [
    "http://localhost",
    "http://localhost:3000",
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
    if operation == '+':
        ans = model.wv.most_similar(positive=(word1 + word2),topn=5)
    elif operation == '-':
        ans = model.wv.most_similar(positive=word1,negative=word2,topn=5)
    else:
        ans = model.wv.most_similar(positive=word1,topn=5)
    
    data = []
    for m in ans:
        data.append(m[0])

    illust_list = []
    if len(word1) != 0:
        for m in word1:
            illust_list.append(out(m))
    if len(word2) != 0:
        for m in word2:
            illust_list.append(out(m))
    if len(ans) != 0:
        for m in ans:
            print(m[0])
            illust_list.append(out(m[0]))
    illust_str = '!@#$'.join(map(str,illust_list))

    data_all = { 'words': data, 'illusts': illust_str}

    # print(data_all)
    data_json = json.dumps(data_all)
    # print(data_json)
    # print(type(data_json))
    return data_json