import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { AppService } from '../app.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton,IonRow,IonCol,IonGrid } from '@ionic/angular/standalone';
@Component({
   imports: [
      FallbackImagePipe,
      CommonModule,
      RouterModule,
      FormsModule,
       IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    
    IonItem, 
    
    IonInput, 
    IonButton,
    IonRow,
    IonCol,
    
    IonGrid,
  




   ],
  selector: 'app-requisitarlivro',
  templateUrl: './requisitarlivro.component.html',
  styleUrls: ['./requisitarlivro.component.scss']
})
export class RequisitarlivroComponent implements OnInit  {
  userId:string='';

  isbn!: string;
  livro: any = {};

  libraryId: string = '';



  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaServiceService,
    private appService: AppService,
    private router: Router,
  
    


  ) {

    this.appService.getUserId.subscribe((userId) => {
  this.userId = userId;
});
  }

  ngOnInit(): void {

   
    const libraryId = this.route.snapshot.paramMap.get('bibliotecaId');
    const userId = this.route.snapshot.paramMap.get('userId');
    const isbn = this.route.snapshot.paramMap.get('isbn');
 
    if (!libraryId || !userId || !isbn) {
      console.error('Parâmetros de rota inválidos. Certifique-se de que bibliotecaId, userId e isbn estão definidos.');
      return;
    }

    this.libraryId = libraryId;
    this.isbn = isbn;
    this.userId = userId;
    this.exibirLivro(this.libraryId, this.isbn);

  
  

   
   
  }

 
  


  
  exibirLivro(libraryId:string, isbn: string): void {
    console.log('ISBN:', isbn);
    this.bibliotecaService.goToLivroDetalhe(libraryId, isbn).subscribe(
      (value: any[]) => {
        this.livro = value;
      },
      error => {
        console.error('Erro ao buscar livros da biblioteca:', error);
      }
    );
  }

  

  checkoutBook(): void {
    console.log('libraryId:', this.libraryId);
    console.log('isbn:', this.isbn);
    console.log('userId:', this.userId);
  
    if (!this.userId) {
      alert('Por favor, insira o seu nome antes de requisitar o livro.');
      return;
    }
  
    if (!this.libraryId || !this.isbn) {
      alert('Erro interno: biblioteca ou livro não identificado.');
      return;
    }
  
 this.bibliotecaService.checkoutBook(this.libraryId, this.isbn, this.userId).subscribe(
  () => {
    alert('Livro requisitado com sucesso!');
    this.router.navigate(['/userlivros', this.userId], { replaceUrl: true });
  },
  (error) => {
    console.error('Erro ao requisitar o livro:', error);
    alert('Erro ao requisitar o livro. Este user já requisitou este livro.');
  }
);
  }

  saveUserName(): void {
    if (this.userId) {
      localStorage.setItem('userName', this.userId);
    }
  }

  isLate(deliveryDate: string): boolean {
    const today = new Date();
    const dueDate = new Date(deliveryDate);
    return today > dueDate;
  }

  

}









