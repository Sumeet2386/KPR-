import { useState } from "react";
import { verifyMedia } from "../services/api";


export default function FileUploader({ onFileSelect }) {
  return (
    <input
      type="file"
      onChange={(e) => onFileSelect(e.target.files[0])}
    />
  );
}

