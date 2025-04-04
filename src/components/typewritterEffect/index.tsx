import { useState, useEffect } from 'react';

interface typewriterProps{
    text: string;
    speed?: number; 
}

export const TypewriterEffect = ({ text, speed = 100 }: typewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};