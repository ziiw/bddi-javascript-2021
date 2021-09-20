export class Message { 
  constructor({content, author}) {
    this.content = content
    this.author = author
    this.sentAt = new Date()
  }
}