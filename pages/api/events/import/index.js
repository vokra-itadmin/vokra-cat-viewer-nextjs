import { createEvent } from "../../../../lib/fauna";

export default async function handler(req, res) {
  try {
    const { importResponse } = req.body;
    const resp = await createEvent(importResponse);
    res.status(200).json(resp);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error);
  }
}
