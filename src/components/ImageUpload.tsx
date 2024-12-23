import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRaffle } from "@/app/context/RaffleContext";

const ImageUpload: React.FC = () => {
  const { addImages } = useRaffle();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newImages = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        addImages(newImages);
      }
    },
    [addImages]
  );

  return (
    <div className="mb-4">
      <Label htmlFor="image-upload" className="block mb-2">
        Upload Christmas Images
      </Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
