'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  textLines: string[];
  className?: string;
}

export function TypingAnimation({ textLines, className }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 100;
  const fullText = textLines.join('\n');

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, fullText]);

  return (
    <h1 className={cn(className, 'whitespace-pre-line')}>
      {displayedText}
      <span className="typing-cursor"></span>
    </h1>
  );
}
