import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { MenuVisivelService } from 'src/app/services/menuVisivel/menu-visivel.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let menuVisivelService: MenuVisivelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [MenuVisivelService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    menuVisivelService = TestBed.inject(MenuVisivelService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set menuVisivel to false on window resize when innerWidth < 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 });
  
    const updateMenuVisivelStateSpy = spyOn(component as any, 'updateMenuVisivelState').and.callThrough();
  
    window.dispatchEvent(new Event('resize'));
  
    expect(updateMenuVisivelStateSpy).toHaveBeenCalled();
    expect(component.menuVisivel).toBe(false);
    expect(component.isMobile).toBe(true);
  });
  
  it('should set menuVisivel to true on window resize when innerWidth >= 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 });
  
    const updateMenuVisivelStateSpy = spyOn(component as any, 'updateMenuVisivelState').and.callThrough();
  
    window.dispatchEvent(new Event('resize'));
  
    expect(updateMenuVisivelStateSpy).toHaveBeenCalled();
    expect(component.menuVisivel).toBe(true);
    expect(component.isMobile).toBe(false);
  });

  it('should toggle menuVisivel when dropdownMenu is called', () => {
    component.menuVisivel = true;
    const atualizarEstadoSpy = spyOn(menuVisivelService, 'atualizarEstado');

    component.dropdownMenu();

    expect(component.menuVisivel).toBe(false);
    expect(atualizarEstadoSpy).toHaveBeenCalledWith(false);

    component.dropdownMenu();

    expect(component.menuVisivel).toBe(true);
    expect(atualizarEstadoSpy).toHaveBeenCalledWith(true);
  });
});
