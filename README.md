
<a href="https://deepwiki.com/abdelrahman-elsaady/movie-App"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
# mostaqel clone dachbourd

## Overview
This project is an Angular application that includes various components, services, and utilities to manage users, projects, skills, categories, and more. It also integrates PayPal for payment processing.

## Project Structure
- **src/**: Contains the main source code of the application.
  - **app/**: Main application code.
    - **components/**: Contains all the components of the application.
      - **home/**: Home component.
      - **admin/**: Admin component with login functionality.
      - **notfound/**: Component for handling 404 errors.
      - **side-bar/**: Sidebar component for navigation.
      - **users/**: User management components, including freelancers and clients.
      - **projects/**: Project management components, including statistics and single project views.
      - **categories/**: Category management components, including add and update functionalities.
      - **balance/**: Balance management component.
      - **add-admin/**: Component for adding new admin users.
      - **paypal-button/**: Component for PayPal integration.
      - **skills/**: Skills management components, including add and edit functionalities.
    - **Services/**: Contains services for handling business logic.
    - **Guards/**: Contains route guards for protecting routes.
    - **utils/**: Contains utility files and interceptors.
  - **environments/**: Environment configuration files.
  - **assets/**: Static assets like images and styles.
  - **main.ts**: Entry point of the application.
  - **index.html**: Main HTML file.
  - **styles.scss**: Global styles for the application.

## Configuration Files
- **tsconfig.json**: TypeScript configuration.
- **angular.json**: Angular workspace configuration.
- **package.json**: Project dependencies and scripts.

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `ng serve`.

## Additional Information
- The application uses Angular for the frontend.
- PayPal integration is included for payment processing.
- The project includes various components for managing users, projects, skills, and categories.
