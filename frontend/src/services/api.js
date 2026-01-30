const API_BASE = "http://127.0.0.1:8000/api";

export async function verifyMedia(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/verify`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Verification failed");
  }

  return response.json();
}
