import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdelantoComponent } from './adelanto.component';

describe('AdelantoComponent', () => {
  let component: AdelantoComponent;
  let fixture: ComponentFixture<AdelantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdelantoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdelantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
