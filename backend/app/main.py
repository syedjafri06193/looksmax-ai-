from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.face import analyze_face

app = FastAPI(title="LooksMax AI")

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.get("/")
def root():
return {"status": "LooksMax AI backend running"}

@app.post("/analyze/face")
async def analyze(file: UploadFile = File(...)):
result = await analyze_face(file)
return result
