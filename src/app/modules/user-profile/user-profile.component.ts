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
  userData: any; // For storing the user data from the getUserData() API
  repoData: any; // For storing the repo data from the getAllRepos() API

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];

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

          // Get repo data
          this.apiService.getAllRepos(this.username, 1).subscribe(
            (repoData) => {
              // Assuming repoData is an array
              this.repoData = repoData.map((repo: any) => {
                return {
                  name: repo.name,
                  description: repo.description,
                  deployedLink: repo.homepage || '', // Assuming the homepage is the deployed link
                  repoLink: repo.html_url,
                  techStack: repo.language,
                };
              });
              this.loading = false;
              console.error(this.repoData);
            },
            (repoError) => {
              console.error(repoError);
              this.loading = false;
            }
          );
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
