import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAdmin } from './component-admin';

describe('ComponentAdmin', () => {
  let component: ComponentAdmin;
  let fixture: ComponentFixture<ComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
