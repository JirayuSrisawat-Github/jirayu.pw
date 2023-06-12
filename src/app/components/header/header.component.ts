import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  transparent: boolean = true;
  _open: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.transparent =
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) <= 150;
  }
}
