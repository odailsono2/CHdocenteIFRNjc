import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTHeadComponent } from './app-thead.component';

describe('AppTHeadComponent', () => {
  let component: AppTHeadComponent;
  let fixture: ComponentFixture<AppTHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
