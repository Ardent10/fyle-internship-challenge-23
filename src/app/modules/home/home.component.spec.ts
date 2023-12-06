import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Welcome to GitSphere');
  });

  it('form should be invalid initially', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should display error message when form is invalid and touched', () => {
    // Mark the form as touched
    component.searchForm.markAllAsTouched();
    fixture.detectChanges();

    // Check if the error message is displayed
    const errorMessage = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorMessage.nativeElement.textContent.trim()).toBe(
      'Enter a valid GitHub username!'
    );
  });

  it('should hide error message when form is valid', () => {
    // Set a valid value for the username
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('Ardent10');

    // Mark the form as touched
    component.searchForm.markAllAsTouched();
    fixture.detectChanges();

    // Check if the error message is not displayed
    const errorMessage = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorMessage).toBeFalsy();
  });

  it('should set username control value', () => {
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('Ardent10');
    expect(usernameControl?.value).toEqual('Ardent10');
  });

  it('form should be valid when username is provided', () => {
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('Ardent10');
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('form should be invalid when username is not provided', () => {
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('');
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should navigate to the user profile page when the form is submitted', () => {
    // Set a valid value for the username
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('Ardent10');

    // Trigger the form submission
    const submitButton = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    submitButton.click();

    // Wait for the router navigation to complete
    fakeAsync(() => {
      tick();

      // Verify that the router navigated to the correct URL
      expect(router.navigate).toHaveBeenCalledWith([
        '/user-profile',
        'github',
        'Ardent10',
      ]);
    });
  });

  it('should navigate to user profile with a valid username', fakeAsync(() => {
    // Set a valid value for the username
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('Ardent10');

    // Mark the form as touched
    component.searchForm.markAllAsTouched();
    fixture.detectChanges();
    tick();

    // Call the onSubmit method
    component.onSubmit();
    tick();

    // Check if router.navigate is called with the correct arguments
    expect(router.navigate).toHaveBeenCalledWith([
      '/user-profile',
      'github',
      'Ardent10',
    ]);
  }));

  it('should not navigate with an empty username', fakeAsync(() => {
    // Set an empty value for the username
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('');

    // Mark the form as touched
    component.searchForm.markAllAsTouched();
    fixture.detectChanges();
    tick();

    // Call the onSubmit method
    component.onSubmit();
    tick();

    // Check if router.navigate is not called
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should not navigate with an invalid username', fakeAsync(() => {
    // Set an invalid value for the username (assuming a minimum length of 3 characters)
    const usernameControl = component.searchForm.get('username');
    usernameControl?.setValue('ab');

    // Mark the form as touched
    component.searchForm.markAllAsTouched();
    fixture.detectChanges();
    tick();

    // Call the onSubmit method
    component.onSubmit();
    tick();

    // Check if router.navigate is not called
    expect(router.navigate).not.toHaveBeenCalled();
  }));

});
