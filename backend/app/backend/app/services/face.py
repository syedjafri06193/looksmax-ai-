import cv2
import numpy as np
from fastapi import UploadFile

async def analyze_face(file: UploadFile):
contents = await file.read()
npimg = np.frombuffer(contents, np.uint8)
img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

h, w, _ = img.shape

return {
"face_shape": "oval",
"symmetry": round(0.82, 2),
"jawline_strength": "medium",
"recommendations": [
"Try a textured fade haircut",
"Grow a short boxed beard",
"Focus on neck posture exercises"
]
}
