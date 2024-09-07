import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRecapComponent } from './quiz-recap.component';

describe('QuizRecapComponent', () => {
  let component: QuizRecapComponent;
  let fixture: ComponentFixture<QuizRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
