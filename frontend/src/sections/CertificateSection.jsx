import { useState } from "react";
import FileUploader from "../components/FileUploader";
import ResultCard from "../components/ResultCard";
import { verifyMedia } from "../services/api";

export default function CertificateSection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyMedia(file);
      setResult(data);
    } catch (err) {
      alert("Verification failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Certificate Verification</h2>

      <FileUploader onFileSelect={setFile} />

      <br /><br />

      <button onClick={handleVerify}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      <ResultCard result={result} />
    </div>
  );
}
