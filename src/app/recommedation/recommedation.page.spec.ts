import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommedationPage } from './recommedation.page';

describe('RecommedationPage', () => {
  let component: RecommedationPage;
  let fixture: ComponentFixture<RecommedationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommedationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommedationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
