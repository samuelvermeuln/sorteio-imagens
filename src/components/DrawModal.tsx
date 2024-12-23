import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";

interface DrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
}

const DrawModal: React.FC<DrawModalProps> = ({ isOpen, onClose, image }) => {
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const start = Date.now();
      const duration = 1000; // 1 second for full rotation

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        setRotation(progress * 360);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setShowConfetti(true);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setRotation(0);
      setShowConfetti(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] sm:max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Imagem Sorteada!</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-center items-center h-[500px]">
          {image && (
            <img
              src={image}
              alt="Imagem sorteada"
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          )}
        </div>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DrawModal;
