import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseWithSocket } from "./types";
import fs from "fs";
import path from "path";
// import msgJson from "./messages.json";

export class Messages {
  private static instance: Messages;
  constructor() {
    this.messages = this.readFile();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Messages();
    }
    return this.instance;
  }
  messages: ReadonlyArray<string> = [];
  private pathToMessages = path.join(process.cwd(), "json") + "/messages.json";

  private readFile(): string[] {
    return JSON.parse(fs.readFileSync(this.pathToMessages, "utf8"));
  }

  addMessage(msg: string) {
    const fileContents = this.readFile();

    fileContents.push(msg);
    fs.writeFileSync(this.pathToMessages, JSON.stringify(fileContents));

    this.messages = fileContents;
  }
}
