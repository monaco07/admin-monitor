import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideOptimus } from '@openng/optimus-ui/config'
import Aura from '@openng/optimus-ui-themes/aura'
import { AuthService } from './features/auth/auth.service'
import { firstValueFrom } from 'rxjs'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideOptimus({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),

    provideAppInitializer(() => {
      const authService = inject(AuthService)
      return firstValueFrom(authService.loadUser())
    }),
  ],
}
