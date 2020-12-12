import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UaceComponent } from './uace.component';

describe('UaceComponent', () => {
  let component: UaceComponent;
  let fixture: ComponentFixture<UaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UaceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
