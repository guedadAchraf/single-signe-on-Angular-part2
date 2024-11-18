import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      // Check if the user is authenticated
      const isAuthenticated = await this.keycloakService.isLoggedIn();

      if (!isAuthenticated) {
        // Redirect to Keycloak login if not authenticated
        await this.keycloakService.login();
        return false;
      }

      // Obtain the token
      const token = await this.keycloakService.getToken();

      // Store the token in session storage
      sessionStorage.setItem('authToken', token);

      // Log the token (remove this in production for security reasons)
      console.log('User token:', token);

      // Allow route activation
      return true;
    } catch (error) {
      console.error('AuthGuard error:', error);

      // Redirect to an error page or fallback route
      this.router.navigate(['/error']);
      return false;
    }
  }
}
