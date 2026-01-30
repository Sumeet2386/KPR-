from app.services.image.metadata import analyze_image_metadata
from app.services.image.artifacts import analyze_image_artifacts

async def verify_image(file):
    reasons = []
    score = 0.5  # neutral baseline

    meta_score, meta_reasons = analyze_image_metadata(file)
    file.file.seek(0)

    art_score, art_reasons = analyze_image_artifacts(file)
    file.file.seek(0)

    score += meta_score + art_score
    reasons.extend(meta_reasons + art_reasons)

    if score >= 0.7:
        status = "LIKELY_GENUINE"
    elif score >= 0.4:
        status = "INCONCLUSIVE"
    else:
        status = "LIKELY_MANIPULATED"

    return {
        "mediaType": "Image",
        "decision": {
            "status": status,
            "confidence": round(score, 2),
            "reasons": reasons
        }
    }
