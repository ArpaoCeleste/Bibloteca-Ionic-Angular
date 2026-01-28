import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliotecaServiceService } from '../biblioteca-service.service';
import { AppService } from '../app.service'; 
import { Subscription } from 'rxjs'; 
import { CommonModule } from '@angular/common';


import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton,IonTextarea, IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-comentario',
  standalone: true,
  imports: [ CommonModule, IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton,
      IonTextarea,  
    IonCheckbox,  
  
ReactiveFormsModule],
  templateUrl: './add-comentario.component.html',
  styleUrl: './add-comentario.component.scss'
})
export class AddComentarioComponent implements OnInit, OnDestroy { 
  reviewForm!: FormGroup;
  isbn!: string;
  bibliotecaId: string | null = null;
  private userIdSubscription: Subscription = new Subscription(); 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaServiceService,
    private router: Router,
    private appService: AppService 
  ) {
    this.reviewForm = this.fb.group({
      review: ['', Validators.required],
      recommended: [true],
      userId: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('isbn')!;
    
    this.bibliotecaId = this.route.snapshot.paramMap.get('bibliotecaId'); 

    this.userIdSubscription = this.appService.getUserId.subscribe((userIdFromService: string) => {
      if (this.reviewForm.get('userId')?.pristine) { 
        this.reviewForm.patchValue({ userId: userIdFromService });
      }
    });
  }

  ngOnDestroy(): void { 
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.isbn) {
      const reviewData = {
        review: this.reviewForm.value.review,
        recommended: this.reviewForm.value.recommended,
        reviewer: this.reviewForm.value.userId 
      };
      console.log('Enviando review:', this.isbn, reviewData);
       this.bibliotecaService.addReview(this.isbn, reviewData).subscribe(
        (response) => {
        
          alert('Obrigado pela sua opinião!');
          
          if (this.bibliotecaId) { 
            this.router.navigate(['/detalhes', this.bibliotecaId, this.isbn]);
          } else {
            this.router.navigate(['/livros', this.isbn]); 
          }
        },
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
