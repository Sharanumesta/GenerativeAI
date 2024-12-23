# Simple Chat AI Bot

A basic **MERN** (MongoDB, Express, React, Node.js) app that allows users to chat with an AI bot. The bot responds based on user prompts.

## Features
- User types a prompt, and the bot replies.
- Displays the conversation in a chat window.

## Setup
1. Clone the repository.
2. Install dependencies for both client and server:
   - For the client: `cd client && npm install`
   - For the server: `cd server && npm install`
3. Run the app:
   - For both client and server: `npm run dev`

Ensure the backend API is running on `http://localhost:8080/prompt`.

## Backend
The backend API uses the **Google Generative AI** model for generating bot responses. Make sure you have the **API key** from Google to use their AI model.

1. Set the API key in your environment variables as `API_KEY`.
2. The backend is built using Express and communicates with Google Generative AI's `gemini-1.5-flash` model.

## Acknowledgments
This project is built using the **MERN** stack. It also utilizes **Google Generative AI** for generating responses. The backend API interacts with the Google Generative AI service to process user input and generate text-based replies.
