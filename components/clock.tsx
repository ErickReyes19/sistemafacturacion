"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatea la hora como “HH:MM:SS”
  const formatted = time.toLocaleTimeString();

  return (
    <div className="font-mono text-sm border  px-2 py-1 rounded-lg shadow-md">
      {formatted}
    </div>
  );
}
