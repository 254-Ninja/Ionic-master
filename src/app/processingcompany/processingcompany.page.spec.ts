import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcessingcompanyPage } from './processingcompany.page';

describe('ProcessingcompanyPage', () => {
  let component: ProcessingcompanyPage;
  let fixture: ComponentFixture<ProcessingcompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingcompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessingcompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
