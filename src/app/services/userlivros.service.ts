import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class userlivroService {
  private userlivros: { [userId: string]: any[] } = {};

  addBookToUser(userId: string, book: any) {
    if (!this.userlivros[userId]) {
      this.userlivros[userId] = [];
    }
    this.userlivros[userId].push(book);
  }

  getBooksByUser(userId: string): any[] {
    return this.userlivros[userId] || [];
  }
}