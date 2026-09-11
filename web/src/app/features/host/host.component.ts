import { Component, computed, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HostStateService } from './hostState.service'
import { HostDTO } from './host.dto'
import { HeaderComponent } from '../header/header.component'
import { map } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'
import { HostService } from './host.service'
import { Button } from '@openng/optimus-ui/button'

@Component({
	imports: [HeaderComponent, Button],
	selector: 'app-host',
	templateUrl: './host.component.html',
})
export class HostComponent {
	private route = inject(ActivatedRoute)
	private router = inject(Router)
	private hostStateService = inject(HostStateService)
	private hostService = inject(HostService)
	protected newToken = signal<string>('')
	private hostId = toSignal(
		this.route.paramMap.pipe(
			map(params => Number(params.get('id'))),
		),
		{ initialValue: 0 },
	)

	protected host = computed(() => {
		return this.hostStateService.getHostByID(this.hostId())
	})

  

	generateToken() {
		this.hostService.generateToken(this.host()?.id || 0).subscribe({
			next: (d) => {
				this.newToken.set(d.token)
			},
		})
	}
}
