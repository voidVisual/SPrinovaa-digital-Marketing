# ==============================================================================
# Complete DevOps Operations Guide
# ==============================================================================
# SPrinovaa Digital Marketing Platform
# Professional Production Deployment & Management
# Version: 1.0
# Last Updated: January 27, 2026
# ==============================================================================

## Executive Summary

This guide provides comprehensive DevOps documentation for the SPrinovaa Digital Marketing Platform, a production-grade Next.js application with Redis caching and Nginx reverse proxy capabilities.

**Key Points:**
- [x] Production-ready Docker configuration
- [x] Multi-stage builds for optimized images
- [x] Docker Compose orchestration for full stack
- [x] Nginx reverse proxy with SSL/TLS support
- [x] Comprehensive monitoring and logging
- [x] Disaster recovery procedures
- [x] Security best practices

---

## System Architecture

### Components Overview

#### 1. **Application Layer** (Next.js)
- **Technology**: Node.js 20 (Alpine)
- **Port**: 3000 (internal), exposed through Nginx
- **Purpose**: Server-side rendering, API routes, static generation
- **Features**: Hot reload, TypeScript support, API routes
- **Healthcheck**: HTTP endpoint verification every 30s

#### 2. **Cache Layer** (Redis)
- **Technology**: Redis 7 (Alpine)
- **Port**: 6379 (internal only)
- **Purpose**: Session storage, rate limiting, data caching
- **Persistence**: RDB snapshots enabled
- **Security**: Password-protected access
- **Features**: Automatic key expiration, memory optimization

#### 3. **Reverse Proxy** (Nginx)
- **Technology**: Nginx (Alpine)
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Purpose**: SSL termination, load balancing, caching
- **Features**: Gzip compression, static asset caching, rate limiting
- **Security**: Security headers, CORS control, request rate limiting

#### 4. **External Services**
- Google Generative AI API (content generation)
- Analytics services (optional)
- Email services (future enhancement)

---

## Quick Start Guide

### 1. Local Development (15 minutes)

```bash
# Clone repository
git clone <repository-url>
cd SPrinovaa-digital-Marketing

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev

# Access at http://localhost:9002
```

### 2. Production Deployment (30 minutes)

```bash
# Prepare server
ssh user@your-server
cd /app

# Clone repository
git clone <repository-url>
cd SPrinovaa-digital-Marketing

# Configure environment
cp .env.example .env.production
nano .env.production  # Add production secrets

# Build Docker image
docker build -t sprinovaa-app:1.0.0 .

# Start services
docker-compose up -d

# Verify deployment
docker-compose ps
curl http://localhost:3000
```

---

## Quick Reference

### Common Docker Commands

```bash
# Start/Stop
docker-compose up -d                    # Start services
docker-compose down                     # Stop services

# Monitoring
docker-compose ps                       # List services
docker-compose logs -f app              # Follow logs
docker stats                            # Real-time stats

# Restart
docker-compose restart                  # Restart all
docker-compose restart app              # Restart specific

# Troubleshooting
docker-compose logs --tail=100 app      # Last 100 lines
docker exec sprinovaa-app bash          # Enter container
docker system prune -a                  # Clean up
```

---

**For detailed information, see:**
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Complete deployment procedures
- [INFRASTRUCTURE.md](../INFRASTRUCTURE.md) - Architecture and design
- [ENVIRONMENT.md](../ENVIRONMENT.md) - Environment configuration
- [MONITORING.md](../MONITORING.md) - Monitoring and logging

---

**Maintained By**: DevOps Team  
**Last Updated**: January 27, 2026
