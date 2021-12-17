import { createEvent } from "../../../../lib/fauna";

export default async function handler(req, res) {
  try {
    const { since, startTime, endTime, tries, successes, errors } = req.body;
    const resp = await createEvent({
      since,
      startTime,
      endTime,
      tries,
      successes,
      errors,
    });
    res.status(200).json(resp);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error);
  }
}
