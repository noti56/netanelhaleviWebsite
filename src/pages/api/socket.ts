// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { Messages } from "./MessagesClass";
import { NextApiResponseWithSocket } from "./types";

const d = "default";
export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log("Socket is already running.");
  } else {
    const io = new Server(res.socket.server, { cors: { origin: "*" } });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.join(d);
      let timeout: ReturnType<typeof setTimeout> | null = null;
      socket.on("typing", () => {
        socket.broadcast.emit("typing");
        timeout = setTimeout(() => {
          if (!timeout) return;
          socket.broadcast.emit("stop-typing");
          clearTimeout(timeout);
        }, 2000);
      });

      socket.on("message-send", (msg: string) => {
        console.log(msg);

        Messages.getInstance().addMessage(msg);
        io.in(d).emit("message-get", Messages.getInstance().messages);
      });
    });
  }

  res.end();
}
