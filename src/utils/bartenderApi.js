const API_URL = import.meta.env.VITE_API_URL;

export async function getBartenderPerspective({ whiskey, preferences }) {
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
