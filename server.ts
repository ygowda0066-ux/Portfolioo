import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory submissions log (excellent for reviewing submissions during active session)
interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  sentViaResend: boolean;
}

const submissions: Submission[] = [];

// API: Submit Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide a name, email address, and message."
    });
  }

  let sentViaResend = false;

  // Create submission record
  const newSubmission: Submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    email,
    phone: phone || "",
    message,
    createdAt: new Date().toISOString(),
    sentViaResend
  };

  submissions.unshift(newSubmission);

  res.json({
    success: true,
    message: "Your message has been sent successfully. I'll get back to you soon!",
    submission: {
      id: newSubmission.id,
      sentViaResend
    }
  });
});

// API: Retrieve submissions (so developers/users can see local submissions in preview)
app.get("/api/submissions", (req, res) => {
  res.json({
    count: submissions.length,
    submissions
  });
});

// Vite Middleware & SPA serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
  });
}

setupServer();
