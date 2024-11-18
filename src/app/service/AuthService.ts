import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak!: KeycloakInstance;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly baseUrl = 'http://localhost:8080/auth';

  constructor(private router:Router,private keycloakService:KeycloakService
  , private route: ActivatedRoute) {
    this.keycloak = new (Keycloak as any)({
      url: 'http://localhost:8080/auth',
      realm: 'my-sso-realm',
      clientId: 'achraf2-client'
    });
  }

  public init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.keycloak
          .init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            pkceMethod: 'S256',
            checkLoginIframe: false,
            enableLogging: true,
            redirectUri: window.location.origin + '/dashboard',
            flow: 'standard',
            scope: 'openid profile email',
            responseMode: 'fragment'
          })
          .then((authenticated) => {
            this.isAuthenticated.next(authenticated);
            if (!authenticated) {
              this.login();
            }
            resolve(authenticated);
          })
          .catch((error) => {
            console.error('Keycloak init error:', error);
            reject(error);
          });
      } catch (error) {
        console.error('Keycloak init error:', error);
        reject(error);
      }
    });
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(): Promise<void> {
    return this.keycloak.login({
      redirectUri: window.location.origin + '/dashboard'
    });
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  redirectToApp(url: string): void {
    if (this.keycloak.authenticated) {
      const token = this.keycloak.token;
      window.location.href = `${url}/dashboard?token=${token}`;
    } else {
      window.location.href = url;
    }
  }






  async handleAuthCallback() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      // Store token securely (e.g., in session storage)
      sessionStorage.setItem('keycloak_token', token);
      
      // Update Keycloak instance with the new token
      await this.keycloakService.getKeycloakInstance().updateToken(30).then(() => {
        const token = this.keycloakService.getKeycloakInstance().token;
        console.log('Updated token:', token);
      }).catch((err) => {
        console.error('Failed to refresh token', err);
      })
      
      // Redirect to main page without token in URL
      window.location.href = 'http://localhost:4202/dashboard';
    }
  }




}































  


