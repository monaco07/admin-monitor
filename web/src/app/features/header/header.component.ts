import { Component, effect, inject, OnInit, signal } from '@angular/core'
import { MenuItem } from '@openng/optimus-ui/api'
import { MenubarModule } from '@openng/optimus-ui/menubar'
import { DynamicDialogModule } from '@openng/optimus-ui/dynamicdialog'
import { DialogService, DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog'
import { ButtonModule } from '@openng/optimus-ui/button'
import { CreateHostComponent } from '../host/create/create-host.component'
import { HostService } from '../host/host.service'
import { HostStateService } from '../host/hostState.service'
import { HostDTO } from '../host/host.dto'
@Component({
	imports: [MenubarModule, DynamicDialogModule],
	selector: 'app-header',
	templateUrl: './header.component.html',
	providers: [DialogService],
})
export class HeaderComponent {
	ref: DynamicDialogRef<CreateHostComponent> | undefined
	items = signal<MenuItem[]>([
		{
			label: 'Home',
			icon: 'pi pi-home',
		},
		{
			label: 'Host',
			icon: 'pi pi-server',
			items: [],
		},
		{
			label: 'ausklappbar',
			icon: 'pi pi-search',
			items: [
				{
					label: 'Components',
					icon: 'pi pi-bolt',
				},
			],
		},
		{
			label: 'Signout',
			icon: 'pi pi-sign-out',
			styleClass: 'contact-item',
			routerLink: '/login',
			queryParams: { logout: true },
		},
	])
	private dialogService = inject(DialogService)
	private hostStateService = inject(HostStateService)
	constructor() {
		effect(() => {
			const hosts = this.hostStateService.hosts()

			if (hosts.length === 0) {
				return
			}

			this.loadMenuTab(hosts)
		})
	}
	loadMenuTab(hosts: HostDTO[]) {
		this.items.update((items) => {
			return items.map((item, index) => {
				if (index !== 1) {
					return item
				}

				return {
					...item,
					items: [
						{
							label: 'Host Erstellen',
							styleClass: 'host_create',
							command: () => this.openCreatePopUp(),
						},
						...hosts.map((host) => ({
							label: host.hostname,
							routerLink: `host/${host.id}`,
						})),
					],
				}
			})
		})
	}

	openCreatePopUp() {
		this.ref =
			this.dialogService.open(CreateHostComponent, {
				modal: true,
				closeOnEscape: true,
				dismissableMask: true,
				// TODO closeOnEscape und dismissableMask funktionieren nicht
				draggable: false,
			}) || undefined
	}
}
