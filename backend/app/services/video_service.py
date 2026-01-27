import cv2
import tempfile
import os

def process_video(file_bytes: bytes):
    """
    Basic video processing:
    - Extract metadata
    - Extract sample frames
    """

    result = {
        "frame_count": 0,
        "fps": None,
        "duration_seconds": None,
        "sample_frames_extracted": 0
    }

    
    with tempfile.NamedTemporaryFile(delete=True, suffix=".mp4") as temp:
        temp.write(file_bytes)
        temp.flush()

        cap = cv2.VideoCapture(temp.name)

        if not cap.isOpened():
            return {"error": "Unable to read video"}

        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        result["fps"] = fps
        result["frame_count"] = frame_count

        if fps and frame_count:
            result["duration_seconds"] = round(frame_count / fps, 2)

        
        sample_frames = 5
        step = max(frame_count // sample_frames, 1)

        extracted = 0
        current = 0

        while extracted < sample_frames and cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            if current % step == 0:
                extracted += 1

            current += 1

        cap.release()
        result["sample_frames_extracted"] = extracted

    return result
