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
  close = output()
  title = input<string>('None')
  edite = output()
  key = input.required<string>()

  editavel = true
  editar(){
    this.editavel = !this.editavel
    this.edite.emit()
  }
  
 
}
