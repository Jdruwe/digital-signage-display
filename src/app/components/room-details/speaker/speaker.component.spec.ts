import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpeakerComponent} from './speaker.component';

describe('SpeakerComponent', () => {
  let component: SpeakerComponent;
  let fixture: ComponentFixture<SpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerComponent);
    component = fixture.componentInstance;
    const app = fixture.debugElement.componentInstance;
    app.speaker = {firstName: 'John', lastName: 'Doe', twitter: '@JohnDoe'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a speaker with name 'John Doe'`, function () {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.speaker.firstName).toBe('John');
    expect(app.speaker.lastName).toBe('Doe');
  });

  it(`should render h3 tag with 'John Doe'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.speaker h3').textContent).toContain(`John Doe`);
  });

  it(`should render small tag with '@JohnDoe'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.speaker small').textContent).toContain(`@JohnDoe`);
  });

});
