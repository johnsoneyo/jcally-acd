import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixingBridgeComponent } from './mixing-bridge.component';

describe('MixingBridgeComponent', () => {
  let component: MixingBridgeComponent;
  let fixture: ComponentFixture<MixingBridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixingBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixingBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
