export class NotificationEntity {
  private content: string;
  private category: string;

  constructor({ content, category }) {
    this.category = category;
    this.content = content;
  }
}
