import { io, Socket } from "socket.io-client";
export class SocketClient {
  private static instance: Socket;
  static getInstance() {
    if (!this.instance) {
      this.instance = io();
    }
    return this.instance;
  }
}
