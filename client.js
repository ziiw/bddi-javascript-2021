export class Client {
  constructor({pseudo}) {
    this.pseudo = pseudo
    this.seenAt = new Date()
    this.leftAt = null;
  }

  // Todo : Test if it works
  isConnected() {
    return this.seenAt < this.leftAt
  }
}
