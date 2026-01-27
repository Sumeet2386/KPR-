import io
import cv2
import pytesseract
import pdfplumber
import exifread
from PIL import Image
import numpy as np

def process_image_pdf(file_bytes: bytes, media_type: str):
    result = {
        "ocr_text": None,
        "qr_detected": False,
        "metadata": {},
    }

    
    if media_type == "image":
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        img_np = np.array(image)

        
        result["ocr_text"] = pytesseract.image_to_string(image)

        
        detector = cv2.QRCodeDetector()
        data, _, _ = detector.detectAndDecode(img_np)
        result["qr_detected"] = bool(data)

        
        try:
            tags = exifread.process_file(io.BytesIO(file_bytes))
            result["metadata"] = {k: str(v) for k, v in tags.items()}
        except Exception:
            result["metadata"] = {}

    
    if media_type == "pdf":
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
            result["ocr_text"] = text

        result["qr_detected"] = False  
        result["metadata"] = {}

    return result
