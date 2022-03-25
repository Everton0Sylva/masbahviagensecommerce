import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiqueMaisComponent } from './indicate-more.component';

describe('IndiqueMaisComponent', () => {
  let component: IndiqueMaisComponent;
  let fixture: ComponentFixture<IndiqueMaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiqueMaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiqueMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
