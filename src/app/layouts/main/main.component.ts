import { Component, HostListener} from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavMainComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  showBtn: boolean = false;
  toTopView():void {
    window.scrollTo(0, 0)
  }
  @HostListener('window:scroll') ToggleBtn() {
    let offset = document.documentElement.scrollTop
    if (offset > 100) {
      this.showBtn = true
    } else {
      this.showBtn = false
    }
  }
}
