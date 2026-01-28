import { Component, OnInit } from '@angular/core';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent,IonCard,IonCardContent } from '@ionic/angular/standalone';
@Component({
    imports: [
    CommonModule,
    NgxPaginationModule,
    FallbackImagePipe,
   RouterModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard,
    IonCardContent,
    


    ],
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
   styleUrl: './search-results.component.scss',
   
})
export class SearchResultsComponent implements OnInit {
  livros: any[] = [];
   currentPage = 1;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.bibliotecaService.searchBooksGlobal(this.query).subscribe((data: any) => {
          this.livros = data;
          console.log('Resultados da pesquisa:', this.livros);
        });
      }
    });
  }

goToLivroDetalhequerry(livroParaDetalhes: any) {
    this.router.navigate(['/detalhespesquisa'], { state: { livro: livroParaDetalhes } });

  }
}

