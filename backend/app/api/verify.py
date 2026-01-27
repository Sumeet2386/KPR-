from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.media_router import route_media

router = APIRouter()

@router.post("/verify")
async def verify_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    result = await route_media(file)
    return {
        "status": "RECEIVED",
        "filename": file.filename,
        "routing": result
    }
