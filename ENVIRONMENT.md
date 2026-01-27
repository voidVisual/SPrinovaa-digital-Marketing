# ==============================================================================
# Environment Configuration & Setup Guide
# ==============================================================================
# SPrinovaa Digital Marketing Platform - Environment Setup
# Version: 1.0
# Last Updated: January 27, 2026
# ==============================================================================

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Local Development Setup](#local-development-setup)
3. [Staging Environment](#staging-environment)
4. [Production Environment](#production-environment)
5. [Environment-Specific Configurations](#environment-specific-configurations)
6. [Secrets Management](#secrets-management)

---

## Environment Variables

### Overview

The application uses environment variables for configuration across different deployment environments. This allows for secure, flexible deployments without code changes.

### Variable Categories

1. **Node Configuration**
   - NODE_ENV
   - NEXT_TELEMETRY_DISABLED
   - PORT

2. **API Keys & Credentials**
   - GOOGLE_GENAI_API_KEY
   - Other service API keys

3. **Database & Cache**
   - REDIS_PASSWORD
   - REDIS_URL (if external Redis)

4. **Application URLs**
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_APP_NAME

5. **Logging & Monitoring**
   - LOG_LEVEL
   - SENTRY_DSN (optional)

---

## Local Development Setup

### Prerequisites

```bash
# Check Node.js version
node --version  # Should be 20+

# Check npm version
npm --version   # Should be 9+

# Check Docker
docker --version
docker-compose --version
```

### Step 1: Clone Repository

```bash
git clone https://github.com/your-org/SPrinovaa-digital-Marketing.git
cd SPrinovaa-digital-Marketing
```

### Step 2: Create Environment File

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your development values
nano .env.local
```

### Step 3: Development Environment Variables

```env
# Development Configuration
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# API Configuration
GOOGLE_GENAI_API_KEY=your_dev_api_key

# Redis (local)
REDIS_PASSWORD=dev_password

# Application URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SPrinovaa-Dev

# Logging
LOG_LEVEL=debug
```

### Step 4: Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list

# Check for vulnerabilities
npm audit
```

### Step 5: Run Development Server

#### Option A: Native Node.js

```bash
# Start development server with turbopack
npm run dev

# Server starts at http://localhost:9002
```

#### Option B: Docker Container

```bash
# Build Docker image
docker build -t sprinovaa-dev:latest .

# Run with hot-reload
docker run -it --rm \
  -p 3000:3000 \
  -v $(pwd):/app \
  -e NODE_ENV=development \
  sprinovaa-dev:latest npm run dev
```

#### Option C: Docker Compose

```bash
# Start all services
docker-compose up

# App available at http://localhost:3000
# Redis available at localhost:6379
```

### Step 6: Verify Setup

```bash
# Check application
curl http://localhost:3000

# Check API endpoints
curl http://localhost:3000/api/health

# Check Redis connection
docker-compose exec redis redis-cli ping
# Expected: PONG
```

---

## Staging Environment

### Purpose

- Test production-like configurations
- Validate deployments before production
- Performance testing
- Client acceptance testing (UAT)

### Environment File: `.env.staging`

```env
# Staging Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# API Keys
GOOGLE_GENAI_API_KEY=your_staging_api_key

# Redis
REDIS_PASSWORD=strong_staging_password

# Application URLs
NEXT_PUBLIC_API_URL=https://staging.your-domain.com
NEXT_PUBLIC_APP_NAME=SPrinovaa-Staging

# Logging
LOG_LEVEL=info

# Monitoring
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Feature Flags (optional)
ENABLE_ANALYTICS=true
ENABLE_DEBUG=false
```

### Deployment Commands

```bash
# Build staging image
docker build -t sprinovaa-staging:latest .

# Load staging environment
docker-compose --env-file .env.staging up -d

# Verify deployment
docker-compose ps
curl https://staging.your-domain.com
```

### Testing in Staging

```bash
# Load testing
docker run -it --rm \
  loadimpact/k6 run \
  -e URL=https://staging.your-domain.com \
  load-test.js

# Health check
for i in {1..10}; do \
  curl -o /dev/null -s -w "%{http_code}\n" https://staging.your-domain.com; \
done
```

---

## Production Environment

### Environment File: `.env.production`

```env
# Production Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# API Keys (use secure vaults)
GOOGLE_GENAI_API_KEY=${VAULT_GENAI_KEY}

# Redis
REDIS_PASSWORD=${VAULT_REDIS_PASSWORD}

# Application URLs
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=SPrinovaa

# Logging
LOG_LEVEL=warn

# Monitoring
SENTRY_DSN=${VAULT_SENTRY_DSN}

# Security
ENABLE_CORS=true
CORS_ORIGIN=https://your-domain.com

# Performance
CACHE_DURATION=3600
SESSION_TIMEOUT=1800
```

### Deployment Process

```bash
# 1. Prepare environment file
scp .env.production user@prod-server:/home/user/

# 2. SSH into production server
ssh user@prod-server

# 3. Pull latest code
git pull origin main

# 4. Load environment variables
source .env.production

# 5. Build and deploy
docker-compose -f docker-compose.yml pull
docker-compose -f docker-compose.yml up -d

# 6. Verify deployment
docker-compose ps
docker-compose logs app | head -20
curl https://your-domain.com
```

### Production Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] SSL certificates installed
- [ ] Database backups configured
- [ ] Monitoring and alerting enabled
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Disaster recovery plan tested
- [ ] Team notified of deployment
- [ ] Rollback procedure documented
- [ ] Change log updated

---

## Environment-Specific Configurations

### Development

```yaml
Features:
  - Hot module reloading
  - Verbose logging
  - Source maps included
  - Debugging enabled
  - Mock data available
  - API rate limiting disabled

Performance:
  - Optimizations disabled
  - Development builds (larger)
  - No caching
```

### Staging

```yaml
Features:
  - Production-like configuration
  - Real API keys
  - Limited logging
  - Client-side error reporting
  - Performance optimizations enabled
  - Staging-specific data

Performance:
  - Cache enabled
  - Optimization enabled
  - CDN configured
  - Compression enabled
```

### Production

```yaml
Features:
  - Maximum security
  - Minimal logging
  - Error reporting enabled
  - All optimizations enabled
  - Production data only
  - Rate limiting enabled

Performance:
  - Full caching
  - Full optimization
  - CDN with aggressive caching
  - HTTP/2, Gzip, Brotli compression
```

---

## Secrets Management

### Local Development

Store secrets in `.env.local` (Git-ignored):

```bash
# Add to .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore

# Create .env.local
GOOGLE_GENAI_API_KEY=sk-dev-key
REDIS_PASSWORD=dev_password
```

### Docker Secrets (Swarm)

```bash
# Create secret
echo "secure_password" | docker secret create redis_password -

# Use in docker-compose.yml
secrets:
  redis_password:
    external: true

services:
  redis:
    environment:
      REDIS_PASSWORD_FILE: /run/secrets/redis_password
```

### HashiCorp Vault

```bash
# Store secret in Vault
vault kv put secret/sprinovaa/prod \
  genai_key="sk-..." \
  redis_password="..."

# Retrieve in deployment
vault kv get secret/sprinovaa/prod | jq .data.data
```

### AWS Secrets Manager

```bash
# Store secret
aws secretsmanager create-secret \
  --name sprinovaa/prod \
  --secret-string '{"genai_key":"sk-...","redis_password":"..."}'

# Retrieve in application
import boto3
client = boto3.client('secretsmanager')
secret = client.get_secret_value(SecretId='sprinovaa/prod')
```

### DigitalOcean App Platform

```bash
# Add secrets via dashboard or CLI
doctl apps spec get <app-id> > app.yaml

# Edit secrets section
secrets:
  - key: GOOGLE_GENAI_API_KEY
    value: ${GOOGLE_GENAI_API_KEY}
  - key: REDIS_PASSWORD
    value: ${REDIS_PASSWORD}

# Deploy
doctl apps update <app-id> --spec app.yaml
```

---

## Environment Variable Reference

### Complete Variable List

| Variable | Required | Type | Example | Notes |
|----------|----------|------|---------|-------|
| `NODE_ENV` | Yes | String | `production` | `development`, `staging`, `production` |
| `PORT` | No | Number | `3000` | Default: 3000 |
| `NEXT_TELEMETRY_DISABLED` | No | Boolean | `1` | Disable Next.js telemetry |
| `GOOGLE_GENAI_API_KEY` | Yes | String | `sk-...` | Get from Google Cloud |
| `REDIS_PASSWORD` | Yes | String | `secure_pass` | Min 12 chars recommended |
| `NEXT_PUBLIC_API_URL` | No | String | `https://your-domain.com` | Public API endpoint |
| `NEXT_PUBLIC_APP_NAME` | No | String | `SPrinovaa` | Display name |
| `LOG_LEVEL` | No | String | `info` | `debug`, `info`, `warn`, `error` |
| `SENTRY_DSN` | No | String | `https://...` | Error tracking |

---

## Troubleshooting Environment Setup

### Issue: Port already in use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: Environment variables not loading

```bash
# Verify .env file exists
ls -la .env.local

# Check environment
echo $NODE_ENV
echo $GOOGLE_GENAI_API_KEY

# Load manually
source .env.local
npm run dev
```

### Issue: Redis connection refused

```bash
# Check Redis is running
docker-compose ps redis

# Verify password
docker-compose exec redis redis-cli -a ${REDIS_PASSWORD} ping

# Restart Redis
docker-compose restart redis
```

### Issue: API key errors

```bash
# Verify API key is valid
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: ${GOOGLE_GENAI_API_KEY}" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'

# Check key has correct permissions
# Visit https://console.cloud.google.com/apis/credentials
```

---

## Best Practices

[x] **DO:**
- Use `.env.local` for local development
- Never commit `.env` files
- Use strong, unique passwords
- Rotate secrets regularly
- Use centralized secret management for production
- Document required variables
- Use environment-specific configurations

[x] **DON'T:**
- Hardcode secrets in code
- Commit `.env` files
- Share API keys over email
- Use same secrets across environments
- Log sensitive information
- Store secrets in version control
- Use simple passwords

---

**Maintained By**: DevOps Team  
**Last Updated**: January 27, 2026
