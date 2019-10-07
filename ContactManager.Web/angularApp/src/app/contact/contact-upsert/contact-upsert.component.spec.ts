import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUpsertComponent } from './contact-upsert.component';

describe('ContactUpsertComponent', () => {
  let component: ContactUpsertComponent;
  let fixture: ComponentFixture<ContactUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
