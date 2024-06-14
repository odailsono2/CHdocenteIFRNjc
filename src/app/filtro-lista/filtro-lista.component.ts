import { Component, Renderer2, input, output } from '@angular/core';

@Component({
  selector: 'app-filtro-lista',
  standalone: true,
  imports: [],
  templateUrl: './filtro-lista.component.html',
  styleUrl: './filtro-lista.component.css'
})
export class FiltroListaComponent {
  filtrar = output<any>()
  key = input.required<string>()

}
