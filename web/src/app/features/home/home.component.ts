import { Component, inject, OnInit, signal, Signal } from '@angular/core'
import { ApiService } from './api.service'
import { HeaderComponent } from "../header/header.component";
import { DashComponent } from "../dash/dash.component";

@Component({
  imports: [HeaderComponent, DashComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  private apiService = inject(ApiService)

  protected data = signal("")

  ngOnInit(): void {
    console.log("INIT")
  }

}
