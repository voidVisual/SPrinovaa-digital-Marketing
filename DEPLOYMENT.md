# ==============================================================================
# Deployment Guide - SPrinovaa Digital Marketing Platform
# ==============================================================================
# Production-Grade Deployment Documentation
# Version: 1.0
# Last Updated: January 27, 2026
# ==============================================================================

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Infrastructure Requirements](#infrastructure-requirements)
3. [Docker Setup & Deployment](#docker-setup--deployment)
4. [Production Deployment](#production-deployment)
5. [Health Checks & Monitoring](#health-checks--monitoring)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

### System Requirements

- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+
- **Operating System**: Linux (Ubuntu 20.04+ recommended), macOS, or Windows with WSL2
- **Disk Space**: Minimum 10GB free
- **Memory**: Minimum 4GB RAM (8GB+ recommended)
- **CPU**: Multi-core processor (2+ cores)

### Required Knowledge

- Familiarity with Docker and containerization
- Understanding of Linux/Unix commands
- Basic knowledge of networking and reverse proxies
- Git version control basics

---

## Infrastructure Requirements

### Production Environment Specifications

| Component | Specification | Purpose |
|-----------|---------------|---------|
| **Server** | 2-4 vCPU | Application execution |
| **Memory** | 4-8 GB RAM | Container runtime overhead |
| **Storage** | 50GB SSD | Application code, logs, cache |
| **Network** | 1Gbps+ | Request/response throughput |
| **Bandwidth** | Unlimited | Production traffic handling |

### Recommended Cloud Platforms

- **AWS EC2** (t3.medium or larger)
- **DigitalOcean** (4GB RAM droplet or larger)
- **Linode** (8GB RAM instance)
- **Google Cloud Compute Engine** (e2-medium or larger)
- **Azure Virtual Machines** (Standard B2s or larger)

---

## Docker Setup & Deployment

### Step 1: Build Docker Image

```bash
# Clone the repository
git clone <repository-url>
cd SPrinovaa-digital-Marketing

# Build the Docker image
docker build -t sprinovaa-app:latest .

# Tag for registry (optional)
docker tag sprinovaa-app:latest your-registry/sprinovaa-app:latest

# Push to registry (optional)
docker push your-registry/sprinovaa-app:latest
```

### Step 2: Environment Configuration

Create a `.env` file in the project root:

```bash
# Copy example environment file
cp .env.example .env

# Edit with your configuration
nano .env
```

**Required Environment Variables:**

```env
# Node Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# API Keys & Secrets
GOOGLE_GENAI_API_KEY=your_genai_api_key_here

# Redis Configuration
REDIS_PASSWORD=secure_redis_password_here

# Application URLs
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=SPrinovaa

# Logging
LOG_LEVEL=info
```

### Step 3: Deploy with Docker Compose

```bash
# Navigate to project directory
cd /path/to/SPrinovaa-digital-Marketing

# Pull latest images
docker-compose pull

# Start services in detached mode
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f app
```

### Step 4: Verify Deployment

```bash
# Check if application is responding
curl http://localhost:3000

# Check container health
docker-compose exec app node -e "require('http').get('http://localhost:3000', (r) => console.log('Health:', r.statusCode))"

# View resource usage
docker stats

# Inspect container logs
docker-compose logs --tail=100 app
```

---

## Production Deployment

### Option A: Standalone Server Deployment

```bash
# 1. SSH into your production server
ssh user@production-server

# 2. Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Clone repository
git clone <repository-url>
cd SPrinovaa-digital-Marketing

# 4. Configure environment
cp .env.example .env
# Edit .env with production values
nano .env

# 5. Start application
docker-compose up -d

# 6. Verify health
docker-compose ps
```

### Option B: Kubernetes Deployment

For Kubernetes clusters, convert Docker Compose to Kubernetes manifests:

```bash
# Using Kompose (convert Docker Compose to K8s)
kompose convert -f docker-compose.yml -o k8s/

# Or manually create deployment manifests in k8s/ directory
kubectl apply -f k8s/
```

### Option C: Container Registry Deployment

```bash
# Build and push to registry
docker build -t your-registry/sprinovaa-app:1.0.0 .
docker push your-registry/sprinovaa-app:1.0.0

# Pull from registry in production
docker pull your-registry/sprinovaa-app:1.0.0
docker run -d -p 3000:3000 your-registry/sprinovaa-app:1.0.0
```

---

## Health Checks & Monitoring

### Docker Health Monitoring

```bash
# View health status
docker inspect --format='{{.State.Health.Status}}' sprinovaa-app

# View detailed health information
docker inspect --format='{{json .State.Health}}' sprinovaa-app | jq

# Monitor in real-time
watch 'docker inspect sprinovaa-app | grep -A 5 Health'
```

### Application Endpoint Monitoring

```bash
# Check application endpoint
curl -s http://localhost:3000 | head -20

# Check health endpoint (implement in your Next.js app)
curl http://localhost:3000/api/health

# Monitor with status code
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
```

### Log Monitoring

```bash
# Follow application logs
docker-compose logs -f app

# View last 100 lines
docker-compose logs --tail=100 app

# Export logs for analysis
docker-compose logs app > app-logs.txt

# Monitor Redis cache
docker-compose logs -f redis

# Monitor Nginx (if enabled)
docker-compose logs -f nginx
```

### Resource Usage Monitoring

```bash
# View live resource consumption
docker stats

# View specific container stats
docker stats sprinovaa-app

# Export stats to CSV (for analysis)
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" > container-stats.txt
```

### Automated Monitoring Setup

Install monitoring tools for production environments:

```bash
# Option 1: Prometheus + Grafana
docker pull prom/prometheus
docker pull grafana/grafana

# Option 2: CloudWatch (AWS)
# Option 3: DigitalOcean Monitoring
# Option 4: New Relic Agent
```

---

## Troubleshooting

### Issue: Container fails to start

```bash
# Check container logs
docker logs sprinovaa-app

# Inspect container state
docker inspect sprinovaa-app | grep -A 5 State

# Rebuild image
docker build --no-cache -t sprinovaa-app:latest .

# Check port conflicts
lsof -i :3000
```

### Issue: Out of memory errors

```bash
# Increase container memory limit in docker-compose.yml
# Modify the deploy.resources.limits.memory value

# Monitor memory usage
docker stats sprinovaa-app

# Check process memory
docker top sprinovaa-app
```

### Issue: High CPU usage

```bash
# Identify CPU-intensive processes
docker top sprinovaa-app

# View container performance
docker stats --no-stream

# Check for infinite loops in logs
docker logs sprinovaa-app | grep error
```

### Issue: Network connectivity problems

```bash
# Check network connectivity
docker exec sprinovaa-app ping redis

# Verify DNS resolution
docker exec sprinovaa-app nslookup redis

# Inspect network
docker network inspect sprinovaa-network

# Test port accessibility
docker exec sprinovaa-app curl -v http://redis:6379
```

### Issue: Persistent data loss

```bash
# Verify volume mounts
docker inspect sprinovaa-app | grep -A 10 Mounts

# Check volume contents
docker run -it --rm -v sprinovaa_redis-data:/data busybox ls -la /data

# Backup volumes
docker run --rm -v sprinovaa_redis-data:/data -v $(pwd):/backup busybox tar czf /backup/redis-backup.tar.gz /data
```

---

## Rollback Procedures

### Rollback to Previous Version

```bash
# 1. Stop current containers
docker-compose down

# 2. Switch to previous image tag
docker tag sprinovaa-app:previous sprinovaa-app:latest

# 3. Start with previous version
docker-compose up -d

# 4. Verify rollback
docker-compose ps
curl http://localhost:3000
```

### Rollback with Version Management

```bash
# Tag each production deployment
docker build -t sprinovaa-app:v1.0.0 .
docker build -t sprinovaa-app:v1.0.1 .

# Update docker-compose.yml to specify version
# image: sprinovaa-app:v1.0.0

# Deploy specific version
docker-compose up -d

# Rollback to previous version
sed -i 's/:v1\.0\.1/:v1.0.0/g' docker-compose.yml
docker-compose up -d
```

### Data Rollback

```bash
# Restore Redis backup
docker run --rm -v sprinovaa_redis-data:/data -v $(pwd):/backup busybox tar xzf /backup/redis-backup.tar.gz -C /data

# Restart Redis service
docker-compose restart redis

# Verify data integrity
docker exec sprinovaa-redis redis-cli INFO
```

---

## Performance Optimization

### Database Connection Pooling

Configure Redis for optimal performance:

```yaml
# docker-compose.yml
redis:
  command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
```

### Application Caching

Implement caching headers in Next.js:

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.status(200).json({ status: 'healthy' });
}
```

### Load Balancing

Enable Nginx reverse proxy in docker-compose.yml (uncommented).

---

## Backup & Disaster Recovery

```bash
# Backup application data
docker-compose exec redis redis-cli BGSAVE
docker run --rm -v sprinovaa_redis-data:/data -v /backups:/backup \
  busybox tar czf /backup/app-$(date +%Y%m%d).tar.gz /data

# Backup all volumes
docker run --rm -v sprinovaa_redis-data:/data -v sprinovaa_app-logs:/logs \
  -v /backups:/backup busybox \
  tar czf /backup/volumes-$(date +%Y%m%d).tar.gz /data /logs

# Test restore
docker run --rm -v sprinovaa_redis-data:/data -v /backups:/backup \
  busybox tar xzf /backup/app-20260127.tar.gz -C /data
```

---

## Security Checklist

- [ ] Use HTTPS/TLS for all communications
- [ ] Set strong Redis password
- [ ] Run containers as non-root user
- [ ] Regularly update base images
- [ ] Implement network policies
- [ ] Enable logging and monitoring
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Enable CORS properly
- [ ] Regular security audits

---

## Support & Documentation

For additional support:
- Review Docker logs: `docker-compose logs`
- Check container health: `docker-compose ps`
- Inspect configurations: Review `docker-compose.yml` and `.env`

**Last Updated**: January 27, 2026
**Maintained By**: DevOps Team
