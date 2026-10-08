import type { Preference, Whiskey } from "@types";

const API_URL = import.meta.env.VITE_API_URL as string;

interface GetBartenderPerspectiveParams {
  whiskey: Whiskey;
  preferences: Preference;
}

export async function getBartenderPerspective({
  whiskey,
  preferences,
}: GetBartenderPerspectiveParams): Promise<string> {
  const response = await fetch(`${API_URL}/api/bartender`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      whiskey,
      preferences,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get bartender perspective.");
  }

  const data = await response.json();

  return data.message;
}
