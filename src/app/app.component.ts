import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Item } from './services/tableFunctions';
import { DataServices } from './services/DataServices.service';
import { todasDisciplinas } from './intefaces/InterfaceDisciplina';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'Gerenciador de Carga Horária Docente'

  dadosGradeCursos: Item[] = [];

  data = inject(DataServices)

  constructor() {


  }

  ngOnInit(): void {

      this.dadosGradeCursos = todasDisciplinas//this.data.getdataStoreJSON()

      console.log('dadosGradeCursos',this.dadosGradeCursos)


  }
}
