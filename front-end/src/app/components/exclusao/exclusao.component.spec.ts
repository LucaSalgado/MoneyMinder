import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoComponent } from './exclusao.component';

describe('ExclusaoComponent', () => {
  let component: ExclusaoComponent;
  let fixture: ComponentFixture<ExclusaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExclusaoComponent]
    });
    fixture = TestBed.createComponent(ExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
