import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchForm = new FormGroup({ username: new FormControl('') });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  checkValidForm() {
    return this.searchForm.valid;
  }

  onSubmit() {
    const username = this.searchForm.value.username;
    this.router.navigate(['/user-profile', 'github', username]);
  }
}
