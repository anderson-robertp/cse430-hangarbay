import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipComponent } from './add-ship.component';

describe('AddShipComponent', () => {
  let component: AddShipComponent;
  let fixture: ComponentFixture<AddShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
