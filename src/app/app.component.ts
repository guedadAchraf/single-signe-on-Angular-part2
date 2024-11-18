import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './service/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'weber';
  isAuthenticated = false;


  constructor(private router: Router,private route: ActivatedRoute ,private authService: AuthService) {}

  token!: string;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token'); // Get the 'token' from the URL query parameters
  
      if (token) {
        this.token = token;
        console.log('Token retrieved:', this.token); // Display the token
      } else {
        console.error('No token found'); // Log an error only when the token is missing
      }
    });
  }
  
  



// Helper function to parse query parameters
 





  





































}

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

