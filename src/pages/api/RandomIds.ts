export class randomUUID {
  private static instance: randomUUID;
  private static uuids: string[] = [];
  static getInstance() {
    if (!this.instance) {
      this.instance = new randomUUID();
    }
    return this.instance;
  }
   addRandId() {
    const uuid = (Math.random() * Math.random()).toString().split(".")[1];
    randomUUID.uuids.push(uuid);
    return uuid;
  }
}
