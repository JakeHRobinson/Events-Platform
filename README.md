# Welcome to My Business Events Platform

## Description

This project is a comprehensive business events platform designed to streamline event management and participation. It leverages cutting-edge technologies to offer a seamless experience for users and administrators.

### Technologies Used

- **Backend**: Supabase is utilized to host and manage the backend services, providing robust database capabilities and user authentication functionalities.
- **Frontend**: The frontend is built using React with TypeScript, powered by Vite for efficient development and deployment.
- **Google Integration**: A Google Cloud project is integrated to access a users Google Calendar, enabling automatic creation of events directly from the application.
- **Hosting**: The application is hosted on Netlify, offering a reliable and scalable hosting solution.

### User Features

- **Login Page**: This is where a user is able to login/signup either through Google, or with an email and password.
- **Home Page**: This is where a user is able to see all upcoming events, and are able to click on each event to see more details.
- **Event Page**: This is where a user is able to book an event, and add an event to their Google Calender if they have signed up.
    - I appreciate not everyone will want to log in with their own google account. For that reason, I have a short video demonstrating the Google Calendar functionality when signed in with a Google Account here: https://youtu.be/5qpKQjUCDQs

### Admin Features

- **Admin Page**: This is where an admin is able to create, edit or delete event listings. 

### Access 

- **Email Contact**: For inquiries about the backend or any other issues, please reach out via email at jakehuntlyrobinson@gmail.com.
- **Project URL**: You can explore the live version of the project at [https://business-events-platform.netlify.app](https://business-events-platform.netlify.app).

## Testing

### Accounts
- Admin: If you'd like to view the Admin side of the app, you can use the following account.
- Email - admintest@gmail.com Pass - TestAdmin123
  
- User: If you'd like to view the User side of the app, you can use the following account.
- Email usertest@gmail.com Pass - TestUser123

### Google Logins

- Currently, the functionality to add events to your Google Calendar is working if you're signed in with Google. However, when logging in with Google to test this feature, you may encounter a warning stating, "Google has not yet verified this app."

- This warning appears because the app requires access to sensitive scopes in order to interact with your Google Calendar, which triggers Google's verification process. To streamline the experience and avoid having to manually add each user as a test user,
  I have decided to apply for app verification by Google. Once verified, this warning will no longer appear, ensuring a smoother integration with Google Calendar.

Thank you for your understanding and interest in the Business Events Platform. I hope you find my project inspiring and look forward to any feedback or contributions you might have.
