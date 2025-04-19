
import { useState, useEffect } from 'react';

// Sound effects using the Web Audio API
const useSoundEffects = () => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Create audio context on component mount
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    
    // Clean up when component unmounts
    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  const playMoveSound = (isX) => {
    if (!audioContext) return;
    
    // Create oscillator with different pitch for X and O
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound for X and O
    oscillator.type = 'sine';
    oscillator.frequency.value = isX ? 440 : 330; // A4 for X, E4 for O
    
    gainNode.gain.value = 0.1; // Lower volume
    
    // Quick fade out
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  };
  
  const playWinSound = () => {
    if (!audioContext) return;
    
    // Create a more complex sound for winning
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'triangle';
    
    // Start with low volume
    gainNode.gain.value = 0.05;
    
    const now = audioContext.currentTime;
    
    // Play a short melody
    oscillator.frequency.setValueAtTime(330, now);
    oscillator.frequency.setValueAtTime(392, now + 0.1);
    oscillator.frequency.setValueAtTime(494, now + 0.2);
    oscillator.frequency.setValueAtTime(587, now + 0.3);
    
    // Fade out
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    oscillator.start(now);
    oscillator.stop(now + 0.6);
  };
  
  const playDrawSound = () => {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    const now = audioContext.currentTime;
    
    // Descending tone for draw
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.linearRampToValueAtTime(200, now + 0.4);
    
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  };
  
  return { playMoveSound, playWinSound, playDrawSound };
};

export default useSoundEffects;