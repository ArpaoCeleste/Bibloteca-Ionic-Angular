import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../model/Biblioteca';
import { AppService } from '../app.service';
import { ViewportScroller } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FallbackImagePipe } from '../fallback-image.pipe';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton,IonCard,IonCardContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-livrospage',
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FallbackImagePipe,
    FormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
     IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
  
    IonInput, 
    IonButton,
   
    IonCard,
    IonCardContent,
   
  ],
  templateUrl: './livrospage.component.html',
  styleUrl: './livrospage.component.scss',
})
export class LivrospageComponent implements OnInit {
  bibliotecaId: string = '';
  
  searchQuery: string = '';
  

  currentPage = 1;
  biblioteca: Biblioteca;
  userId: string = '';
  livrosBiblioteca: any[] = [];
  filteredBooks: any[] = [];
  selectedGenre: string = '';
  selectedAuthor: string = '';
  genres: string[] = [];
  authors: string[] = [];

  @Input('selectedLibraryId') libraryId = '';

  constructor(
    private bibliotecaService: BibliotecaServiceService,
    private route: ActivatedRoute,
    private appService: AppService,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.biblioteca = {} as Biblioteca;
    this.appService.getUserId.subscribe((result) => (this.userId = result));
  }

  ngOnInit(): void {



    const isbn = this.route.snapshot.paramMap.get('isbn');
    const bibliotecaId = this.route.snapshot.paramMap.get('bibliotecaId');

    if (isbn) {
      this.router.navigate(['/detalhes', bibliotecaId, isbn]);
    }

    if (bibliotecaId) {
      this.bibliotecaId = bibliotecaId;
    }

    this.bibliotecaService
      .getCurrentLibrary(bibliotecaId)
      .subscribe((value) => {
        this.biblioteca = <Biblioteca>value;

        this.appService.setLibraryName(this.biblioteca.name);
      });
    this.getBookLibrary(bibliotecaId);
  }

 

  getBookLibrary(id: string | null): void {
    if (id != null) {
      this.bibliotecaService.getBookLibrary(id).subscribe((value) => {
        this.livrosBiblioteca = (<any>value).filter(
          (livro: any) => (livro.available ?? 0) > 0
        );
        this.filterBooks();

        this.genres = [
          ...new Set(
            this.livrosBiblioteca
              .map((livro) => livro.book?.subjects?.[0])
              .filter((subject) => subject)
          ),
        ];
      });
    }
  }

  goToLivroDetalhe(isbn: any) {
    let url = '/detalhes/' + this.biblioteca.id + '/' + isbn;
    this.router.navigateByUrl(url);
  }
  gotoAddBook(): void {
    if (!this.biblioteca || !this.biblioteca.id) {
      console.error('ID da biblioteca não está definido.');
      return;
    }
    console.log('ID da biblioteca:', this.biblioteca.id);
    const url = '/add-book/' + this.biblioteca.id;
    this.router.navigateByUrl(url);
  }

  getAuthorNames(authors: any[]): string {
    if (!authors || authors.length === 0) {
      return 'No authors available';
    }
    return authors.map((author) => author.name).join(', ');
  }

  ngOnChanges(): void {
    this.filterBooks();
  }
  filterBooks(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredBooks = this.livrosBiblioteca.filter((livro) => {
      const matchesGenre =
        this.selectedGenre === '' ||
        livro.book?.subjects?.includes(this.selectedGenre);

      const matchesSearchQuery =
        query === '' ||
        livro.book.title.toLowerCase().includes(query) ||
        livro.book.isbn.toLowerCase().includes(query) ||
        livro.book.authors.some((author: { name: string }) =>
          author.name.toLowerCase().includes(query)
        );

      const hasStock = (livro.available ?? 0) > 0;

      return matchesGenre && matchesSearchQuery && hasStock;
    });

    this.currentPage = 1;
  }

  isFilterMenuVisible = false;

  toggleFilterMenu(): void {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.filterBooks();
    this.isFilterMenuVisible = false;
  }
}
