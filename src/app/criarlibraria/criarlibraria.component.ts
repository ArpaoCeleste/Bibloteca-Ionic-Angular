import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { Router} from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-criarlibraria',
  imports: [FormsModule, IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton,

  
  
  ],
  templateUrl: './criarlibraria.component.html',
  styleUrl: './criarlibraria.component.scss'
})


export class CriarlibrariaComponent {
  biblioteca = {
    name: '',
    address: '',
    openDays: '',
       openTime: '09:00',  
    closeTime: '18:00'   
  };

  erros: string[] = [];
  constructor(private bibliotecaService: BibliotecaServiceService, private router: Router) {}

criarBiblioteca() {
 

  const openTime = this.biblioteca.openTime ? this.biblioteca.openTime : '09:00';
  const closeTime = this.biblioteca.closeTime ? this.biblioteca.closeTime : '18:00';


  const bibliotecaParaEnviar = {
    ...this.biblioteca,
    openTime: openTime.length === 5 ? openTime + ':00' : openTime,
    closeTime: closeTime.length === 5 ? closeTime + ':00' : closeTime
  };

  this.bibliotecaService.createLibrary(bibliotecaParaEnviar).subscribe({
  next: () => {
    alert('Biblioteca criada com sucesso!');
    this.router.navigateByUrl('/');
  }
});
}
}