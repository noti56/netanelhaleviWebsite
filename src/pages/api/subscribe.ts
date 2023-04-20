import { NextApiRequest, NextApiResponse } from "next";
import webpush, { PushSubscription } from "web-push";
const publicVapidKey =
  "BEc2-0v3UehTphhFjanlWc_nQUkuodnenCdq8U1LQPE9TqSXGpABxtLc4zqhG1gJzuIjyGZjgnEP4XFt5aeiw5g";

const privateVapidKey = "lLz1YAkSM7DL6oOvlvD7yasJIVsLdnbq5hLXG7GGOFg";

webpush.setVapidDetails("mailto:noti56@gmail.com", publicVapidKey, privateVapidKey);
let subscription1: PushSubscription;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const subscription: PushSubscription = req.body.subscription;

    // Send 201 - resource created
    res.status(201);

    // Create payload
    const payload = JSON.stringify({ title: "Push Test", message: "hello there" });
    subscription1 = subscription;
    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
  }
}

// setInterval(() => {
//   if (subscription1) {
//     const payload = JSON.stringify({ title: "Push Test", message: "hello there" });

//     webpush.sendNotification(subscription1, payload).catch((err) => console.error(err));
//   }
// }, 3000);
