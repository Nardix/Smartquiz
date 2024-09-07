import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPartecipationComponent } from './quiz-partecipation.component';

describe('QuizPartecipationComponent', () => {
  let component: QuizPartecipationComponent;
  let fixture: ComponentFixture<QuizPartecipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPartecipationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizPartecipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
