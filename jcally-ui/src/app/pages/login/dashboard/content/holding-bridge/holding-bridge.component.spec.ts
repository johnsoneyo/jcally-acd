import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingBridgeComponent } from './holding-bridge.component';

describe('HoldingBridgeComponent', () => {
  let component: HoldingBridgeComponent;
  let fixture: ComponentFixture<HoldingBridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
