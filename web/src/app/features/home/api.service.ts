import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import { TestData } from '../../core/data.interface'

@Service()
export class ApiService {
    private http = inject(HttpClient)

    getTestData(){
        return this.http.get<TestData>("/api/test")
    }
}

