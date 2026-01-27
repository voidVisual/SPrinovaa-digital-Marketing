# ==============================================================================
# Infrastructure & Architecture Documentation
# ==============================================================================
# SPrinovaa Digital Marketing Platform - DevOps Infrastructure Guide
# Version: 1.0
# Last Updated: January 27, 2026
# ==============================================================================

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Architecture](#system-architecture)
3. [Infrastructure as Code](#infrastructure-as-code)
4. [Networking Architecture](#networking-architecture)
5. [Security Architecture](#security-architecture)
6. [Scalability & High Availability](#scalability--high-availability)
7. [Disaster Recovery](#disaster-recovery)

---

## Architecture Overview

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Layer                                │
│              (Web Browser / Mobile App)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Load Balancer (Nginx)                        │
│              (SSL/TLS Termination, Caching)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
               ┌─────────────┴─────────────┐
               ▼                           ▼
        ┌──────────────┐           ┌──────────────┐
        │  App Pod 1   │           │  App Pod 2   │
        │  (Next.js)   │           │  (Next.js)   │
        │  Port: 3000  │           │  Port: 3000  │
        └──────────────┘           └──────────────┘
               │                           │
               └─────────────┬─────────────┘
                             │
                             ▼
                ┌──────────────────────────┐
                │   Redis Cache Layer      │
                │   (Session Management)   │
                │   Port: 6379             │
                └──────────────────────────┘
                             │
                ┌────────────┬────────────┐
                ▼            ▼            ▼
            External APIs  Databases  File Storage
```

---

## System Architecture

### Component Description

#### 1. **Load Balancer (Nginx)**
- **Purpose**: Distribute traffic across application instances
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Features**:
  - SSL/TLS termination
  - Request routing
  - Static asset caching
  - Gzip compression
  - Access logging

#### 2. **Application Layer (Next.js)**
- **Framework**: Next.js 15.5.9
- **Runtime**: Node.js 20 (Alpine)
- **Port**: 3000 (internal)
- **Features**:
  - Server-side rendering (SSR)
  - API routes
  - Static site generation (SSG)
  - Incremental static regeneration (ISR)

#### 3. **Cache Layer (Redis)**
- **Purpose**: Session storage, rate limiting, data caching
- **Version**: Redis 7 (Alpine)
- **Port**: 6379 (internal)
- **Features**:
  - Persistent storage (RDB)
  - Password protection
  - Automatic key expiration
  - Memory optimization

#### 4. **External Services**
- **Google Generative AI**: Content generation
- **Analytics Services**: Traffic monitoring
- **Email Services**: Communication (future)

---

## Infrastructure as Code

### Docker Configuration

#### Dockerfile Best Practices

```dockerfile
# Multi-stage builds for optimized images
FROM node:20-alpine AS builder    # Build stage
FROM node:20-alpine              # Runtime stage (smaller size)

# Security
- Non-root user (nextjs:1001)
- Read-only root filesystem option
- Minimal attack surface

# Health Checks
- HTTP endpoint verification
- 30s interval, 10s timeout
- 3 retries before failure

# Logging
- Proper signal handling with dumb-init
- Graceful shutdown support
```

#### Docker Compose Benefits

```yaml
# Single command deployment
docker-compose up -d

# Service orchestration
- Application service
- Redis cache
- Nginx reverse proxy (optional)

# Resource management
- CPU limits: 2 cores max, 1 core reserved
- Memory limits: 2GB max, 1GB reserved

# Networking
- Private network isolation
- Service discovery via DNS
- Port exposure control

# Volumes
- Data persistence
- Bind mounts for configuration
- Named volumes for databases
```

---

## Networking Architecture

### Network Design

```yaml
Network: sprinovaa-network (Bridge)
├── App Container
│   ├── Internal Port: 3000
│   ├── External Port: 3000 (through Nginx)
│   └── Network Alias: app
├── Redis Container
│   ├── Internal Port: 6379
│   ├── Network Alias: redis
│   └── Exposed: app container only
└── Nginx Container
    ├── Internal Port: 80, 443
    ├── External Ports: 80, 443
    └── Network Alias: nginx
```

### Communication Flow

1. **Client → Nginx**: HTTPS connection (port 443)
2. **Nginx → App**: HTTP connection (internal port 3000)
3. **App → Redis**: TCP connection (internal port 6379)
4. **App → External APIs**: HTTPS (outbound)

### DNS Configuration

For production deployment, configure DNS:

```
Type    Name                    Value
A       your-domain.com         Your server IP
CNAME   www.your-domain.com     your-domain.com
CNAME   api.your-domain.com     your-domain.com
TXT     your-domain.com         (SSL verification)
```

---

## Security Architecture

### Container Security

#### 1. **Image Security**
```bash
# Regular scanning
docker scan sprinovaa-app:latest

# Update base images weekly
docker pull node:20-alpine

# Sign images
docker trust sign your-registry/sprinovaa-app:latest
```

#### 2. **Runtime Security**
```dockerfile
# Non-root user
USER nextjs

# Read-only filesystem (optional)
docker run --read-only ...

# Limited capabilities
docker run --cap-drop=ALL ...

# Resource limits
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 2G
```

#### 3. **Secret Management**

```bash
# Use Docker secrets (Swarm) or environment variables
# DO NOT hardcode secrets in Dockerfile or docker-compose.yml

# Example: Using .env file
GOOGLE_GENAI_API_KEY=sk-...
REDIS_PASSWORD=secure_password

# Or use external secret managers:
# - HashiCorp Vault
# - AWS Secrets Manager
# - DigitalOcean App Platform Secrets
```

### Network Security

```yaml
# Network isolation
networks:
  sprinovaa-network:
    driver: bridge
    # Internal containers cannot access external networks
    # unless explicitly exposed

# Firewall rules
- Allow port 80 (HTTP)
- Allow port 443 (HTTPS)
- Allow port 22 (SSH) from authorized IPs only
- Deny all other inbound traffic
- Allow all outbound traffic (for API calls)
```

### HTTPS/TLS Configuration

```nginx
# Nginx reverse proxy configuration
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL certificates
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;

    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS (force HTTPS)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

---

## Scalability & High Availability

### Horizontal Scaling

#### Docker Swarm Approach

```bash
# Initialize swarm
docker swarm init

# Create service with replicas
docker service create \
  --replicas 3 \
  --name sprinovaa-app \
  sprinovaa-app:latest

# Scale up/down
docker service scale sprinovaa-app=5
```

#### Kubernetes Approach

```yaml
# Deployment manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sprinovaa-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sprinovaa
  template:
    metadata:
      labels:
        app: sprinovaa
    spec:
      containers:
      - name: app
        image: sprinovaa-app:latest
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```

### Vertical Scaling

Upgrade server resources:
- Increase vCPU from 2 to 4
- Increase RAM from 4GB to 8GB
- Upgrade storage from 50GB to 100GB

### Load Balancing Strategy

```nginx
# Nginx upstream configuration
upstream app_backend {
    # Round-robin distribution
    server app1.internal:3000;
    server app2.internal:3000;
    server app3.internal:3000;

    # Least connections (optional)
    least_conn;

    # Session persistence (if needed)
    hash $remote_addr consistent;
}

server {
    location / {
        proxy_pass http://app_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Auto-Scaling Configuration

#### Using Docker Compose (Manual Scaling)

```bash
# Scale specific service
docker-compose up -d --scale app=3
```

#### Using Kubernetes (Automatic)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: sprinovaa-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: sprinovaa-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## Disaster Recovery

### Backup Strategy

#### Database Backups (Redis)

```bash
# Automatic RDB snapshots
# (Configured in docker-compose.yml)

# Manual backup
docker exec sprinovaa-redis redis-cli BGSAVE

# Backup to file
docker exec sprinovaa-redis redis-cli \
  --rdb /data/backup-$(date +%Y%m%d).rdb
```

#### Application Backups

```bash
# Backup volumes
docker run --rm \
  -v sprinovaa_redis-data:/data \
  -v /backups:/backup \
  busybox tar czf /backup/app-$(date +%Y%m%d).tar.gz /data

# Backup to S3
aws s3 cp /backups/app-20260127.tar.gz \
  s3://my-backup-bucket/
```

### Recovery Procedures

#### 1. **Container Failure Recovery**

```bash
# Docker automatically restarts containers
restart: always

# Manual restart
docker-compose restart app

# Restart specific service
docker-compose up -d --no-deps --build app
```

#### 2. **Data Loss Recovery**

```bash
# Stop container
docker-compose stop redis

# Restore from backup
docker run --rm \
  -v sprinovaa_redis-data:/data \
  -v /backups:/backup \
  busybox tar xzf /backup/redis-20260127.tar.gz -C /data

# Start container
docker-compose start redis
```

#### 3. **Complete System Recovery**

```bash
# 1. Backup current state
docker-compose down -v

# 2. Pull fresh images
docker-compose pull

# 3. Restore data
tar xzf /backups/complete-backup.tar.gz

# 4. Start fresh deployment
docker-compose up -d

# 5. Verify
docker-compose ps
curl http://localhost:3000
```

### Backup Retention Policy

```
Daily Backups:   Keep 7 days
Weekly Backups:  Keep 4 weeks
Monthly Backups: Keep 12 months
```

---

## Monitoring & Observability

### Key Metrics to Monitor

1. **Application Metrics**
   - Response time (p50, p95, p99)
   - Request rate (req/s)
   - Error rate (4xx, 5xx)
   - Active connections

2. **Infrastructure Metrics**
   - CPU usage (%)
   - Memory usage (GB)
   - Disk I/O (read/write ops)
   - Network I/O (bytes/s)

3. **Redis Metrics**
   - Connected clients
   - Memory usage
   - Commands/sec
   - Cache hit rate

### Monitoring Tools

- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **ELK Stack**: Log aggregation
- **Datadog**: Full-stack monitoring
- **New Relic**: Application performance

---

## Infrastructure Costs (Estimated)

### Cloud Provider Cost Estimates (Monthly)

| Provider | Instance Type | Specs | Cost |
|----------|---------------|-------|------|
| AWS | t3.medium | 2vCPU, 4GB RAM | $30 |
| DigitalOcean | 4GB Droplet | 2vCPU, 4GB RAM | $20 |
| Linode | Nanode 2GB | 1vCPU, 2GB RAM | $5 |
| Google Cloud | e2-medium | 2vCPU, 4GB RAM | $25 |
| Azure | B2s | 2vCPU, 4GB RAM | $30 |

**Estimate**: $20-30/month for production-grade hosting

---

## Maintenance Schedule

### Daily
- Monitor error rates
- Check disk usage
- Verify backups completed

### Weekly
- Review performance metrics
- Update dependencies
- Security patches

### Monthly
- Full system backup
- Disaster recovery test
- Capacity planning review

### Quarterly
- Major updates
- Architecture review
- Cost optimization analysis

---

**Maintained By**: DevOps Team  
**Last Updated**: January 27, 2026
