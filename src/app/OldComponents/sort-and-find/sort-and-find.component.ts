import { Component, Input } from '@angular/core';
import { Item } from '../services/ordenarobjetos';

@Component({
  selector: 'app-sort-and-find',
  standalone: true,
  imports: [],
  templateUrl: './sort-and-find.component.html',
  styleUrl: './sort-and-find.component.css'
})
export class SortAndFindComponent {

  @Input()  key!:string

  aClickUP!:(chave:string)=>Item[]
  aClickDOWN!:(chave:string)=>Item[]
  search!:(chave:string)=>Item[]

}
