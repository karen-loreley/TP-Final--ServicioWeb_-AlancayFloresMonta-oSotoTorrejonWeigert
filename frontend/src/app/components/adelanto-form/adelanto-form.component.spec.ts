import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdelantoFormComponent } from './adelanto-form.component';

describe('AdelantoFormComponent', () => {
  let component: AdelantoFormComponent;
  let fixture: ComponentFixture<AdelantoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdelantoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdelantoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
