import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonHeader, IonToolbar,  IonContent,IonRow,IonCol,IonGrid} from '@ionic/angular/standalone';
@Component({
  selector: 'app-detalhespesquisa',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FallbackImagePipe,
    NgxPaginationModule,
     IonHeader, 
    IonToolbar, 
  
    IonContent, 
  
    IonRow,
    IonCol,
    
    IonGrid,
  
  ],
  templateUrl: './detalhespesquisa.component.html',
  styleUrl: './detalhespesquisa.component.scss'
})
export class DetalhespesquisaComponent implements OnInit {
  livro: any = {};
     reviews: any[] = [];
 
  

  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaServiceService,
    private router: Router
  ) {

    const navigation = this.router.getCurrentNavigation();

    const state = navigation?.extras?.state as { livro?: any };
    if (state && state.livro) {

      this.livro = state.livro;
    } else {

    }

  }



  ngOnInit(): void {
    console.log('this.livro at the start of ngOnInit:', JSON.stringify(this.livro, null, 2));

    let isbnToLoad: string | undefined = undefined;


    if (this.livro && Object.keys(this.livro).length > 0) {

      if (typeof this.livro.isbn === 'string' && this.livro.isbn.trim() !== '') {
        isbnToLoad = this.livro.isbn;
      }

      else if (this.livro.book && typeof this.livro.book.isbn === 'string' && this.livro.book.isbn.trim() !== '') {
        isbnToLoad = this.livro.book.isbn;
      }

    }

  }

  getAuthorNames(authors: any[]): string {
    if (!authors || authors.length === 0) {
      return 'No authors available';
    }
    return authors.map((author) => author.name).join(', ');
  }


   
}
