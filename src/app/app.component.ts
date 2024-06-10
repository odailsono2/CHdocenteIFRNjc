import { Component } from '@angular/core';
import { AppTHeadComponent } from './app-thead/app-thead.component';
import { Disciplinas , todasDisciplinas} from './intefaces/InterfaceDisciplina'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppTHeadComponent],
  template: `
    <div>
      <h1>Tabela</h1>
      <app-app-thead></app-app-thead>
      <!-- <app-json-table [jsonData]="data"></app-json-table> -->
    </div>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  // data: Disciplinas = todasDisciplinas 
  data = [{
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    hobbies: ["reading", "gaming"]
  },
  {
    name: "Paulo",
    age: 35,
    address: {
      street: "555 Secund St",
      city: "New Orleans",
      coordinates: {
        lat: 0.7128,
        lng: -4.0060
      }
    },
    hobbies: ["hiking", "gaming"]
  }
];
}
