import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableJSONComponent } from './tabela-from-json.component';

describe('TabelaFromJsonComponent', () => {
  let component: TableJSONComponent;
  let fixture: ComponentFixture<TableJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableJSONComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
