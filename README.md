# 🎯 Mission Control

**Your AI-powered command center for productivity and automation.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lfhama.bouchenafa.tech-blue)](https://lfhama.bouchenafa.tech)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 📋 **Task Board** | Kanban-style task management with drag-and-drop columns (To Do / In Progress / Done) |
| 🧠 **Memory Vault** | Searchable archive of memories and daily logs |
| 📅 **Command Calendar** | View all scheduled cron jobs and automation tasks |
| 👥 **Team Structure** | Visual organization of AI agents and their roles |
| 🔐 **Secure Login** | Animated login with mascot authentication (PIN: 903341) |
| 📱 **PWA Support** | Install as native app on mobile/desktop |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lfhamabot/lfhama-mission-control.git
cd lfhama-mission-control

# Install dependencies
npm install

# Start the server
npm start

# Open in browser
open http://localhost:3400
```

### Default PIN
```
903341
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Storage** | JSON files (filesystem) |
| **Auth** | Session-based (client-side) |
| **Deployment** | Docker, Cloudflare Tunnel |

---

## 📊 API Endpoints

### Tasks
```
GET    /api/tasks          # List all tasks
POST   /api/tasks          # Create new task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

### Memories
```
GET /api/memories          # List memory files
GET /api/memories/:file    # Get memory content
```

### Cron Jobs
```
GET /api/cron              # List scheduled jobs
```

### Health Check
```
GET /api/health            # Server status
```

---

## 🗂️ Project Structure

```
lfhama-mission-control/
├── 📄 server.js              # Express API server
├── 📄 package.json           # Dependencies
├── 📁 public/                # Static frontend files
│   ├── 📄 index.html         # Main dashboard
│   ├── 📄 login.html         # Animated login page
│   ├── 📄 manifest.json      # PWA manifest
│   ├── 📄 sw.js              # Service Worker
│   └── 🖼️ lfhama-avatar.jpg  # Mascot image
├── 📁 data/                  # Data storage (gitignored)
│   └── 📄 tasks.json         # Task data
└── 📄 .gitignore             # Git exclusions
```

---

## 🎨 Screenshots

### Login Page
Animated login with mascot that reacts to PIN entry:
- 👀 Watches you type
- 🙈 Covers eyes during password entry
- 🎉 Celebrates on successful login

### Task Board
Kanban columns with swipe navigation on mobile:
- 🟡 To Do
- 🔵 In Progress  
- 🟢 Done

### Memory Vault
Search through all memory files:
- Real-time filtering
- Click to view full content
- Chronological organization

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
PORT=3400
NODE_ENV=production
```

### PIN Code
Change the default PIN in `public/login.html`:
```javascript
const CORRECT_PIN = 'your-new-pin';
```

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t mission-control .

# Run container
docker run -p 3400:3400 -v $(pwd)/data:/app/data mission-control
```

### Docker Compose
```yaml
version: '3'
services:
  mission-control:
    build: .
    ports:
      - "3400:3400"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

---

## 🌐 Cloudflare Tunnel Setup

To expose locally to the internet:

```bash
# Install cloudflared
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Authenticate
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create mission-control

# Configure config.yml
echo "tunnel: YOUR_TUNNEL_ID
credentials-file: ~/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: your-domain.com
    service: http://localhost:3400
  - service: http_status:404" > ~/.cloudflared/config.yml

# Run tunnel
cloudflared tunnel run mission-control
```

---

## 📝 Roadmap

- [ ] Task deadlines and reminders
- [ ] Priority levels (urgent/normal/low)
- [ ] Task categories/tags
- [ ] Memory file editing
- [ ] Calendar view with event creation
- [ ] Team member assignment
- [ ] Export data to CSV/PDF
- [ ] Dark/light theme toggle

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🦞 Credits

Built by **L'fhama** for **Si Hassan**

Mascot design: 3D Pixar-style lobster with Moroccan fez 🇲🇦

---

## 🔗 Links

- **Live Site:** https://lfhama.bouchenafa.tech
- **GitHub:** https://github.com/lfhamabot/lfhama-mission-control
- **Issues:** https://github.com/lfhamabot/lfhama-mission-control/issues
