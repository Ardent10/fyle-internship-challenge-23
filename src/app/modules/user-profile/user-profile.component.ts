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
  [x: string]: any;
  loading = true;
  username!: string;
  userData: any; // For storing the user data from the getUserData() API
  repoData: any; // For storing the repo data from the getAllRepos() API

  // To handle Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalRepoCount: number = 0;
  totalPages: number = 0;

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
          this.totalRepoCount = data.public_repos;
          this.fetchRepoData();
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    });
  }

  fetchRepoData(): void {
    console.log(this.currentPage, this.itemsPerPage, this.totalRepoCount);
    console.log(Math.ceil(this.totalRepoCount / this.itemsPerPage));
    this.apiService
      .getAllRepos(this.username, this.currentPage, this.itemsPerPage)
      .subscribe(
        (repoData) => {
          this.repoData = repoData.map((repo: any) => {
            return {
              name: repo.name,
              description: repo.description,
              deployedLink: repo.homepage || '',
              repoLink: repo.html_url,
              techStack: repo.language,
            };
          });
          this.loading = false;
        },
        (repoError) => {
          console.error(repoError);
          this.loading = false;
        }
      );
  }

  // Method to handle page change
  handlePageChange(page: number): void {
    this.currentPage = page;
    this.fetchRepoData();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
