from fastapi import FastAPI
from pydantic import BaseModel  # リクエストbodyを定義するために必要
from typing import List  # ネストされたBodyを定義するために必要
from starlette.requests import Request
import os
import sys
import psycopg2
from models.base_models import *
from fastapi.middleware.cors import CORSMiddleware
import json
from gensim.models import word2vec

app = FastAPI(version='0.8 beta')
model = word2vec.Word2Vec.load("wikipedia_for_w2v.model")

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
    word1 = Words.word1
    word2 = Words.word2
    operation = Words.operation.replace("word2=","")
    if operation == '+':
        ans = model.wv.most_similar(positive=(word1 + word2),topn=10)
    elif operation == '-':
        ans = model.wv.most_similar(positive=word1,negative=word2,topn=10)
       
    data_all = []
    for m in ans:
        data = {
            'word': m[0]
        }
        data_all.append(data)
    data_json = json.dumps(data_all)
    print(data_json)
    print(type(data_json))
    return data_json