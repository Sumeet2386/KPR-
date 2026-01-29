import { useState } from "react";
import FileUploader from "../components/FileUploader";
import ResultCard from "../components/ResultCard";

const CertificateSection = () => {
  const [result, setResult] = useState(null);

  return (
    <>
      <FileUploader
        accept=".pdf,.png,.jpg,.jpeg"
        description="Upload a certificate to verify authenticity using OCR, QR code, and metadata analysis."
        onResult={setResult}
      />
      <ResultCard result={result} />
    </>
  );
};

export default CertificateSection;
