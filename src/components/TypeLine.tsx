import { useEffect, useState } from "react";

const TypeLine = ({
  text,
  speed = 80,
  delay = 2000,
  startDelay = 0,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  startDelay?: number;
  className?: string;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    let restartTimeout: NodeJS.Timeout;

    const startTyping = () => {
      let i = 0;

      typingInterval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i >= text.length) {
          clearInterval(typingInterval);

          restartTimeout = setTimeout(() => {
            setDisplayed("");
            startTyping();
          }, delay);
        }
      }, speed);
    };

    const initialTimeout = setTimeout(() => {
      startTyping();
    }, startDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(restartTimeout);
      clearInterval(typingInterval);
    };
  }, [text, speed, delay, startDelay]);

  return <div className={className}>{displayed}</div>;
};

export default TypeLine;