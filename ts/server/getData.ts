  interface track {
    id: string;
    title: string;
    artist: string;
    duration: number;
    encoded_audio: string;
  }

export async function getTracks(): Promise<track[]> {
  const token: string = localStorage.getItem("autarisation-token") as string;

  const response = await fetch("http://localhost:8000/api/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tracks: track[] = await response.json();

  return tracks;
}

export async function getFavoriteTracks(): Promise<track[]> {
  const token: string = localStorage.getItem("autarisation-token") as string;

  const response = await fetch("http://localhost:8000/api/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tracks: track[] = await response.json();

  return tracks;
}
