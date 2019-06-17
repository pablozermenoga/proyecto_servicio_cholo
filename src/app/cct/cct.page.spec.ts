import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CctPage } from './cct.page';

describe('CctPage', () => {
  let component: CctPage;
  let fixture: ComponentFixture<CctPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CctPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CctPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
