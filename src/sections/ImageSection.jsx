import { useState } from "react";
import FileUploader from "../components/FileUploader";
import ResultCard from "../components/ResultCard";

const ImageSection = () => {
  const [result, setResult] = useState(null);

  return (
    <>
      <FileUploader
        accept=".png,.jpg,.jpeg"
        description="Upload an image to verify whether it is authentic or manipulated."
        onResult={setResult}
      />
      <ResultCard result={result} />
    </>
  );
};

export default ImageSection;
