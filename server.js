import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001; // We'll run our backend on a different port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Get the secret API key from environment variables
const HIBP_API_KEY = process.env.VITE_HIBP_API_KEY;

if (!HIBP_API_KEY) {
  throw new Error("Missing VITE_HIBP_API_KEY in your .env file!");
}

// Create an API endpoint that our React app will call
app.post('/api/check-pwned', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const apiResponse = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': HIBP_API_KEY,
        'user-agent': 'My-Pwned-Checker-App' // HIBP requires a user-agent
      },
    });

    if (apiResponse.status === 200) {
      const data = await apiResponse.json();
      res.status(200).json({ isPwned: true, data });
    } else if (apiResponse.status === 404) {
      res.status(200).json({ isPwned: false, data: null });
    } else {
      // Forward the status and error message from the HIBP API
      res.status(apiResponse.status).json({ error: apiResponse.statusText });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running securely on http://localhost:${port}`);
});