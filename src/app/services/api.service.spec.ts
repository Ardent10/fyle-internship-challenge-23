import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  const mockRepoData = [
    {
      name: 'fyle-internship-challenge-23',
      description: 'Description 1',
      homepage:
        'https://fyle-internship-challenge-23-git-master-ardent10.vercel.app/',
      html_url: 'https://github.com/Ardent10/fyle-internship-challenge-23',
      language: 'TypeScript',
    },
    {
      name: 'MercForms',
      description: 'Description 2',
      homepage: 'https://merc-forms.vercel.app/',
      html_url: 'https://github.com/Ardent10/MercForms',
      language: 'TypeScript',
    },
  ];
  const mockUserData = {
    avatar_url: 'https://zakariya-ardent10.vercel.app/images/profile3.png',
    bio: 'Software Developer',
    blog: 'https://zakariya-ardent10.vercel.app/',
    followers: 100,
    following: 50,
    location: 'Delhi',
    name: 'Zakariya',
    login: 'Ardent10',
    public_repos: 20,
    twitter_username: 'mock-twitter',
    html_url: 'https://github.com/Ardent10',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserData', () => {
    it('should return user data', () => {
      service.getUserData('Ardent10').subscribe((data) => {
        expect(data).toEqual(mockUserData);
      });

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/Ardent10'
      );
      expect(req.request.method).toEqual('GET');

      req.flush(mockUserData);
    });
    it('should handle HTTP error', () => {
      // Subscribe to the observable
      service.getUserData('testuser').subscribe(
        () => fail('Expected an error'),
        (error) => {
          expect(error);
        }
      );

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/testuser'
      );

      // Simulate an HTTP error with a 404 status
      const errorResponse = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found',
      });
      const errorEvent = new ErrorEvent('error', {
        error: errorResponse,
        message: 'Http failure response for (unknown url): 404 Not Found',
      });

      req.error(errorEvent);
    });
  });

  describe('getAllRepos', () => {
    it('should return repository data', () => {
      service.getAllRepos('Ardent10', 1, 10).subscribe((data) => {
        expect(data).toEqual(mockRepoData);
      });

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/Ardent10/repos?per_page=10&page=1'
      );
      expect(req.request.method).toEqual('GET');

      req.flush(mockRepoData);
    });

    it('should handle HTTP error', () => {
      const mockError = new HttpErrorResponse({ status: 404 });

      service.getAllRepos('testuser', 1, 10).subscribe(
        () => fail('Expected an error'),
        (error) => {
          expect(error);
        }
      );

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/testuser/repos?per_page=10&page=1'
      );
      req.flush('', { status: 404, statusText: 'Not Found' });
    });
  });
});
