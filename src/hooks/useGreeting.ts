import {
    useEffect,
    useState,
  } from "react";
  
  function getGreeting() {
    const hour =
      new Date().getHours();
  
    if (
      hour >= 5 &&
      hour < 12
    ) {
      return "Good morning";
    }
  
    if (
      hour >= 12 &&
      hour < 18
    ) {
      return "Good afternoon";
    }
  
    return "Good evening";
  }
  
  export function useGreeting() {
    const [
      greeting,
      setGreeting,
    ] = useState(getGreeting);
  
    useEffect(() => {
      /*
       * Check once every minute.
       *
       * This means the greeting can change
       * automatically even when the dashboard
       * remains open across morning/afternoon/
       * evening boundaries.
       */
      const interval =
        window.setInterval(() => {
          setGreeting(getGreeting());
        }, 60_000);
  
      return () => {
        window.clearInterval(
          interval,
        );
      };
    }, []);
  
    return greeting;
  }