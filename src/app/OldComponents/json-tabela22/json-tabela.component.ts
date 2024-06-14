import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-json-table',
  standalone: true,
  templateUrl: './json-tabela.component.html',
  styleUrls: ['./json-tabela.component.css'],
})
export class JsonTableComponent {
  @Input() jsonData: any;

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
