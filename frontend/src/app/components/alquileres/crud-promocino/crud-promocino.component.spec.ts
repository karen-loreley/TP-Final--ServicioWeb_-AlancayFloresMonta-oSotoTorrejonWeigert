import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPromocinoComponent } from './crud-promocino.component';

describe('CrudPromocinoComponent', () => {
  let component: CrudPromocinoComponent;
  let fixture: ComponentFixture<CrudPromocinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPromocinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudPromocinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
