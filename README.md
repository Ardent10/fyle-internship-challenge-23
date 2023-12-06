# GitSphere | Fyle Internship Challenge 23

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

GitSphere is a web application that allows users to explore GitHub users and their repositories.

## Features

- Search for GitHub users by username.
- View detailed information about a user, including their bio, repositories, and more.

## Technologies Used

- Angular
- TypeScript
- GitHub API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ardent10/fyle-internship-challenge-23.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fyle-internship-challenge-23
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Open your browser and visit [http://localhost:4200/](http://localhost:4200/) to use GitSphere.

## Usage

1. Enter a GitHub username in the search bar.
2. Click the search button to view details about the user.
3. Explore the user's repositories.

## Testing

GitSphere uses Angular's testing utilities for unit testing. To run the tests, use the following command:

```bash
ng test
```

This command will execute all unit tests for the application. If you want to focus on specific tests, you can provide a file or pattern after the ng test command. For example:

```
ng test --include='**/home.component.spec.ts' --include='**/api.service.spec.ts'
```

NOTE: The modules/HomeComponent and the services/apiService components are the that satisfy the Fyle Internship Challenge 23 requirements.

## Contributing

If you'd like to contribute to GitSphere, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

```
