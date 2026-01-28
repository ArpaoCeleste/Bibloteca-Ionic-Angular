import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<string>(''); 
  currentUser$ = this.currentUserSubject.asObservable(); 

  setCurrentUser(userId: string): void {
    this.currentUserSubject.next(userId); 
  }

  getCurrentUser(): string {
    return this.currentUserSubject.getValue();
  }
}