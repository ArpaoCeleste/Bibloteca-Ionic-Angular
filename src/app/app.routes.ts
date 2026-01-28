import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




export const routes: Routes = [
  { path: '', redirectTo: '/selecionaBiblioteca', pathMatch: 'full' },
  {
    path: 'selecionaBiblioteca',
    loadComponent: () =>
      import('./seleciona-biblioteca/seleciona-biblioteca.component').then(
        (m) => m.SelecionaBibliotecaComponent
      ),
  },



  {
    path: 'biblio/:biblioteca',
    loadComponent: () =>
      import('./usar-biblioteca-route/usar-biblioteca-route.component').then(
        (m) => m.UsarBibliotecaRouteComponent
      ),
  },
  {
    path: 'livros/:bibliotecaId',
    loadComponent: () =>
      import('./livrospage/livrospage.component').then(
        (m) => m.LivrospageComponent
      ),
  },
  {
    path: 'detalhes/:bibliotecaId/:isbn',
    loadComponent: () =>
      import('./livrodetalhe/livrodetalhe.component').then(
        (m) => m.LivrodetalheComponent
      ),
  },
  {
    path: 'detalhes/:bibliotecaId/:isbn/checkout/:userId',
    loadComponent: () =>
      import('./requisitarlivro/requisitarlivro.component').then(
        (m) => m.RequisitarlivroComponent
      ),
  },
  {
    path: 'add-book/:bibliotecaId',
    loadComponent: () =>
      import('./add-book/add-book.component').then((m) => m.AddBookComponent),
  },
  {
    path: 'sobrebiblo/:biblioteca',
    loadComponent: () =>
      import('./sobrebiblo/sobrebiblo.component').then(
        (m) => m.SobrebibloComponent
      ),
  },
  {
    path: 'userlivros/:userId',
    loadComponent: () =>
      import('./userlivros/userlivros.component').then(
        (m) => m.UserlivrosComponent
      ),
  },
  {
    path: 'historico/:userId',
    loadComponent: () =>
      import('./historico-livros/historico-livros.component').then(
        (m) => m.HistoricoLivrosComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search-results/search-results.component').then(
        (m) => m.SearchResultsComponent
      ),
  },
  {
    path: 'detalhespesquisa',
    loadComponent: () =>
      import('./detalhespesquisa/detalhespesquisa.component').then(
        (m) => m.DetalhespesquisaComponent
      ),
  },
  {
    path: 'adicionar-comentario/:bibliotecaId/:isbn',
    loadComponent: () =>
      import('./add-comentario/add-comentario.component').then(
        (m) => m.AddComentarioComponent
      ),
  },
  {
   path: 'adicionar-comentario/:isbn',
    loadComponent: () =>
      import('./add-comentario/add-comentario.component').then(
        (m) => m.AddComentarioComponent
      ),
  },
  {
    path: 'criarlibraria',
    loadComponent: () =>
      import('./criarlibraria/criarlibraria.component').then(
        (m) => m.CriarlibrariaComponent
      ),
  },
  { path: '**', redirectTo: '/selecionaBiblioteca' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      enableTracing: true 
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
