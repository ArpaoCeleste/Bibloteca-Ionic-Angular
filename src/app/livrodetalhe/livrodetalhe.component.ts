import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../model/Biblioteca';
import { AppService } from '../app.service';
import { Input } from '@angular/core';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonButton,IonRow,IonCol,IonCard,IonCardContent,IonGrid,IonCardTitle,IonCardHeader,IonIcon,IonContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-livrodetalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FallbackImagePipe,
      NgxPaginationModule,
    IonButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonGrid,
    IonCardTitle,
    IonCardHeader,
    IonIcon,
    IonContent

  ],
  templateUrl: './livrodetalhe.component.html',
  styleUrl: './livrodetalhe.component.scss'
})
export class LivrodetalheComponent  {
  genres: string[] = [];
 isbn: string = '';
   livro: any = {};
     reviews: any[] = [];
  isLoadingReviews = false;
   currentPage = 1;
   livroJaRequisitado: boolean = false;
  recommendedCounts: { [isbn: string]: number } = {};

   biblioteca: Biblioteca = {} as Biblioteca;
   userId:string='';
   livrosBiblioteca:any[] = [];
   @Input('selectedLibraryId') libraryId = '';


  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaServiceService,
    private appService: AppService,
    private router: Router,


  ) {}

  ngOnInit(): void {

 

    const bibliotecaId = this.route.snapshot.paramMap.get('bibliotecaId');
    const isbn = this.route.snapshot.paramMap.get('isbn');

    this.appService.getUserId.subscribe((userId) => {
      this.userId = userId;
    });

if (isbn) {
  this.bibliotecaService.getRecommendedCount(isbn).subscribe(count => {
    this.recommendedCounts[isbn] = count;
  console.log('Recommended Count for ISBN', isbn, ':', count);
  });
}

    if (bibliotecaId) {
      this.libraryId = bibliotecaId;
    }

    if (bibliotecaId && isbn) {
      this.bibliotecaService.goToLivroDetalhe(bibliotecaId, isbn).subscribe(
        (book) => {
          console.log('Detalhes do Livro:', book);
          this.livro = book;
           this.loadReviews(this.livro.book.isbn);
           

   this.bibliotecaService.getCheckedOutBooks(this.userId).subscribe((livros: any[]) => {

  this.livroJaRequisitado = livros.some(livro => livro.bookId === this.livro.book.isbn);
});
        },
        (error) => {
          console.error('Erro ao buscar detalhes do livro:', error);
        }
      );
    }


  }




  getAuthorNames(authors: any[]): string {
    if (!authors || authors.length === 0) {
      return 'No authors available';
    }
    return authors.map((author) => author.name).join(', ');
  }






  setBookStockToZero(): void {

if(this.livro.checkedOut > 0){
  alert('Não é possivel eliminar o livro, o livro atualmente está emprestado a '  + this.livro.checkedOut  +' users.');
}

else{


    if (confirm('Quer eliminar o livro?')) {
      this.bibliotecaService
        .updateBookStock(this.libraryId, this.livro.book.isbn, 0,0)
        .subscribe(
          (response) => {
            console.log('Livro Eliminado:', response);
            alert('Livro Eliminado.');
            this.livro.available + this.livro.checkedOut - this.livro.stock;

            this.router.navigateByUrl(`/livros/${this.libraryId}`);
          },
          (error) => {
            console.error('Erro ao eliminar o Livro:', error);
            alert('Erro ao eliminar o Livro. Tente novamente.');
          }

        );
      }
    }
  }

requestbook(isbn: string, libraryId: string): void {
  const userId = this.userId ;
  if (!userId) {
    alert('Por favor, selecione ou escreva o nome do utilizador antes de requisitar.');
    return;
  }
  this.router.navigate(['/detalhes', libraryId, isbn, 'checkout', userId]);
}

   loadReviews(isbn: string): void {
  this.isLoadingReviews = true;
  this.bibliotecaService.getReviews(isbn).subscribe(
    (reviews) => {
      this.reviews = reviews || [];
      this.isLoadingReviews = false;
      console.log('Reviews carregadas:', this.reviews);
    },
    (error) => {
      console.error('Erro ao carregar reviews:', error);
      this.reviews = [];
      this.isLoadingReviews = false;
    }
  );
}

  addReview(isbn: string, reviewText: string): void {
    if (!reviewText || reviewText.trim() === '') {
      
      return;
    }

    this.bibliotecaService.addReview(isbn, reviewText).subscribe(
      () => {
        this.loadReviews(isbn); 
      },
      
    );
  }
  

  

}
