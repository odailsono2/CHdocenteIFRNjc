import { Component } from '@angular/core';
import { TableComponent } from './TableComponent/TableComponent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  template: `
    <div>
      <h1>Tabela</h1>
      <app-table></app-table>
      <!-- <app-json-table [jsonData]="data"></app-json-table> -->
    </div>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Tabela'
}
