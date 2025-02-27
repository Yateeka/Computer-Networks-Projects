import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve home.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Endpoint to fetch the list of documents (with relative file paths)
app.get('/documents', (req, res) => {
    const documents = [
        { id: 1, title: "Project-1", filePath:"Computer Networking Project Report.pdf" }
    ];
    res.json(documents);
});

// Endpoint to serve the PDF file from the "documents" directory
app.get('/docs/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'documents', req.params.filename);
    res.sendFile(filePath);
});

// Start the server and listen for requests
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
