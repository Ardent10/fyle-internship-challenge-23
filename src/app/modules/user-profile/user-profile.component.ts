import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('1000ms ease-in')),
      transition('* => void', animate('1000ms ease-out')),
    ]),
  ],
})
export class UserProfileComponent implements OnInit {
  loading = true;
  username!: string;
  userData: any; // For storing the user data from the

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      // Now you can use this.username in your component logic
      this.apiService.getUserData(this.username!).subscribe(
        (data) => {
          this.userData = {
            avatar: data.avatar_url,
            bio: data.bio,
            blog: data.blog,
            followers: data.followers,
            following: data.following,
            location: data.location,
            name: data.name,
            username: data.login,
            repos: data.public_repos,
            twitter: data.twitter_username,
            github: data.html_url,
          };
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
