export class DetalheLivro {
  isbn:string;
  title:string;
  description:string;


  constructor(isbn: string, title: string, description: string) {
    this.isbn = isbn;
    this.title = title;
    this.description = description;
  }
}
