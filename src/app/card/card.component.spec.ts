import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCardComponent } from './card.component';

describe('CharCardComponent', () => {
  let component: CharCardComponent;
  let fixture: ComponentFixture<CharCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharCardComponent]
    });
    fixture = TestBed.createComponent(CharCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
