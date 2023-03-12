import { NextApiRequest, NextApiResponse } from "next";
import { Messages } from "./MessagesClass";

export default function handler(req: NextApiRequest, res: NextApiResponse<readonly string[]>) {
  res.json(getMessages());
}
export const getMessages = () => {
  return Messages.getInstance().messages;
};
