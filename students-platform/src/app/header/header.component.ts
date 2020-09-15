import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isUserAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  public onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
