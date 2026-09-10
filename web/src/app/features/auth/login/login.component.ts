import { Component, inject, OnInit, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from '@openng/optimus-ui/button'
import { InputTextModule } from '@openng/optimus-ui/inputtext'
import { PasswordModule } from '@openng/optimus-ui/password'
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageModule } from '@openng/optimus-ui/message'

@Component({
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  loginError = signal(false)

  readonly loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  ngOnInit(): void {
    const logoutParam = this.route.snapshot.queryParamMap.get('logout')

    if (this.authService.isAuthenticated()) {
      if (logoutParam === 'true') {
        this.authService.logout()
      } else {
        this.router.navigate(['/'])
      }
    }
  }

  async submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    // Alten Login-Fehler entfernen
    this.loginError.set(false)

    const credentials = this.loginForm.getRawValue()

    this.authService.login(credentials.username, credentials.password).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: () => {
        this.loginError.set(true)
      },
    })
  }
}
