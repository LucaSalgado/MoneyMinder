import { TestBed } from '@angular/core/testing';
import { MenuVisivelService } from './menu-visivel.service';

describe('MenuVisivelService', () => {
  let service: MenuVisivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuVisivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update menu visibility state', () => {
    let currentMenuVisivelState: boolean | undefined;
    service.menuVisivelEstado$.subscribe((state) => {
      currentMenuVisivelState = state;
    });

    expect(currentMenuVisivelState).toBeFalsy();

    service.atualizarEstado(true);
    expect(currentMenuVisivelState).toBeTruthy();

    service.atualizarEstado(false);
    expect(currentMenuVisivelState).toBeFalsy();
  });
});
