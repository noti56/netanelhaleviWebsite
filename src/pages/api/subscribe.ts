import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
const publicVapidKey =
  "BEc2-0v3UehTphhFjanlWc_nQUkuodnenCdq8U1LQPE9TqSXGpABxtLc4zqhG1gJzuIjyGZjgnEP4XFt5aeiw5g";

const privateVapidKey = "lLz1YAkSM7DL6oOvlvD7yasJIVsLdnbq5hLXG7GGOFg";

webpush.setVapidDetails("mailto:noti56@gmail.com", publicVapidKey, privateVapidKey);
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201);

    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
  }
}
