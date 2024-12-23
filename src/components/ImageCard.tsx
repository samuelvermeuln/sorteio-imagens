/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ImageCardProps {
  image: string;
  isDrawn: boolean;
  isRevealing: boolean;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  isDrawn,
  isRevealing,
  onClick,
}) => {
  return (
    <Card
      className={`
        w-48 h-48 m-3 overflow-hidden cursor-pointer transition-all duration-300
        ${isDrawn && !isRevealing ? "opacity-50" : ""}
        ${isRevealing ? "animate-pulse" : ""}
        hover:scale-105
      `}
      onClick={onClick}
    >
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-full">
          <img
            src={
              isDrawn || isRevealing
                ? image
                : "/placeholder.svg?height=192&width=192"
            }
            alt="Christmas raffle"
            className="w-full h-full object-cover"
          />
          {!isDrawn && !isRevealing && (
            <div className="absolute inset-0 bg-red-600 opacity-75 flex items-center justify-center">
              <span className="text-white text-5xl">?</span>
            </div>
          )}
          {isRevealing && (
            <div className="absolute inset-0 bg-green-600 opacity-75 flex items-center justify-center">
              <span className="text-white text-3xl">Click!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
