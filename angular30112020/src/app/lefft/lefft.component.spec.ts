import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LefftComponent } from './lefft.component';

describe('LefftComponent', () => {
  let component: LefftComponent;
  let fixture: ComponentFixture<LefftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LefftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LefftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
