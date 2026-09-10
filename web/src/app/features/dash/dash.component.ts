import { Component, computed, effect, OnInit, signal } from '@angular/core'
import { FormsModule, NgModel } from '@angular/forms'
import { MessageModule } from '@openng/optimus-ui/message'
import { SelectModule } from '@openng/optimus-ui/select'
import { TabsModule } from '@openng/optimus-ui/tabs'
import { NgModule } from '@angular/core'

interface Device {
  id: string
  name: string
}

interface Statistic {
  id: string
  name: string
}

@Component({
  imports: [TabsModule, SelectModule, FormsModule],
  selector: 'app-dash',
  templateUrl: './dash.component.html',
})
export class DashComponent {
  devices = [
    { title: 'RPI', value: '0' },
    { title: 'VPS', value: '1'},
  ]
  statistics = [
    { title: 'CPU', value: '0'},
    { title: 'RAM', value: '1'},
    { title: 'DISK', value: '2' },
  ]

  selectedStatistic = signal('1')
  selectedDevice = signal('0')

  selection = computed(() => ({
    device: this.selectedDevice(),
    statistic: this.selectedStatistic(),
  }))

  constructor() {
    effect(() => {
      const device = this.selectedDevice()
      const statistic = this.selectedStatistic()

      console.log('Auswahl geändert:', device, statistic)

      //this.loadDashboard(device, statistic);
    })
  }
}
