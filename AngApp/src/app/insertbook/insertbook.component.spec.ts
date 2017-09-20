import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertbookComponent } from './insertbook.component';

describe('InsertbookComponent', () => {
  let component: InsertbookComponent;
  let fixture: ComponentFixture<InsertbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
