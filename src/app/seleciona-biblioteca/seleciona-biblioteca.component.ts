import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Biblioteca } from '../model/Biblioteca';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {  IonTitle, IonContent, IonButton,IonCard,IonCardContent } from '@ionic/angular/standalone';
@Component({
  selector: 'seleciona-biblioteca',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    IonTitle, 
    IonContent, 
    IonButton,
    
    IonCard,
    IonCardContent,
   

  ],
  templateUrl: './seleciona-biblioteca.component.html',
  styleUrl: './seleciona-biblioteca.component.scss'
})
export class SelecionaBibliotecaComponent implements OnInit{
  currentPage = 1;
  libraries: Biblioteca[]=[];
  @Output() updateBibioteca = new EventEmitter <string> ();

  constructor(private biblioService: BibliotecaServiceService, private router: Router ,private appService: AppService ) {}

  ngOnInit(): void {
    this.biblioService.getLibraries().subscribe(value => this.libraries = value);
    
  }

  
  goToCriarBiblioteca() {
  this.router.navigateByUrl('/criarlibraria');   
 }

  goToBibiloteca(biblioId: any){
    
    let url = '/biblio/' + biblioId;

    const selectedLibrary = this.libraries.find(lib => lib.id === biblioId);
    if (selectedLibrary) {
      
      this.appService.setLibraryName(selectedLibrary.name);
      this.appService.setLibraryAdress(selectedLibrary.address);

    this.updateBibioteca.emit(biblioId);
    this.router.navigateByUrl(url);
  }
  
}


}
