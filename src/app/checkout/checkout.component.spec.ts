import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CheckoutComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Coobrastur - Vendas'`, () => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Coobrastur - Vendas');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('coobrastur vendas app is running!');
  });
});
