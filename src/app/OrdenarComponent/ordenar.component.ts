import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-ordenar',
  standalone: true,
  imports: [],
  templateUrl: './ordenar.component.html',
  styleUrl: './ordenar.component.css'
})
export class OrdenarComponent {

  ordemCrescente = output()
  ordemDecrescente = output()
  moveLeft = output()
  moveRight = output()
  title = input<string>('None')
  key = input.required<string>()
  
 
}
