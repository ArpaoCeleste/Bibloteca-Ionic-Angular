import { Component, OnInit, OnDestroy } from '@angular/core';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { RouterModule } from '@angular/router';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton,IonCard,IonCardContent} from '@ionic/angular/standalone';
@Component({
  selector: 'app-userlivros',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,FallbackImagePipe,NgxPaginationModule,
 IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton,
    IonCard,
    IonCardContent,
  
  ],
  templateUrl: './userlivros.component.html',
  styleUrl: './userlivros.component.scss',
})

export class UserlivrosComponent {
  currentPage = 1;
  
  isbn: string = '';
  userId: string = '';

  livrosRequisitados: any[] = [];
  libraryId: string = '';
  errorMessage: string = '';

   private routeSub: Subscription | undefined;
  private userGlobalSub: Subscription | undefined;


  constructor(
    private appService: AppService,
    private bibliotecaService: BibliotecaServiceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
 this.appService.getUserId.subscribe((userId) => {
  this.userId = userId;
});
  }





  ngOnInit() {
  this.routeSub = this.route.paramMap.subscribe(params => {
    const userIdDaRota = params.get('userId');
    if (userIdDaRota) {
      this.userId = userIdDaRota;
      this.fetchRequisitados();
    } else {
      const storedUser = localStorage.getItem('userName');
      if (storedUser) {
        this.userId = storedUser;
        this.fetchRequisitados();
      }
    }
  });

   this.userGlobalSub = this.appService.getUserId.subscribe(userIdGlobal => {
  
  if (
    userIdGlobal &&
    (!this.userId || this.userId === userIdGlobal) &&
    this.router.url.startsWith('/userlivros')
  ) {
    this.router.navigate(['/userlivros', userIdGlobal]);
  }
});
  }

    ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.userGlobalSub) {
      this.userGlobalSub.unsubscribe();
    }
  }

  selectBook(livro: any): void {
    this.libraryId = livro.libraryId;
    this.isbn = livro.bookId;

  }


  saveUserName() {

    this.fetchRequisitados();
  }

  fetchRequisitados() {
    this.bibliotecaService.getCheckedOutBooks(this.userId).subscribe(
      (data) => {
        console.log('Dados retornados pela API:', data);


        this.livrosRequisitados = data.filter((livro: any) => !livro.returnDate);


        console.log('Livros requisitados filtrados:', this.livrosRequisitados);
      },
      (error) => {
        console.error('Erro ao buscar livros requisitados:', error);
        this.errorMessage = 'Erro ao carregar os livros requisitados. Tente novamente mais tarde.';
      }
    );
  }
  checkinBook(livro: any): void {
    const libraryId = this.formatUUID(livro.libraryId);
    const isbn = livro.bookId;
    const userId = this.userId;
    if (!isbn || !libraryId || !userId) {
      alert('Erro: Dados do livro ou do usuário estão incompletos.');
      return;
    }

    this.bibliotecaService.checkinBook(libraryId, isbn, userId).subscribe(
      () => {
        alert('Livro devolvido com sucesso!');
        livro.returnDate = new Date().toISOString();
        console.log('Check-in realizado com sucesso para o userId:', userId);



        this.fetchRequisitados();


        this.router.navigate(['/historico', userId]);
      },
      (error) => {
        console.error('Erro ao devolver o livro:', error);
        alert('Erro ao devolver o livro. Tente novamente mais tarde.');
      }
    );
  }
 

  isLate(returnDate: string): boolean {
    const today = new Date();
    const dueDate = new Date(returnDate);
    return dueDate < today;
  }

goToLivroDetalhe(isbn: string, libraryId: string): void {
  if (!isbn || !libraryId) {
    alert('Dados do livro incompletos.');
    return;
  }
  const formattedLibraryId = this.formatUUID(libraryId);
  const url = `/detalhes/${formattedLibraryId}/${isbn}`;
  this.router.navigateByUrl(url);
}
  formatUUID(libraryId: string): string {
    if (libraryId.includes('-')) {

      return libraryId;
    }


    return `${libraryId.substring(0, 8)}-${libraryId.substring(8, 12)}-${libraryId.substring(12, 16)}-${libraryId.substring(16, 20)}-${libraryId.substring(20)}`;
  }

}
