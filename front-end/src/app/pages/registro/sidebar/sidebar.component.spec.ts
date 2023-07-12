import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: RegistroSidebarComponent;
  let fixture: ComponentFixture<RegistroSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroSidebarComponent]
    });
    fixture = TestBed.createComponent(RegistroSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
