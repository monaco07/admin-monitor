import { computed, inject, Service, signal } from '@angular/core'
import { UserDTO } from '../../core/user.interface'
import { HttpClient } from '@angular/common/http'
import { catchError, of, tap } from 'rxjs'

@Service()
export class AuthService {
  private http = inject(HttpClient)
  private user = signal<UserDTO | null>(null)
  readonly currentUser = this.user.asReadonly()

  readonly isAuthenticated = computed(() => this.user() !== null)

  loadUser() {
    return this.http.get<UserDTO>('/api/v1/auth/me', { withCredentials: true }).pipe(
      tap((user) => this.user.set(user)),
      catchError(() => {
        this.user.set(null)
        return of(null)
      }),
    )
  }
  login(username: string, password: string) {
    return this.http
      .post<UserDTO>(
        '/api/v1/auth/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((user) => this.user.set(user)),
        catchError(() => {
          this.user.set(null)
          return of(null)
        }),
      )
  }

  logout() {
    this.http
      .get('/api/v1/auth/logout', {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.user.set(null)
        },
      })
  }
}
