FROM python:3.7

RUN pip install --upgrade pip fastapi uvicorn aiofiles gensim requests beautifulsoup4 lxml

# WORKDIR /backapi/models
RUN wget -P /backapi/models https://sudachi.s3-ap-northeast-1.amazonaws.com/chive/chive-1.2-mc5_gensim.tar.gz && \
    tar -zxvf /backapi/models/chive-1.2-mc5_gensim.tar.gz && \
    rm /backapi/models/chive-1.2-mc5_gensim.tar.gz

WORKDIR /backapi
EXPOSE 8000