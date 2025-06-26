/* eslint-disable @typescript-eslint/no-useless-constructor */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BookModel {
  id!: number;
  title?: string;
  author?: string;
  decription?: string;
  copies?: number;
  copies_avilavle?: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    author: string,
    decription: string,
    copies: number,
    copies_avilavle: number,
    category: string,
    img: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.decription = decription;
    this.copies = copies;
    this.copies_avilavle = copies_avilavle;
    this.category = category;
    this.img = img;
  }
}
export default BookModel;
