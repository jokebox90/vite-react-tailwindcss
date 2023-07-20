// src/pages/Home.tsx

import { Fragment, ReactNode, useEffect, useState } from "react";

interface RevealedWordsProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  revealClass?: string;
  words: string[];
}

export default function RevealedWords(Props: RevealedWordsProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(50);

  useEffect(() => {
    let timeID = 0;

    if (!timeID) {
      timeID = Number(
        setTimeout(() => {
          if (!isDeleting && charIndex < Props.words[wordIndex].length) {
            setDisplayWord((prev) => prev + Props.words[wordIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
            setDelay(50);
          } else if (
            !isDeleting &&
            charIndex === Props.words[wordIndex].length
          ) {
            setIsDeleting(true);
            setDelay(2500);
          } else if (isDeleting && displayWord.length > 0) {
            setDisplayWord((prev) => prev.slice(0, -1));
            setCharIndex((prev) => prev - 1);
            setDelay(20);
          } else if (isDeleting && displayWord.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % Props.words.length);
            setCharIndex(0);
            setDelay(150);
          }
        }, delay)
      );
    }

    return () => {
      timeID && clearTimeout(timeID);
    };
  }, [wordIndex, charIndex, isDeleting, displayWord, delay, Props.words]);

  return (
    <Fragment>
      <span className={`revealed-words ${Props.className || ""}`}>
        {Props.children}
      </span>
      &nbsp;
      <span className={`revealed-words ${Props.revealClass || ""}`}>
        {displayWord}
        <span className="animate-[blink_750ms_linear_infinite] font-bold">
          |
        </span>
      </span>
    </Fragment>
  );
}
