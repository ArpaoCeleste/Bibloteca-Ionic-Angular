import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Biblioteca } from '../model/Biblioteca';

import { AppService } from '../app.service';
import { ViewportScroller } from '@angular/common';

import { FallbackImagePipe } from '../fallback-image.pipe';
import { FormsModule } from '@angular/forms';
import { IonItem, IonInput, IonButton, IonRow, IonCol, IonCard, IonCardContent, IonGrid } from '@ionic/angular/standalone';


@Component({
  selector: 'usar-biblioteca-route',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FallbackImagePipe,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,   
    IonRow,      
    IonCol,     
    IonCard,   
    IonCardContent, 
    IonGrid

  ],
  templateUrl: './usar-biblioteca-route.component.html',
  styleUrl: './usar-biblioteca-route.component.scss'
})
export class UsarBibliotecaRouteComponent{
  biblioteca:Biblioteca;
  userId:string='';
  livrosBiblioteca:any[] = [];


  @Input('selectedLibraryId') libraryId='';

  constructor(private bibliotecaService: BibliotecaServiceService, private route:ActivatedRoute, private appService: AppService,private viewportScroller: ViewportScroller,private router: Router) {
    this.biblioteca = {} as Biblioteca;
    this.appService.getUserId.subscribe(
      result => this.userId = result
    );

  }




  ngOnInit(): void {

    this.initBiblioteca();





  }



  private initBiblioteca() {
    const id = this.route.snapshot.paramMap.get('biblioteca');
    this.bibliotecaService.getCurrentLibrary(id).subscribe(
      (value) => {
        this.biblioteca = <Biblioteca>value;


        this.appService.setLibraryName(this.biblioteca.name);
      }
    );
    this.getBookLibrary(id);




  }




  getBookLibrary(id:string|null){

    if(id != null){

      this.bibliotecaService.getBookLibrary(id).subscribe((value) => {

        this.livrosBiblioteca = (<any>value).filter(
          (livro: any) => livro.available > 0
        );
      });


  }
  }






 

  getAuthorNames(authors: any[]): string {
    return authors.map(author => author.name).join(', ');
  }

  goToLivroDetalhe(isbn: any){
    let url = '/detalhes/' + this.biblioteca.id + '/' + isbn;
    this.router.navigateByUrl(url);
  }


  deleteBiblioteca() {
  if (confirm('Tens a certeza que queres eliminar esta biblioteca?')) {
    this.bibliotecaService.deleteLibrary(this.biblioteca.id).subscribe({
      next: () => {
        alert('Biblioteca eliminada com sucesso!');
        this.router.navigateByUrl('/'); 
      },
      error: () => alert('Erro ao eliminar biblioteca.')
    });
  }

}

updateBiblioteca() {
  if (!this.biblioteca.id) {
    return;
  }
  const bibliotecaParaEnviar = {
    ...this.biblioteca,
    openTime: this.biblioteca.openTime.length === 5 ? this.biblioteca.openTime + ':00' : this.biblioteca.openTime,
    closeTime: this.biblioteca.closeTime.length === 5 ? this.biblioteca.closeTime + ':00' : this.biblioteca.closeTime
  };

  this.bibliotecaService.updateLibrary(this.biblioteca.id, bibliotecaParaEnviar).subscribe({
        next: () => {
      alert('Biblioteca atualizada com sucesso!');
      this.toggleEditForm();
    },
    
    error: (err) => alert('Erro ao atualizar biblioteca: ' + (err?.message || ''))
  });
}

showEditForm = false;

toggleEditForm() {
  this.showEditForm = !this.showEditForm;
}

}

