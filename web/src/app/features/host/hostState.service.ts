import { Host, inject, Service, signal } from '@angular/core'
import { HostDTO } from './host.dto'
import { HttpClient } from '@angular/common/http'
import { HostService } from './host.service'

@Service()
export class HostStateService {
    private hostService = inject(HostService)
	private _hosts = signal<HostDTO[]>([])
	private _isLoading = signal<boolean>(false)

	public readonly hosts = this._hosts.asReadonly()
	public readonly isLoading = this._isLoading.asReadonly()

	constructor() {
		this.reload()
	}

	reload(): void {
		if (this._isLoading()) {
			return
		}

		this._isLoading.set(true)
            this.hostService.getHosts()
			.subscribe({
				next: (hosts) => {
					this._hosts.set(hosts)
					this._isLoading.set(false)
				},
				error: (err) => {
					this._isLoading.set(false)
					console.error(err)
				},
			})
	}
	getHostByID(id: number): HostDTO | null{
		console.log("GET BY ID", id, this.hosts())
		return this.hosts().find(h => h.id === id) || null
	}
}
