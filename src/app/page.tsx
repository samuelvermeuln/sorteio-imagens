"use client";
import React, { useState, useCallback } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageCard from "../components/ImageCard";
import Countdown from "../components/Countdown";
import CompletionMessage from "../components/CompletionMessage";
import DrawModal from "../components/DrawModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRaffle } from "./context/RaffleContext";

const Home: React.FC = () => {
  const {
    images,
    drawnImages,
    drawNext,
    resetRaffle,
    newRaffle,
    backgroundImage,
    setBackgroundImage,
  } = useRaffle();
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealingImage, setRevealingImage] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDraw = useCallback(async () => {
    setIsDrawing(true);
    const drawn = await drawNext();
    setIsDrawing(false);
    if (drawn) {
      setRevealingImage(drawn);
    } else {
      setShowCompletion(true);
    }
  }, [drawNext]);

  const handleReveal = useCallback(() => {
    if (revealingImage) {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setRevealingImage(null);
      }, 5000); // Increased to 5 seconds to allow for the rotation and confetti
    }
  }, [revealingImage]);

  const handleBackgroundUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setBackgroundImage(imageUrl);
      }
    },
    [setBackgroundImage]
  );

  return (
    <div
      className="min-h-screen p-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Sorteio de Natal</h1>

      <div className="mb-4 w-full max-w-md">
        <Label htmlFor="bg-upload" className="block mb-2">
          Upload Background Image
        </Label>
        <Input
          id="bg-upload"
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
        />
      </div>

      <ImageUpload />

      <div className="flex flex-wrap justify-center mb-8 max-w-4xl">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            isDrawn={drawnImages.includes(image)}
            isRevealing={revealingImage === image}
            onClick={handleReveal}
          />
        ))}
      </div>

      <div className="space-x-4">
        <Button
          onClick={handleDraw}
          disabled={
            isDrawing ||
            images.length === 0 ||
            images.length === drawnImages.length ||
            revealingImage !== null
          }
        >
          Sortear Próximo
        </Button>
        <Button onClick={resetRaffle} variant="secondary">
          Reiniciar Sorteio
        </Button>
        <Button onClick={newRaffle} variant="destructive">
          Novo Sorteio
        </Button>
      </div>

      {isDrawing && <Countdown onComplete={() => setIsDrawing(false)} />}
      {showCompletion && (
        <CompletionMessage lastDrawn={drawnImages[drawnImages.length - 1]} />
      )}
      <DrawModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={revealingImage}
      />
    </div>
  );
};

export default Home;
