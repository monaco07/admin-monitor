import { Component, inject, OnInit, signal, Signal } from '@angular/core'
import { ApiService } from './api.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { TestData } from '../../core/data.interface'

@Component({
  imports: [],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  private apiService = inject(ApiService)

  protected data = signal("")

  ngOnInit(): void {
    this.apiService.getTestData().subscribe(
      {
        next: (res: TestData) => {
          this.data.set(res.test)
        }
      }
    )
  }

}
