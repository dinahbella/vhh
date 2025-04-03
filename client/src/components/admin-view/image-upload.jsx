import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function ProductImage({
  imageFile,
  setImageFile,
  imageLoading,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoading,
}) {
  const inputRef = useRef(null);

  // Handle file selection from input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Handle drag-and-drop file selection
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };
  const handleDrag = (e) => e.preventDefault();

  // Upload image to server
  const uploadImageToCloud = async () => {
    if (!imageFile) return;

    setImageLoading(true);
    const data = new FormData();
    data.append("vhh", imageFile); // ✅ Correct key for backend

    try {
      const res = await axios.post(
        "http://localhost:7000/api/admin/products/upload-image",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res?.data?.success && res?.data?.result?.url) {
        setUploadedImageUrl(res.data.result.url);
      } else {
        console.error("Unexpected API response structure:", res.data);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoading(false);
    }
  };

  // Upload image automatically when selected
  useEffect(() => {
    if (imageFile) uploadImageToCloud();
  }, [imageFile]); // ✅ Added dependency to prevent infinite re-renders

  return (
    <div className="w-full max-w-md mx-auto px-2 space-y-4">
      <Label className="text-lg block font-semibold px-3">Upload Image</Label>
      <div
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-center text-muted-foreground">
              Drag & drop or click to upload images
            </span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-primary" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 h-7 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span> {/* ✅ Fixed typo */}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
