import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div>
      <h1>Menu</h1>
      <!-- <app-table></app-table> -->
      <!-- <app-json-table [jsonData]="data"></app-json-table> -->
      <!-- The routed views render in the <router-outlet>-->
      <ul>
        <li><a routerLink="/listaDisciplinas">Lista de Disciplinas</a></li>
        <li><a routerLink="/ProjCH">Projeção de Carga Horária</a></li>
      </ul>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Tabela'
}
