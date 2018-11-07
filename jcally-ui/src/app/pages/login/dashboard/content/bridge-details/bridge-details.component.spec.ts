import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeDetailsComponent } from './bridge-details.component';

describe('BridgeDetailsComponent', () => {
  let component: BridgeDetailsComponent;
  let fixture: ComponentFixture<BridgeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
