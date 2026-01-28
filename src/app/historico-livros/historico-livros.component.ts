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
import { BehaviorSubject } from 'rxjs';
import { Biblioteca } from '../model/Biblioteca';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton,IonCard,IonCardContent} from '@ionic/angular/standalone';

@Component({
  selector: 'app-historico-livros',
  imports: [CommonModule, RouterModule, FormsModule,NgxPaginationModule, IonHeader, 
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
  templateUrl: './historico-livros.component.html',
  styleUrl: './historico-livros.component.scss'
})
export class HistoricoLivrosComponent implements OnInit  {
  biblioteca: Biblioteca = {} as Biblioteca;
  currentPage = 1;
  errorMessage: string = '';
  livrosDevolvidos: any[] = [];
  userId: string = '';
  searchQuery: string = '';

constructor(
  private appService: AppService,
  private bibliotecaService: BibliotecaServiceService,
  private userService: UserService,
  private route: ActivatedRoute,
  private router: Router,





)
 {

 }


ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const userIdFromRoute = params.get('userId');
    if (userIdFromRoute) {
      this.userId = userIdFromRoute;
      this.fetchDevolvidos();
    } else {

      this.appService.getUserId.subscribe((userId) => {
        this.userId = userId;
        if (this.userId) {
          this.fetchDevolvidos();
        }
      });
    }
  });
}
  fetchDevolvidos(): void {
    this.bibliotecaService.getCheckoutHistory(this.userId).subscribe(
      (data) => {
        console.log('Dados retornados pela API:', data);

        this.livrosDevolvidos = data.map((livro: any) => {
  if (livro.dueDate) {
    livro.dueDate = new Date(livro.dueDate);
  }
  return livro;
});

        if (this.livrosDevolvidos.length === 0) {
          this.errorMessage = 'Nenhum livro devolvido encontrado.';
        } else {
          this.errorMessage = '';
        }
      },
      (error) => {
        console.error('Erro ao buscar livros devolvidos:', error);
        this.errorMessage = 'Erro ao carregar os livros devolvidos. Tente novamente mais tarde.';
      }
    );
  }


  goToLivroDetalhe(isbn: string, libraryId: string): void {
    const formattedLibraryId = this.formatUUID(libraryId);
    console.log('ISBN recebido:', isbn);
    console.log('Library ID formatado:', formattedLibraryId);

    if (!isbn) {
      console.error('ISBN não está definido.');
      return;
    }

    if (!formattedLibraryId) {
      console.error('Library ID não está definido.');
      return;
    }

    const url = `/detalhes/${formattedLibraryId}/${isbn}`;
    console.log('Navegando para URL:', url);
    this.router.navigateByUrl(url);
  }

formatUUID(libraryId: string): string {
  if (libraryId.includes('-')) {
    return libraryId;
  }

  return `${libraryId.substring(0, 8)}-${libraryId.substring(8, 12)}-${libraryId.substring(12, 16)}-${libraryId.substring(16, 20)}-${libraryId.substring(20)}`;
}
}
