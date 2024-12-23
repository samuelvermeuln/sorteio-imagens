'use client';
import React, { createContext, useContext, useState, useCallback } from "react";

interface RaffleContextType {
  images: string[];
  drawnImages: string[];
  addImages: (newImages: string[]) => void;
  drawNext: () => Promise<string | null>;
  resetRaffle: () => void;
  newRaffle: () => void;
  backgroundImage: string | null;
  setBackgroundImage: (image: string | null) => void;
}

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

export const RaffleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [drawnImages, setDrawnImages] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const addImages = useCallback((newImages: string[]) => {
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const drawNext = useCallback(() => {
    return new Promise<string | null>((resolve) => {
      setTimeout(() => {
        const undrawnImages = images.filter(
          (img) => !drawnImages.includes(img)
        );
        if (undrawnImages.length === 0) {
          resolve(null);
        } else {
          const randomIndex = Math.floor(Math.random() * undrawnImages.length);
          const drawnImage = undrawnImages[randomIndex];
          setDrawnImages((prev) => [...prev, drawnImage]);
          resolve(drawnImage);
        }
      }, 3000); // 3 seconds delay
    });
  }, [images, drawnImages]);

  const resetRaffle = useCallback(() => {
    setDrawnImages([]);
  }, []);

  const newRaffle = useCallback(() => {
    setImages([]);
    setDrawnImages([]);
  }, []);

  return (
    <RaffleContext.Provider
      value={{
        images,
        drawnImages,
        addImages,
        drawNext,
        resetRaffle,
        newRaffle,
        backgroundImage,
        setBackgroundImage,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error("useRaffle must be used within a RaffleProvider");
  }
  return context;
};
