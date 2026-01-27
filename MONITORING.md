# ==============================================================================
# Monitoring & Observability Guide
# ==============================================================================
# SPrinovaa Digital Marketing Platform - Production Monitoring
# Version: 1.0
# Last Updated: January 27, 2026
# ==============================================================================

## Table of Contents

1. [Monitoring Overview](#monitoring-overview)
2. [Metrics Collection](#metrics-collection)
3. [Logging Strategy](#logging-strategy)
4. [Alerting & Notifications](#alerting--notifications)
5. [Performance Monitoring](#performance-monitoring)
6. [Troubleshooting Guide](#troubleshooting-guide)
7. [Log Analysis](#log-analysis)

---

## Monitoring Overview

### Monitoring Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                  Observability                              │
├──────────┬────────────────┬──────────────┬──────────────────┤
│ Metrics  │  Logs          │ Traces       │ Health Checks    │
├──────────┼────────────────┼──────────────┼──────────────────┤
│ - CPU    │ - App logs     │ - Requests   │ - HTTP endpoints │
│ - Memory │ - Error logs   │ - Spans      │ - Services       │
│ - Disk   │ - Access logs  │ - Latency    │ - Dependencies   │
│ - Network│ - Event logs   │ - Errors     │ - Databases      │
└──────────┴────────────────┴──────────────┴──────────────────┘
```

### Key Monitoring Areas

1. **Application Health**
   - Response times
   - Error rates
   - Request throughput
   - Cache hit rates

2. **Infrastructure Health**
   - CPU usage
   - Memory consumption
   - Disk I/O
   - Network throughput

3. **Service Dependencies**
   - Redis connectivity
   - External API responses
   - Database performance
   - Third-party services

---

## Metrics Collection

### Docker Stats Monitoring

#### Real-time Metrics

```bash
# Monitor all containers
docker stats

# Monitor specific container
docker stats sprinovaa-app

# Collect metrics to file
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" > metrics.csv
```

#### Expected Metrics

| Metric | Normal Range | Warning | Critical |
|--------|--------------|---------|----------|
| CPU % | 10-30% | >50% | >80% |
| Memory | 500-800 MB | >1.5GB | >2GB |
| Network I/O | <10MB/s | 10-50MB/s | >50MB/s |

### Prometheus Setup (Optional)

#### Installation

```bash
# Create Prometheus configuration
mkdir -p prometheus
cat > prometheus/prometheus.yml << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis:6379']

  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
EOF
```

#### Docker Compose Integration

```yaml
prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    - prometheus-data:/prometheus
  ports:
    - "9090:9090"
  command:
    - '--config.file=/etc/prometheus/prometheus.yml'
```

#### Access Prometheus

```
http://localhost:9090/graph
```

### Key Performance Indicators (KPIs)

```
Application Metrics:
├── Request Rate (req/s)
├── Response Time (p50, p95, p99)
├── Error Rate (4xx, 5xx %)
├── Cache Hit Rate (%)
└── API Availability (%)

Infrastructure Metrics:
├── CPU Usage (%)
├── Memory Usage (%)
├── Disk Usage (%)
├── Network I/O (MB/s)
└── Container Health Status

Business Metrics:
├── Active Users
├── Conversion Rate
├── Page Load Time
├── User Engagement
└── Cost per Transaction
```

---

## Logging Strategy

### Application Logging

#### Docker Compose Logging Configuration

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"      # Rotate when 10MB
        max-file: "3"        # Keep 3 rotated logs
        labels: "service=app"
```

#### View Logs

```bash
# Follow application logs
docker-compose logs -f app

# View last 100 lines
docker-compose logs --tail=100 app

# View logs from specific time
docker-compose logs --since 10m app

# Export logs
docker-compose logs app > app-logs.txt

# Filter logs by pattern
docker-compose logs app | grep ERROR
```

### Log Levels

```
DEBUG   - Detailed debugging information
INFO    - General informational messages
WARN    - Warning messages for potentially harmful situations
ERROR   - Error messages for recoverable errors
FATAL   - Fatal errors that cause shutdown
```

### Production Logging Configuration

```env
# Enable appropriate log level
LOG_LEVEL=info

# Disable verbose debug logs
DEBUG=false

# Enable structured logging
STRUCTURED_LOGGING=true

# Set log output format
LOG_FORMAT=json
```

### Log Rotation

```bash
# Automatic rotation via docker-compose
max-size: "10m"     # Rotate at 10MB
max-file: "3"       # Keep 3 files
compress: "true"    # Compress rotated files

# Total disk usage: ~30MB for logs
```

### Centralized Logging (ELK Stack)

#### Setup

```yaml
# Add to docker-compose.yml
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
  environment:
    - discovery.type=single-node
    - xpack.security.enabled=false

kibana:
  image: docker.elastic.co/kibana/kibana:8.0.0
  ports:
    - "5601:5601"
  depends_on:
    - elasticsearch

logstash:
  image: docker.elastic.co/logstash/logstash:8.0.0
  volumes:
    - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
  depends_on:
    - elasticsearch
```

#### Access Kibana

```
http://localhost:5601
```

---

## Alerting & Notifications

### Alert Rules

#### Critical Alerts

```
1. Service Down
   - Trigger: 3 failed health checks in 1 minute
   - Action: Immediate notification, auto-restart

2. High Error Rate
   - Trigger: >5% error rate in 5 minutes
   - Action: Alert DevOps, check logs

3. High Memory Usage
   - Trigger: >85% memory for 5 minutes
   - Action: Alert, prepare scaling

4. Disk Space Critical
   - Trigger: <10% disk free
   - Action: Immediate alert, cleanup old logs
```

#### Warning Alerts

```
1. Elevated Response Time
   - Trigger: p95 latency >2000ms for 10 minutes
   - Action: Investigation, optional notification

2. Moderate Error Rate
   - Trigger: 1-5% error rate for 5 minutes
   - Action: Monitor, log event

3. Cache Hit Rate Low
   - Trigger: <80% hit rate for 15 minutes
   - Action: Analyze patterns, possible misconfiguration
```

### Notification Channels

#### Email Alerts

```bash
# Configure SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@your-domain.com
SMTP_PASSWORD=app_password

# Alert recipients
ALERT_EMAIL_CRITICAL=devops@your-domain.com,on-call@your-domain.com
ALERT_EMAIL_WARNING=devops@your-domain.com
```

#### Slack Integration

```bash
# Incoming webhooks (get from Slack workspace)
SLACK_WEBHOOK_CRITICAL=your_webhook_url
SLACK_WEBHOOK_WARNING=your_webhook_url
```

#### PagerDuty Integration

```bash
# Integration key
PAGERDUTY_KEY=YOUR_INTEGRATION_KEY

# Alert escalation policy
PAGERDUTY_ESCALATION_POLICY=5-minute escalation
```

---

## Performance Monitoring

### Application Performance

#### Monitor Request Metrics

```bash
# Track requests
docker-compose logs app | grep "request" | tail -20

# Analyze response times
docker-compose logs app | grep "duration"

# Check error rates
docker-compose logs app | grep "ERROR" | wc -l

# Calculate error rate
total=$(docker-compose logs app | wc -l)
errors=$(docker-compose logs app | grep "ERROR" | wc -l)
percentage=$((errors * 100 / total))
echo "Error rate: ${percentage}%"
```

#### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 100 http://localhost:3000/

# Using k6
docker run -it --rm \
  -v $(pwd):/scripts \
  loadimpact/k6 run /scripts/load-test.js

# Using wrk
wrk -t4 -c100 -d30s http://localhost:3000/
```

### Infrastructure Performance

#### CPU Monitoring

```bash
# Current CPU usage
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}"

# Monitor over time
watch -n 2 'docker stats --no-stream'

# Top CPU-consuming processes
docker top sprinovaa-app
```

#### Memory Monitoring

```bash
# Current memory usage
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}"

# Memory trend
docker stats --no-stream sprinovaa-app | awk '{print $0, strftime("%Y-%m-%d %H:%M:%S")}'

# Check for memory leaks
# Monitor memory usage over hours/days
```

#### Disk I/O Monitoring

```bash
# Check disk usage
docker exec sprinovaa-app df -h

# Monitor I/O operations
docker stats --no-stream --format "table {{.Container}}\t{{.BlockIO}}"

# Analyze large files
docker exec sprinovaa-app find / -size +100M -type f
```

### Database Performance

#### Redis Metrics

```bash
# Connect to Redis CLI
docker-compose exec redis redis-cli

# Monitor commands
> MONITOR

# Server info
> INFO

# Memory usage
> INFO memory

# Connected clients
> INFO clients

# Keyspace statistics
> INFO keyspace
```

---

## Troubleshooting Guide

### Problem: High CPU Usage

```bash
# 1. Identify CPU-heavy process
docker top sprinovaa-app

# 2. Check application logs
docker-compose logs app | grep -i "cpu\|expensive\|loop"

# 3. Profile the application
docker exec sprinovaa-app node --prof app.js
docker exec sprinovaa-app node --prof-process isolate-*.log > profile.txt

# 4. Monitor CPU over time
while true; do
  echo "$(date): $(docker stats --no-stream sprinovaa-app | awk 'NR==2 {print $3}')"
  sleep 5
done
```

### Problem: High Memory Usage

```bash
# 1. Check memory limits
docker inspect sprinovaa-app | grep -A 5 MemoryLimit

# 2. Identify memory usage
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}\t{{.MemLimit}}"

# 3. Check for memory leaks
docker exec sprinovaa-app node --expose-gc app.js

# 4. Increase memory limit
# Edit docker-compose.yml:
# deploy:
#   resources:
#     limits:
#       memory: 3G

# 5. Restart with new limits
docker-compose up -d --force-recreate app
```

### Problem: Slow Response Times

```bash
# 1. Check network latency
docker exec sprinovaa-app ping redis

# 2. Monitor response time
docker-compose logs app | grep "duration" | tail -20

# 3. Check database performance
docker-compose exec redis redis-cli --stat

# 4. Enable debug logging
LOG_LEVEL=debug docker-compose up app

# 5. Profile slow endpoints
# Add timing middleware in application code
```

### Problem: Connection Refused

```bash
# 1. Check if service is running
docker-compose ps

# 2. Check port binding
docker port sprinovaa-app

# 3. Test connectivity
docker exec sprinovaa-app curl -v http://redis:6379

# 4. Check network
docker network inspect sprinovaa-network

# 5. Restart services
docker-compose restart
```

### Problem: Disk Space Full

```bash
# 1. Check disk usage
docker system df

# 2. Remove old logs
docker-compose logs --tail=0 app > /dev/null

# 3. Clean up stopped containers
docker container prune -f

# 4. Remove unused images
docker image prune -a -f

# 5. Remove old volumes
docker volume prune -f
```

---

## Log Analysis

### Common Log Patterns

#### Error Analysis

```bash
# Count errors by type
docker-compose logs app | grep ERROR | awk '{print $NF}' | sort | uniq -c | sort -rn

# Find recent errors
docker-compose logs app | grep ERROR | tail -50

# Error frequency timeline
docker-compose logs app | grep ERROR | awk '{print $2}' | sort | uniq -c
```

#### Performance Analysis

```bash
# Extract response times
docker-compose logs app | grep "duration" | awk '{print $(NF-1)}' | sort -n | tail -20

# Average response time
docker-compose logs app | grep "duration" | awk '{sum+=$(NF-1); count++} END {print sum/count}'

# Slow requests
docker-compose logs app | grep "duration" | awk '$NF > 1000 {print}'
```

#### Security Analysis

```bash
# Failed authentication attempts
docker-compose logs app | grep "authentication\|unauthorized" | wc -l

# Suspicious IP addresses
docker-compose logs app | grep "suspicious\|blocked" | awk '{print $(NF)}' | sort | uniq -c

# SQL injection attempts
docker-compose logs app | grep "sql\|injection" | wc -l
```

---

## SLA & Uptime Goals

### Service Level Objectives (SLOs)

| Metric | Target | Acceptable |
|--------|--------|-----------|
| Availability | 99.9% | 99.0% |
| P95 Latency | <500ms | <1000ms |
| P99 Latency | <1000ms | <2000ms |
| Error Rate | <0.1% | <1% |

### Uptime Calculations

```
99.9% uptime = 43.2 minutes downtime per month
99.5% uptime = 3.6 hours downtime per month
99.0% uptime = 7.2 hours downtime per month
```

---

## Maintenance & Optimization

### Daily Checks

- [ ] No critical alerts
- [ ] Error rate <0.1%
- [ ] Response times normal
- [ ] Disk usage <80%
- [ ] Memory usage <75%

### Weekly Reviews

- [ ] Analyze error logs
- [ ] Review performance trends
- [ ] Check for security issues
- [ ] Update dependencies
- [ ] Backup verification

### Monthly Analysis

- [ ] Capacity planning
- [ ] Cost optimization
- [ ] Architecture review
- [ ] Disaster recovery test
- [ ] Team training

---

**Maintained By**: DevOps Team  
**Last Updated**: January 27, 2026
