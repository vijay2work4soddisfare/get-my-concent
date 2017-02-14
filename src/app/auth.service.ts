import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
  isLoggedIn: boolean = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): boolean {
    this.isLoggedIn = false;
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}