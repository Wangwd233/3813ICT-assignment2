import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { DebugElement } from '@angular/core';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the joinroom method', () => {
    fixture.detectChanges();
    spyOn(component, 'joinroom');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.joinroom).toHaveBeenCalledTimes(1);
  })

  it('should call the createroom method', () => {
    fixture.detectChanges();
    spyOn(component, 'createroom');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.createroom).toHaveBeenCalled();
  })

  it('should call the leaveroom method', () => {
    fixture.detectChanges();
    spyOn(component, 'leaveroom');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.leaveroom).toHaveBeenCalledTimes(1);
  })

  it('should call the chat method', () => {
    fixture.detectChanges();
    spyOn(component, 'chat');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.chat).toHaveBeenCalledTimes(1);
  })

  

});
