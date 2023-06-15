import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  menuVisivel = true;
  isMobile = false;

  @HostListener('window:resize', ['$event'])

  onWindowResize(event: any) {
    // Verifica se a tela saiu do modo mobile (largura maior que 768 pixels)
    if (event.target.innerWidth >= 768) {
      this.menuVisivel = true; // Exibe os links
      this.isMobile = false;
    } else if (event.target.innerWidth < 768 && !this.isMobile) {
      this.menuVisivel = false;
      this.isMobile = true;
    }
  }

  dropdownMenu(): void {
    this.menuVisivel = !this.menuVisivel;
  }
}
