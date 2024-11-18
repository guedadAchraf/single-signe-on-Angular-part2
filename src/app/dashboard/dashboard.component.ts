import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";
import Keycloak, {KeycloakInstance} from "keycloak-js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private keycloak!: KeycloakInstance;
  private readonly baseUrl = 'http://localhost:8080/auth';




  constructor(private router: Router , private authService: AuthService) {

    this.keycloak = new (Keycloak as any)({
      url: this.baseUrl,
      realm: 'my-sso-realm',
      clientId: 'achraf3-client'
    });

  }






  isAuthenticated = false;

  ngOnInit() {
    this.authService.isAuthenticatedUser().subscribe(
      auth => this.isAuthenticated = auth
    );
  }


}
