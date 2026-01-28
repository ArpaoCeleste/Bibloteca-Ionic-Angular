import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private userId = new BehaviorSubject('Wonderful User');
  getUserId = this.userId.asObservable();

  private libraryNameSubject = new BehaviorSubject<string>('Biblioteca Client');
  libraryName$ = this.libraryNameSubject.asObservable();

  private libraryAdressSubject = new BehaviorSubject<string>('BibliotecaClient.com');
  libraryAdress$ = this.libraryAdressSubject.asObservable();


  constructor() { }

  setUserId(userId: string){
    this.userId.next(userId);
  }



  setLibraryName(name: string) {
    this.libraryNameSubject.next(name);
  }

  setLibraryAdress(address: string) {
    this.libraryAdressSubject.next(address);
  }

  



}


