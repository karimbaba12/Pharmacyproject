import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm?: any;
  datenow: Date;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.datenow = new Date();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      // Call the authentication service's login method

      if (this.authService.login(username, password)) {
        this.toastr.success('welcome to your website', 'success'),
          {
            timeOut: 3000,
          };
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('username does not match', 'error');
      }
    }
  }
}
