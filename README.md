# Book Searcher

<p align="center">
  <a href="#english">English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#portuguese">Português</a>
</p>

---

<div id="english">

## About

Book Searcher is a mobile application built with Ionic and Angular that allows users to search and browse books. The application provides an intuitive interface for discovering books with detailed information.

## Features

- Book search functionality
- Detailed book information display
- Responsive mobile-first design
- Cross-platform support (Android)
- Material Design components

## Technologies

### Frontend
- **Ionic** 8.0.0 - Mobile UI framework
- **Angular** 19.0.0 - JavaScript framework
- **Angular Material** - UI component library
- **Bootstrap** 5.3.6 - CSS framework
- **Font Awesome** - Icon library

### Mobile
- **Capacitor** 7.3.0 - Native runtime
- **Android** support

### Additional Libraries
- **RxJS** - Reactive programming
- **ngx-pagination** - Pagination component

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio (for Android development)

## Installation

1. Clone the repository
```bash
git clone https://github.com/ArpaoCeleste/book-searcher.git
cd book-searcher
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm start
```

The application will open at `http://localhost:8100`

## Building for Production

### Web
```bash
npm run build
```

### Android
```bash
npx cap sync android
npx cap open android
```

## Project Structure

```
book-searcher/
├── src/
│   ├── app/              # Application components
│   ├── assets/           # Static assets
│   ├── environments/     # Environment configurations
│   └── theme/            # Global styles
├── android/              # Android native project
└── www/                  # Production build output
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint code

## License

This project is licensed under the MIT License.

## Author

ArpaoCeleste

</div>

---

<div id="portuguese">

## Sobre

Book Searcher é uma aplicação móvel desenvolvida com Ionic e Angular que permite aos utilizadores procurar e explorar livros. A aplicação disponibiliza uma interface intuitiva para descobrir livros com informações detalhadas.

## Funcionalidades

- Funcionalidade de pesquisa de livros
- Apresentação detalhada de informações sobre livros
- Design responsivo mobile-first
- Suporte multi-plataforma (Android)
- Componentes Material Design

## Tecnologias

### Frontend
- **Ionic** 8.0.0 - Framework UI móvel
- **Angular** 19.0.0 - Framework JavaScript
- **Angular Material** - Biblioteca de componentes UI
- **Bootstrap** 5.3.6 - Framework CSS
- **Font Awesome** - Biblioteca de ícones

### Mobile
- **Capacitor** 7.3.0 - Runtime nativo
- Suporte para **Android**

### Bibliotecas Adicionais
- **RxJS** - Programação reativa
- **ngx-pagination** - Componente de paginação

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Android Studio (para desenvolvimento Android)

## Instalação

1. Clonar o repositório
```bash
git clone https://github.com/ArpaoCeleste/book-searcher.git
cd book-searcher
```

2. Instalar dependências
```bash
npm install
```

3. Executar servidor de desenvolvimento
```bash
npm start
```

A aplicação irá abrir em `http://localhost:8100`

## Build para Produção

### Web
```bash
npm run build
```

### Android
```bash
npx cap sync android
npx cap open android
```

## Estrutura do Projeto

```
book-searcher/
├── src/
│   ├── app/              # Componentes da aplicação
│   ├── assets/           # Recursos estáticos
│   ├── environments/     # Configurações de ambiente
│   └── theme/            # Estilos globais
├── android/              # Projeto nativo Android
└── www/                  # Output do build de produção
```

## Scripts Disponíveis

- `npm start` - Iniciar servidor de desenvolvimento
- `npm run build` - Fazer build para produção
- `npm test` - Executar testes unitários
- `npm run lint` - Verificar código

## Licença

Este projeto está licenciado sob a Licença MIT.

## Autor

ArpaoCeleste

</div>
