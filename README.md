# Welcome to My Business Events Platform

## Description

This project is a comprehensive business events platform designed to streamline event management and participation. It leverages cutting-edge technologies to offer a seamless experience for users and administrators.

### Technologies Used

- **Backend**: Supabase is utilized to host and manage the backend services, providing robust database capabilities and user authentication functionalities.
- **Frontend**: The frontend is built using React with TypeScript, powered by Vite for efficient development and deployment.
- **Google Integration**: A Google Cloud project is integrated to access Google's Calendar API, enabling users to interact with their Google Calendars directly from the application.
- **Hosting**: The application is hosted on Netlify, offering a reliable and scalable hosting solution.

### Features

- User accounts through Google Authentication
- Viewing and booking events
- Adding events to a users Google Calendar
- Creating, editing and deleting events on the Admin side

### Access 

Due to the nature of the backend architecture and the reliance on Google Authentication, direct access to the backend is restricted. 
Similarly, local hosting of the project is not feasible as it requires API keys to my Supabase instance which as stated, is restricted.

- **Email Contact**: For inquiries about the backend or any other concerns, please reach out via email at jakehuntlyrobinson@gmail.com.
- **Project URL**: You can explore the live version of the project at [https://business-events-platform.netlify.app](https://business-events-platform.netlify.app).

### Test Account

- **Testing Accounts**:
                      - Admin: If you'd like to view the Admin side of the app, you can use the following account. Email - testingbusinessevents@gmail.com Pass - TestAdmin123
                      - User: If you'd like to view the User side of the app, you can use the following account. Email usertest@gmail.com Pass - TestUser123
- **Local Hosting**: Local hosting of the project requires multiple API keys, which cannot be distributed publicly.

### Google Logins

- Currently, the functionality to add events to your Google Calendar is working if you're signed in with Google. However, when logging in with Google to test this feature, you may encounter a warning stating, "Google has not yet verified this app."

- This warning appears because the app requires access to sensitive scopes in order to interact with your Google Calendar, which triggers Google's verification process. To streamline the experience and avoid having to manually add each user as a test user,
  I have decided to apply for app verification by Google. Once verified, this warning will no longer appear, ensuring a smoother integration with Google Calendar.

Thank you for your understanding and interest in the Business Events Platform. I hope you find my project inspiring and look forward to any feedback or contributions you might have.
