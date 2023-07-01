import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuVisivelService {
  private menuVisivelSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public menuVisivelEstado$: Observable<boolean> =
    this.menuVisivelSubject.asObservable();

  constructor() {}

  public atualizarEstado(pressionado: boolean): void {
    this.menuVisivelSubject.next(pressionado);
  }
}
