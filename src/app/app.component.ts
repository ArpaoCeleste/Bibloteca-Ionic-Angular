import { Biblioteca } from './model/Biblioteca';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { IonHeader, IonContent,IonCol,IonRow,IonFooter} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
     IonHeader,
    IonContent
    ,IonCol,IonRow,
    IonFooter,
    
  

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService,],
})
export class AppComponent {

  userID: string = '';
  isInLibrary = false;
  title = 'biblioteca-client';
  bibliotecaName = 'Biblioteca Client';
  bibliotecaAddress = 'Default Address';
  selectedUser = 'Wonderful User';
  searchQuery: string = '';
  navbarOpen = false;
  options = [
    { label: 'Wonderful User', value: 'Wonderful User' },
    { label: 'TWAM', value: 'TWAM' },
    { label: 'Outro', value: 'outro' }
  ];

  bibliotecaId: string | null = null;


  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

    this.appService.getUserId.subscribe((id) => {
      this.userID = id
    });


    this.appService.libraryName$.subscribe((name) => {
      this.bibliotecaName = name;
    });

    this.appService.libraryAdress$.subscribe((address) => {
      this.bibliotecaAddress = address;
    });

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
.subscribe(() => {
  const urlSegments = this.router.url.split('/');

  const isLibraryRoute =
    urlSegments.includes('biblio') ||
    urlSegments.includes('livros') ||
    urlSegments.includes('seleciona') ||
    urlSegments.includes('sobrebiblo') ||
    urlSegments.includes('detalhes') ||
    urlSegments.includes('add-book') ||
    urlSegments.includes('adicionar-comentario');

  this.bibliotecaId = isLibraryRoute
    ? urlSegments[
        urlSegments.indexOf(
          urlSegments.includes('biblio') ? 'biblio' :
          urlSegments.includes('livros') ? 'livros' :
          urlSegments.includes('detalhes') ? 'detalhes' :
          urlSegments.includes('add-book') ? 'add-book' :
          urlSegments.includes('adicionar-comentario') ? 'adicionar-comentario' :
    
          'sobrebiblo'
        ) + 1
      ]
    : null;

  this.isInLibrary = !!this.bibliotecaId;
});
  }
  updateUser(): void {
    this.userID = this.selectedUser;
    this.appService.setUserId(this.userID);



  }

  resetBibliotecaName() {
    this.bibliotecaName = 'Biblioteca Client';

  }

  Bibliotecanameemail(name: string): string {
    if (!name) return '';
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase();
  }

  navigateToUserLivros(): void {
    if (this.userID) {
      this.router.navigate([`/userlivros/${this.userID}`]);
    } else {
      console.error('Erro: userID não está definido.');
    }
  }

  selectedLibraryAddress: string = '';

  updateLibraryInfo(address: string): void {

    this.selectedLibraryAddress = address;
  }

  ngOnInit(): void {

  
  }

  private selectedOptionSource = new BehaviorSubject<string>('');
  selectedOption$ = this.selectedOptionSource.asObservable();

  updateSelectedOption(option: string): void {
    this.selectedOptionSource.next(option);
  }



toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}

  onSearch() {
  if (this.searchQuery && this.searchQuery.trim().length > 0) {
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    this.searchQuery = '';
  }
}

  }


