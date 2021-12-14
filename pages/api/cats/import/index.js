import { fetchCats } from "../../../../lib/api";
import FETCH_URL from "../../../../config/api";

export default async function handler(req, res) {
  const sixMonthsAgo = Math.floor(Date.now() / 1000) - 15552000;
  const cats = await fetchCats(FETCH_URL, "", sixMonthsAgo);
  for (let cat of cats) {
    const resp = await fetch("http://localhost:3000/api/cats", {
      method: "POST",
      body: JSON.stringify(cat),
      headers: { "Content-Type": "application/json" },
    });
  }
  res.status(200).json({ name: "John Doe" });
}
