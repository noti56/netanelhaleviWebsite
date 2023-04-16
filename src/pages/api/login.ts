import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "./RandomIds";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token?: string; msg: "success" | "failed" }>
) {
  if (req.method === "POST") {
    const users = getUsers();
    const { username, password } = JSON.parse(req.body);

    const foundUser = users.filter(
      (user) => user.username === username && user.password === password
    );
    if (foundUser.length > 0) {
      const uuid = randomUUID.getInstance().addRandId();
      res.json({ msg: "success", token: uuid });
    } else {
      res.json({ msg: "failed" });
    }
  }
}

export const getUsers = () => {
  return [{ password: "1234", username: "noti56" }];
};

//https://discord.com/api/webhooks/1097135974934392903/ssK5TpAqq3IDinl-zAF3t-4mX98Eb1YXwx3n63VFZ2Wewua93aN_CS-K4pLhjDCt3Vt0
