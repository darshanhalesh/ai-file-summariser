# Welcome to your Lovable project

## Project info

**URL**

## Features

- **AI Meeting Summarizer**: Upload meeting transcripts and get AI-powered summaries
- **Gemini AI Integration**: Uses Google's Gemini AI for intelligent summarization
- **Email Sharing**: Share summaries via email using EmailJS
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Configure Gemini AI (Optional)
For real AI summaries, set your Gemini API key in `src/pages/Index.tsx`:
```typescript
const GEMINI_API_KEY = "your_api_key_here";
```

### 3. Configure EmailJS (Optional)
For real email sending, set up EmailJS:

1. **Sign up** at [emailjs.com](https://emailjs.com)
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Update the configuration** in `src/pages/Index.tsx`:
```typescript
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key";
```

### 4. Run Development Server
```sh
npm run dev
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/66418e85-514c-47ea-88a9-b762aa2ad8b5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/66418e85-514c-47ea-88a9-b762aa2ad8b5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
