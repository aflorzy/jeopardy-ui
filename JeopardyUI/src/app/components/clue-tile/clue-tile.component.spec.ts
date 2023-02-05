import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClueTileComponent } from './clue-tile.component';

describe('ClueTileComponent', () => {
  let component: ClueTileComponent;
  let fixture: ComponentFixture<ClueTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClueTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClueTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
