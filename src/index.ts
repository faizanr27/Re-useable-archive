import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(express.json());

// Sample Route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Backend!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
