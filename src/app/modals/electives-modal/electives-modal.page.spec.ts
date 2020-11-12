import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElectivesModalPage } from './electives-modal.page';

describe('ElectivesModalPage', () => {
  let component: ElectivesModalPage;
  let fixture: ComponentFixture<ElectivesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElectivesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
