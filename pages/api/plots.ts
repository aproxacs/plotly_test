// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createPlot, getAllPlots, IPlotDB } from "../../lib/api/plots";

type Data = {
  data: IPlotDB[];
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    await createPlot(req.body);
    res.status(201).json({ data: [] });
  } else if (req.method === "GET") {
    const plots = await getAllPlots();
    res.status(200).json({ data: plots });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
