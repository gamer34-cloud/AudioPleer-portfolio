interface track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  encoded_audio: string;
}

export async function postRegister(data: object): Promise<void> {
  console.log(data);
  const response = await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response);
}

export async function postFavorites(data: string): Promise<void> {
  const token = localStorage.getItem("autarisation-token");

  const response = await fetch("http://localhost:8000/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      trackId: data,
    }),
  });

}
