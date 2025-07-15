import React, { useRef } from "react";
import * as confetti from "canvas-confetti";
import "./Style.css";

const CelebrationButton = () => {



  const buttonRef = useRef(null);

  const handleCelebrate = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Button animation
    if (buttonRef.current) {
      buttonRef.current.style.transform = "scale(0.95)";
      setTimeout(() => {
        buttonRef.current.style.transform = "scale(1)";
      }, 100);
    }
  };

  return (
    <div >
      <button  onClick={handleCelebrate} className="celebrate-btn">
        Celebrate!
      </button>
    </div>
  );
};

export default CelebrationButton;
