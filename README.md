# Next-Chatter

**Next-Chatter** is a real-time chat application built using **Next.js** and **React.js**, with **Firebase Realtime Database** for instant messaging. This project allows users to create accounts, engage in real-time conversations, and manage chat rooms seamlessly.

## Features

- Real-time messaging with Firebase Realtime Database.
- User authentication using Firebase Authentication.
- Create and manage chat rooms.
- Secure and scalable chat environment.
- Responsive UI built with React.js and Next.js.

## Technologies Used

### Frontend:
- **Next.js** (React Framework)
- **React.js**
- **Tailwind CSS** (Styling)

### Backend:
- **Firebase Realtime Database** (Real-time messaging)
- **Firebase Authentication** (User authentication)

### Additional Tools:
- **Vercel** (Frontend Hosting)
- **Firebase Console** (Backend Management)

## Installation

### Prerequisites:
- Node.js
- Firebase Account (for Realtime Database and Authentication setup)

### Steps to run the project:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/next-chatter.git
    ```

2. Navigate to the project directory and install the dependencies:

    ```bash
    cd next-chatter
    npm install
    ```

3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable **Firebase Authentication** and **Firebase Realtime Database**.
   - Get your Firebase config and create a `.env.local` file in the root of the project with the following:

    **.env.local**:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=<Your Firebase API Key>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=<Your Firebase Database URL>
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
    NEXT_PUBLIC_FIREBASE_APP_ID=<Your Firebase App ID>
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the application in your browser at `http://localhost:3000`.

## Deployment

You can deploy the application easily using **Vercel**. Follow these steps:

1. Link your GitHub repository to Vercel.
2. Set up the environment variables in Vercel as mentioned above.
3. Deploy the project by following the instructions on Vercel.

## Contribution

Contributions are welcome! Feel free to submit pull requests to improve the project or add new features.

## License

This project is licensed under the MIT License.

