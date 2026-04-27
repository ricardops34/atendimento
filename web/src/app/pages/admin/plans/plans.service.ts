import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private http = inject(HttpClient);
  private coreService = inject(CoreService);

  getOptions() {
    return this.http.get<any[]>(`${this.coreService.apiUrl}/plans`).pipe(
      map(plans => plans.map(plan => ({
        label: plan.name,
        value: plan.id
      })))
    );
  }
}
