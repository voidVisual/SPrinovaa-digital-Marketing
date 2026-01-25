'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
}

export function TypingAnimation({ text, className }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 100;

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, text]);

  return (
    <h1 className={cn(className)}>
      {displayedText}
      <span className="typing-cursor"></span>
    </h1>
  );
}
