import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsTabsComponent } from './goals-tabs.component';

describe('GoalsTabsComponent', () => {
  let component: GoalsTabsComponent;
  let fixture: ComponentFixture<GoalsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
