'use client'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.pro-rating.com";
    }
  }, []);

  return null;
}
