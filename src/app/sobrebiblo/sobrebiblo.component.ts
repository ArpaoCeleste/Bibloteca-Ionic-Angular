import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../model/Biblioteca';

import { AppService } from '../app.service';
import { ViewportScroller } from '@angular/common';

import { IonHeader, IonToolbar, IonTitle, IonContent,IonRow,IonCol,IonGrid } from '@ionic/angular/standalone';
@Component({
  selector: 'app-sobrebiblo',
  imports: [CommonModule,
    RouterModule,
     IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonRow,
    IonCol,
    IonGrid
    ],
  templateUrl: './sobrebiblo.component.html',
  styleUrl: './sobrebiblo.component.scss'
})
export class SobrebibloComponent {

  
  mapUrl: string = '';
  biblioteca:Biblioteca;
  
  livrosBiblioteca:any[] = [];

  
constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService,private viewportScroller: ViewportScroller,private router: Router) {
  this.biblioteca = {} as Biblioteca;
 
}

  ngOnInit(): void {
    this.initBiblioteca();

   

  }

  
  private initBiblioteca() {
    const id = this.route.snapshot.paramMap.get('biblioteca');
    
    if (!id) {
      console.error('ID da biblioteca não foi fornecido na rota.');
      
      alert('Erro: ID da biblioteca não foi encontrado.');
      return;
    }
  
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      (value) => {
        this.biblioteca = <Biblioteca>value;
        this.appService.setLibraryName(this.biblioteca.name);
      },
      (error) => {
        console.error('Erro ao buscar detalhes da biblioteca:', error);
        alert('Erro ao carregar os detalhes da biblioteca.');
      }
    );
  

  

    this.getBookLibrary(id);
    console.log(' biblioteca:', this.biblioteca);
  }

  
  
    getBookLibrary(id:string|null){
      if(id != null){
  
        this.bibliotecaService.getBookLibrary(id).subscribe((value) => {
          
          this.livrosBiblioteca = (<any>value).filter((livro: any) => livro.available > 0);
        });
    }
    }
  
  
    getAuthorNames(authors: any[]): string {
      return authors.map(author => author.name).join(', ');
    }
  

}
