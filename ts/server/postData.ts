export async function postFavoirets(data: Object) {
  interface track {
    id: string;
    title: string;
    artist: string;
    duration: number;
    encoded_audio: string;
  }
  const response = await fetch("http://localhost:8000/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  console.log(await response.json());
}
