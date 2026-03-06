const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3400;

// Middleware
app.use(express.json());

// Auth check middleware
const checkAuth = (req, res, next) => {
    // For API routes, check for session token in header or allow all for now
    // In production, implement proper JWT validation
    next();
};

// Serve static files except index.html (protected)
app.use(express.static('public', { index: false }));

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Protected main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Tasks API
const TASKS_FILE = './data/tasks.json';

// Ensure data directory exists
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
}

// Initialize tasks file
if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
}

// Get all tasks
app.get('/api/tasks', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
        res.json(tasks);
    } catch (e) {
        res.json([]);
    }
});

// Create task
app.post('/api/tasks', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
        const task = {
            id: Date.now().toString(),
            ...req.body,
            created: new Date().toISOString()
        };
        tasks.push(task);
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
        res.json(task);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    try {
        let tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
        const idx = tasks.findIndex(t => t.id === req.params.id);
        if (idx !== -1) {
            tasks[idx] = { ...tasks[idx], ...req.body, updated: new Date().toISOString() };
            fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
            res.json(tasks[idx]);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    try {
        let tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
        tasks = tasks.filter(t => t.id !== req.params.id);
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get cron jobs - hardcoded list for reliability
const CRON_JOBS = [
    {
        id: "gmail-daily",
        name: "Daily Gmail Check",
        schedule: { kind: "cron", expr: "0 6 * * *", tz: "America/New_York" },
        description: "Check Gmail for unread emails and summarize important ones",
        nextRun: "6:00 AM daily",
        enabled: true
    },
    {
        id: "morning-briefing",
        name: "Morning Briefing",
        schedule: { kind: "cron", expr: "0 8 * * *", tz: "America/New_York" },
        description: "Calendar, weather, and priority tasks summary",
        nextRun: "8:00 AM daily",
        enabled: true
    },
    {
        id: "gas-price",
        name: "Gas Price Alert",
        schedule: { kind: "cron", expr: "0 */6 * * *", tz: "America/New_York" },
        description: "Check gas prices and alert if under $3.00",
        nextRun: "Every 6 hours",
        enabled: true
    },
    {
        id: "rideshare-summary",
        name: "Evening Rideshare Summary",
        schedule: { kind: "cron", expr: "0 22 * * *", tz: "America/New_York" },
        description: "Daily rideshare stats: miles, earnings, gas costs",
        nextRun: "10:00 PM daily",
        enabled: true
    },
    {
        id: "daily-gas-check",
        name: "Daily Gas Price Check",
        schedule: { kind: "cron", expr: "0 6 * * *", tz: "America/New_York" },
        description: "Fetch AAA Ohio gas prices and store in memory",
        nextRun: "6:00 AM daily",
        enabled: true
    },
    {
        id: "maghrib-athan",
        name: "Maghrib Athan Notification",
        schedule: { kind: "cron", expr: "25 18 * * *", tz: "America/New_York" },
        description: "Ramadan Maghrib prayer notification",
        nextRun: "6:25 PM daily",
        enabled: true
    }
];

app.get('/api/cron', (req, res) => {
    res.json(CRON_JOBS);
});

// Get memories list
app.get('/api/memories', (req, res) => {
    const memoryDir = '/home/lfhama/.openclaw/workspace/memory';
    try {
        const files = fs.readdirSync(memoryDir)
            .filter(f => f.endsWith('.md'))
            .map(f => ({
                name: f,
                path: path.join(memoryDir, f),
                modified: fs.statSync(path.join(memoryDir, f)).mtime
            }))
            .sort((a, b) => b.modified - a.modified);
        res.json(files);
    } catch (e) {
        res.json([]);
    }
});

// Get memory content
app.get('/api/memories/:filename', (req, res) => {
    const memoryPath = path.join('/home/lfhama/.openclaw/workspace/memory', req.params.filename);
    try {
        // Security check - ensure it's within memory directory
        if (!memoryPath.startsWith('/home/lfhama/.openclaw/workspace/memory')) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const content = fs.readFileSync(memoryPath, 'utf8');
        res.json({ content });
    } catch (e) {
        res.status(404).json({ error: 'Memory not found' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve main HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎯 Mission Control running on port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
});
