import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerpagoComponent } from './alquilerpago.component';

describe('AlquilerpagoComponent', () => {
  let component: AlquilerpagoComponent;
  let fixture: ComponentFixture<AlquilerpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerpagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquilerpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
