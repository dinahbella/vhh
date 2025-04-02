import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ProductImage(
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl
) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log(e.target.files);
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg block  font-semibold px-3">Upload Image</Label>
      <div>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
