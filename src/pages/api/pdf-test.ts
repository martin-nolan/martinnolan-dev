import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    message: "PDF test endpoint",
    query: req.query,
    url: req.url,
    method: req.method,
  });
}
