from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.media_router import route_media
from app.schemas.response import VerifyResponse

router = APIRouter()

@router.post("/verify", response_model=VerifyResponse)
async def verify(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    result = await route_media(file)
    return result
