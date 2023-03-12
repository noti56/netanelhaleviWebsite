import { NextApiRequest, NextApiResponse } from "next";
import { Messages } from "./MessagesClass";

export default function handler(req: NextApiRequest, res: NextApiResponse<readonly string[]>) {
  res.json(Messages.getInstance().messages);
}
