import { createEvent } from "../../../../lib/fauna";

export default async function handler(req, res) {
  try {
    if (!req.headers.action_key) {
      res.status(401).json("Access key required");
    } else {
      if (req.headers.action_key === process.env.APP_KEY) {
        const { since, startTime, endTime, tries, successes, errors } =
          req.body;
        const resp = await createEvent({
          since,
          startTime,
          endTime,
          tries,
          successes,
          errors,
        });
        res.status(200).json(resp);
      } else {
        res.status(401).json("Access key required");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error);
  }
}
