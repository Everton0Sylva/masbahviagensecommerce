import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlansComponent } from './plans.component';

describe('PlansComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PlansComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PlansComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Coobrastur - Vendas'`, () => {
    const fixture = TestBed.createComponent(PlansComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Coobrastur - Vendas');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PlansComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('coobrastur vendas app is running!');
  });
});
