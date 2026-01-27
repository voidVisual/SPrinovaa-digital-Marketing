# SPrinovaa Digital Marketing Platform

A modern, production-grade digital marketing platform built with Next.js 15.5, featuring AI-powered content generation, SEO analysis, and analytics integration. Fully containerized with Docker for seamless deployment.

## Quick Start

### Development
```bash
npm install
npm run dev
# Open http://localhost:9002
```

### Production Deployment
```bash
docker-compose up -d
# Access at http://localhost:3000
```

---

## Documentation

### For Developers
- **[Getting Started](src/app/page.tsx)** - Application entry point
- **[Components](src/components/)** - UI components
- **[Environment Setup](ENVIRONMENT.md)** - Local development guide

### For DevOps & Operations
- **[DEVOPS.md](DEVOPS.md)** - DevOps documentation index 
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[INFRASTRUCTURE.md](INFRASTRUCTURE.md)** - Architecture & scaling
- **[MONITORING.md](MONITORING.md)** - Monitoring & troubleshooting
- **[docs/DEVOPS_GUIDE.md](docs/DEVOPS_GUIDE.md)** - Quick reference guide

### Infrastructure Files
- **[Dockerfile](Dockerfile)** - Production Docker image
- **[docker-compose.yml](docker-compose.yml)** - Full stack orchestration
- **[nginx.conf](nginx.conf)** - Reverse proxy configuration
- **[.env.example](.env.example)** - Environment variables template

---

## Architecture

```
Clients
   ↓ HTTPS
Nginx (80/443) - Reverse Proxy & SSL
   ↓
Next.js (3000) - Application Layer
   ↓
Redis (6379) - Cache & Sessions
   ↓
External APIs (Google Generative AI, Analytics)
```

---

## Key Features

[x] **Production Ready**
- Multi-stage Docker builds
- Non-root container execution
- Health checks & monitoring
- Security hardening

[x] **Scalable**
- Horizontal scaling support
- Redis caching layer
- Nginx load balancing
- Auto-restart capabilities

[x] **Secure**
- HTTPS/TLS support
- Password-protected cache
- Security headers configured
- Minimal attack surface

[x] **Observable**
- Comprehensive logging
- Real-time monitoring
- Health endpoints
- Performance metrics

---

## What's Included

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Application | Next.js 15.5 | Server-side rendering, API routes |
| Frontend | React 19 | Interactive UI components |
| Cache | Redis 7 | Session storage, rate limiting |
| Proxy | Nginx | SSL termination, load balancing |
| Styling | Tailwind CSS | Responsive design |
| UI Components | Radix UI | Accessible component library |
| Icons | Lucide React | SVG icon library |
| AI | Google Generative AI | Content generation |

---

## Deployment Options

### Option 1: Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Option 2: Docker Swarm
```bash
docker swarm init
docker stack deploy -c docker-compose.yml sprinovaa
```

### Option 3: Kubernetes
```bash
kompose convert -f docker-compose.yml -o k8s/
kubectl apply -f k8s/
```

---

## System Requirements

### Minimum
- CPU: 2 cores
- RAM: 4 GB
- Disk: 50 GB SSD

### Recommended (Production)
- CPU: 4 cores
- RAM: 8 GB
- Disk: 100 GB SSD

---

## Security

- HTTPS/TLS encryption
- Non-root container execution
- Security headers configured
- Rate limiting enabled
- Password-protected Redis
- Minimal base image (Alpine)

---

## Monitoring

Monitor your deployment with:
```bash
# View logs
docker-compose logs -f app

# Check health
docker-compose ps

# Real-time stats
docker stats

# Service metrics
docker-compose exec redis redis-cli INFO
```

---

## Support & Documentation

- **Issues**: Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting
- **Architecture**: See [INFRASTRUCTURE.md](INFRASTRUCTURE.md)
- **Environment Setup**: Read [ENVIRONMENT.md](ENVIRONMENT.md)
- **Monitoring**: Refer to [MONITORING.md](MONITORING.md)
- **Quick Help**: Visit [docs/DEVOPS_GUIDE.md](docs/DEVOPS_GUIDE.md)

---

## Environment Variables

Create a `.env.local` or `.env.production` file:

```env
NODE_ENV=production
GOOGLE_GENAI_API_KEY=sk-...
REDIS_PASSWORD=secure_password
NEXT_PUBLIC_API_URL=https://your-domain.com
```

See [.env.example](.env.example) for all available options.

---

## CI/CD Integration

Ready for integration with:
- GitHub Actions
- GitLab CI
- CircleCI
- Jenkins
- Any Docker-compatible CI/CD

---

## License

This project is part of the SPrinovaa Digital Marketing Platform.

---

## Version Info

- **Next.js**: 15.5.9
- **Node.js**: 20 (Alpine)
- **Docker**: 20.10+
- **Docker Compose**: 2.0+

---

