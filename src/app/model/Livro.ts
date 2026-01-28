import { DetalheLivro } from './DetalheLivro';

export class Livro{
  isbn: string;
  stock: number;
  available: number;
  book:DetalheLivro;

  constructor(isbn: string, stock: number, available: number, book: DetalheLivro) {
    this.isbn = isbn;
    this.stock = stock;
    this.available = available;
    this.book = book;
  }
}
