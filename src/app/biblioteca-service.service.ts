import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Biblioteca } from './model/Biblioteca';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root'
})

export class BibliotecaServiceService {
  private servidor = environment.apiUrl; 

  constructor(private http: HttpClient) {
  }

  getLibraries(){
    const url = environment.apiUrl +'/v1/library';
    return this.http.get<Biblioteca[]>(url);
  }

  public getCurrentLibrary(uuid: string|null ){
    const url = environment.apiUrl +'/v1/library/' + uuid;
    return this.http.get<Biblioteca>(url);
  }

  public getBookLibrary(uuid: string|null ){
    const url = environment.apiUrl +'/v1/library/' + uuid + '/book';
    return this.http.get<any>(url);
  }

  requestbook(uuid: string, isbn: string):  Observable<any> {
    const url = environment.apiUrl +'/v1/library/' +  uuid + "/book/" +  isbn  ;
    return this.http.get<any>(url);
  }

  checkoutBook(libraryId: string, bookId: string, userId: string): Observable<any> {
    const url = `${environment.apiUrl }/v1/library/${libraryId}/book/${bookId}/checkout?userId=${encodeURIComponent(userId)}`;
    return this.http.post<any>(url, {});
  }

 public goToLivroDetalhe( uuid : string| null,isbn : string|null ){
    const url = environment.apiUrl +'/v1/library/' +  uuid + "/book/" +  isbn;
    return this.http.get<any>(url);
 }

 searchBooks(query: string, libraryId: string): Observable<any> {
  const apiUrl = `${environment.apiUrl }/v1/library/${libraryId}/search?query=${encodeURIComponent(query)};`
  return this.http.get(apiUrl);
}

 public addBook(libraryId: string, isbn: string, stock: number): Observable<any> {
  const url = `${environment.apiUrl}/v1/library/${libraryId}/book/${isbn};`
  const body = { stock };
  return this.http.post<any>(url, body);
}

updateBookStock(libraryId: string, isbn: string, stock: number, available: number): Observable<any> {
  const url = `${environment.apiUrl}/v1/library/${libraryId}/book/${isbn}`;
  const body = { stock, available };
  return this.http.put<any>(url, body);
}

getCheckedOutBooks(userId: string): Observable<any[]> {
  const url = `${environment.apiUrl}/v1/user/checked-out?userId=${encodeURIComponent(userId)}`;
  return this.http.get<any[]>(url);
}

checkinBook(libraryId: string, isbn: string, userId: string): Observable<any> {
  const url = `${environment.apiUrl}/v1/library/${libraryId}/book/${isbn}/checkin?userId=${userId}`;


  return this.http.post<any>(url, {});
}

getCheckoutHistory(userId: string): Observable<any[]> {
  const url = `${environment.apiUrl}/v1/user/checkout-history?userId=${encodeURIComponent(userId)}`;
  return this.http.get<any[]>(url);
}

searchBooksGlobal(query: string) {
  return this.http.get<any[]>(`${environment.apiUrl}/v1/search?query=${encodeURIComponent(query)}`);
}

getReviews(isbn: string): Observable<any[]> {
  const url = `${environment.apiUrl}/v1/book/${encodeURIComponent(isbn)}/review`;
  return this.http.get<any[]>(url);
}


addReview(isbn: string, reviewData: any): Observable<any> {
 
  const userId = reviewData.reviewer;
  const url = `${environment.apiUrl}/v1/book/${encodeURIComponent(isbn)}/review?userId=${encodeURIComponent(userId)}`;

  return this.http.post<any>(url, reviewData);
}

createLibrary(libraryData: any): Observable<any> {
  const url = `${environment.apiUrl}/v1/library`;
  return this.http.post<any>(url, libraryData);
}

deleteLibrary(id: string) {
  const url = `${environment.apiUrl}/v1/library/${id}`;
  return this.http.delete(url);
}

updateLibrary(id: string, libraryData: any) {
  const url = `${environment.apiUrl}/v1/library/${id}`;
  return this.http.put(url, libraryData);
}

   getRecommendedCount(isbn: string): Observable<number> {
    const url = environment.apiUrl + `/v1/book/${encodeURIComponent(isbn)}/review/recommended-count`;
    return this.http.get<number>(url);
  }
}
