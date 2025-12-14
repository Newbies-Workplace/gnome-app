# Swagger UI:

- Swagger UI is available at: http://localhost:3000/docs

# Grafana & Monitoring:

- Grafana is available at: http://localhost:3001  
  Default login: admin / admin
- You can enter Prometheus UI on: http://localhost:9090  
  (not required — Grafana queries Prometheus directly)

## Grafana loads configuration automatically from:

- grafana/provisioning — datasources
- grafana/dashboards — dashboards
- grafana/grafana.ini — settings

If you change anything in these directories, restart the Grafana service in Docker.
