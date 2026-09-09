import { Component, OnInit } from '@angular/core'
import { MenuItem } from '@openng/optimus-ui/api'
import { MenubarModule } from '@openng/optimus-ui/menubar'

@Component({
  imports: [MenubarModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
              },
            ],
          },
        ],
      },
      {
        label: 'Signout',
        icon: 'pi pi-sign-out',
        styleClass: 'contact-item',
        routerLink: "/login",
        queryParams: { logout: true}
      },
    ]
  }
}
