import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavebridgeComponent } from './savebridge.component';

describe('SavebridgeComponent', () => {
  let component: SavebridgeComponent;
  let fixture: ComponentFixture<SavebridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavebridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavebridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
