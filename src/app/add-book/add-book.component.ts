import { Component } from '@angular/core';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-add-book',
  imports: [    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  newBook = {
    isbn: '',
    stock: 0,
  };
  libraryId: string | null = null;
  ngOnInit(): void {
    this.libraryId = this.route.snapshot.paramMap.get('bibliotecaId');
 
    if (!this.libraryId) {
      console.log("id", this.libraryId);
      console.error('ID da biblioteca não encontrado ');
    }
  }


  constructor(private bibliotecaService: BibliotecaServiceService,private route: ActivatedRoute,private router: Router) {}
  onAddBook(): void {
    if (!this.libraryId) {
      alert('ID da biblioteca não está disponível.');
      return;
    }

    if (!this.newBook.isbn || this.newBook.stock <= 0) {
      alert('Por favor, preencha o ISBN e o estoque corretamente.');
      return;
    }

    this.bibliotecaService
      .addBook(this.libraryId, this.newBook.isbn, this.newBook.stock)
      .subscribe(
        (response) => {
          console.log('Livro adicionado com sucesso:', response);
          alert('Livro adicionado com sucesso!');

         
      this.router.navigateByUrl(`/detalhes/${this.libraryId}/${this.newBook.isbn}`);
        },
        (error) => {
          console.error('Erro ao adicionar o livro:', error);
          alert('Erro ao adicionar o livro. Tente novamente.');
        }
      );

      
  }

  Date(deliveryDate: string): boolean {
    const today = new Date();
    const dueDate = new Date(deliveryDate);
    return today > dueDate;
  }




  resetForm(): void {
    this.newBook = {
      isbn: '',
      stock: 0,
    };
  }
}