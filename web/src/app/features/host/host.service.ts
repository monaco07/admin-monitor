import { HttpClient } from '@angular/common/http'
import { Host, inject, Service } from '@angular/core'
import { tap } from 'rxjs'
import { HostDTO, UpdatedAPITokenDTO } from './host.dto'

@Service()
export class HostService {
	private http = inject(HttpClient)
	createHost(hostname: string, description: string | null) {
		return this.http.post(
			'/api/v1/host',
			{
				hostname: hostname,
				description: description,
			},
			{
				withCredentials: true,
			},
		)
	}

	getHosts() {
		return this.http.get<HostDTO[]>('/api/v1/host', {
			withCredentials: true,
		})
	}

	generateToken(hostID: number){
		return this.http.post<UpdatedAPITokenDTO>('/api/v1/host/updateToken', {"id": hostID}, { withCredentials: true})
	}
}
