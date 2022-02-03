from pydantic import BaseModel
    
class Words(BaseModel):
    word1: str
    word2: str
    operation: str