import { useState } from "react";
import { verifyMedia } from "../services/api";
import ResultCard from "../components/ResultCard";

export default function VideoSection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file) return alert("Please select a video");

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyMedia(file);
      setResult(data);
    } catch (err) {
      alert("Video verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Video Verification</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify Video"}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}
