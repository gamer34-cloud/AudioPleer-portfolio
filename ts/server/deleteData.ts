export async function deleteFavorites(data: string): Promise<void> {
  const token = localStorage.getItem("autarisation-token");

  const response = await fetch("http://localhost:8000/api/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      trackId: data,
    }),
  });
}
