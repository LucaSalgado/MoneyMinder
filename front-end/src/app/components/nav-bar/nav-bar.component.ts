import { Component, HostListener, OnInit } from '@angular/core';
import { MenuVisivelService } from 'src/app/services/menuVisivel/menu-visivel.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menuVisivel = true;
  isMobile = false;

  constructor(private menuVisivelService: MenuVisivelService) {}

  ngOnInit() {
    this.updateMenuVisivelState();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.updateMenuVisivelState();
  }

  private updateMenuVisivelState() {
    if (window.innerWidth >= 768) {
      this.menuVisivel = true;
      this.isMobile = false;
    } else {
      this.menuVisivel = false;
      this.isMobile = true;
    }
  }

  dropdownMenu(): void {
    this.menuVisivel = !this.menuVisivel;
    this.menuVisivelService.atualizarEstado(this.menuVisivel);
  }
}
