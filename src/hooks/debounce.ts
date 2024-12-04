import { useEffect, useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, filter } = req.query;

  try {
    const response = await fetch(
      `http://localhost:8000/api/events/search?query=${query}&filter=${filter}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
