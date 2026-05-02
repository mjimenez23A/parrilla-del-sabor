import { useEffect, useState } from "react";

const TypeLine = ({
  text,
  speed = 80,
  delay = 2000,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i >= text.length) {
          clearInterval(interval);

          setTimeout(() => {
            setDisplayed("");
            i = 0;
            startTyping();
          }, delay);
        }
      }, speed);
    };

    startTyping();
  }, [text, speed, delay]);

  return <div className={className}>{displayed}</div>;
};

export default TypeLine;