import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  user = this.authService.user;
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(private authService: AuthService,
              private router: Router) { }

logout() {
  this.authService.logout().then(
    () => this.router.navigate(['/login'])
  );
}

toggleDrawer() {
  this.drawer.toggle();
  console.log(this.drawer);
}

}
