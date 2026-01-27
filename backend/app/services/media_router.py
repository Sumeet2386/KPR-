from app.utils.file_utils import detect_file_type
from app.services.image_service import process_image_pdf
from app.services.video_service import process_video
from app.services.decision_engine import make_decision

async def route_media(file):
    file_bytes = await file.read()
    media_type = detect_file_type(file_bytes)

    if media_type in ["image", "pdf"]:
        analysis = process_image_pdf(file_bytes, media_type)
        decision = make_decision(media_type, analysis)
        return {
            "mediaType": media_type,
            "analysis": analysis,
            "decision": decision
        }

    if media_type == "video":
        analysis = process_video(file_bytes)
        decision = make_decision("video", analysis)
        return {
            "mediaType": "video",
            "analysis": analysis,
            "decision": decision
        }

    return {
        "mediaType": "unknown",
        "analysis": None,
        "decision": {
            "status": "NOT_VERIFIED",
            "confidence": 0.0,
            "reasons": ["Unsupported file type"]
        }
    }