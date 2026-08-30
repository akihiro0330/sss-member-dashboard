import {
    useEffect,
    useRef,
    useState,
  } from "react";
  import { useInView } from "framer-motion";
  
  type AnimatedNumberProps = {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
  };
  
  export default function AnimatedNumber({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 1200,
  }: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
  
    const inView = useInView(ref, {
      once: true,
      margin: "-40px",
    });
  
    const [displayValue, setDisplayValue] =
      useState(0);
  
    useEffect(() => {
      if (!inView) return;
  
      const startTime = performance.now();
  
      function animate(currentTime: number) {
        const elapsed =
          currentTime - startTime;
  
        const progress = Math.min(
          elapsed / duration,
          1,
        );
  
        const eased =
          1 - Math.pow(1 - progress, 4);
  
        setDisplayValue(value * eased);
  
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
  
      requestAnimationFrame(animate);
    }, [inView, value, duration]);
  
    const formatted =
      displayValue.toLocaleString("en-PH", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  
    return (
      <span ref={ref}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    );
  }