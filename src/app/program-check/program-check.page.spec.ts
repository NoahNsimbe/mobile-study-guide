import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgramCheckPage } from './program-check.page';

describe('ProgramCheckPage', () => {
  let component: ProgramCheckPage;
  let fixture: ComponentFixture<ProgramCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
