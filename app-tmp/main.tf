# ========================================
# App Module - Deployment, Service, Ingress
# ========================================

# Kubernetes Deployment
resource "kubernetes_deployment" "app" {
  metadata {
    name      = "${var.environment}-web-app"
    namespace = "default"

    labels = {
      app = "${var.environment}-web-app"
    }
  }

  spec {
    replicas = var.app_replicas

    selector {
      match_labels = {
        app = "${var.environment}-web-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "${var.environment}-web-app"
        }
      }

      spec {
        container {
          image = var.image_url
          name  = "web-app"

          resources {
            requests = {
              cpu    = var.app_cpu_request
              memory = var.app_memory_request
            }
            limits = {
              cpu    = var.app_cpu_limit
              memory = var.app_memory_limit
            }
          }

          port {
            container_port = 80
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 80
            }

            initial_delay_seconds = 30
            period_seconds        = 10
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 80
            }

            initial_delay_seconds = 5
            period_seconds        = 5
          }
          env {
            name  = "DB_HOST"
            value = var.db_host
          }

          env {
            name  = "DB_PORT"
            value = var.db_port
          }

          env {
            name  = "DB_NAME"
            value = var.db_name
          }

          env {
            name      = "DB_USER"
            value     = var.db_user
            sensitive = true
          }

          env {
            name      = "DB_PASSWORD"
            value     = var.db_password
            sensitive = true
          }

          env {
            name  = "S3_BUCKET"
            value = var.s3_bucket_name
          }

          env {
            name  = "ECR_REPOSITORY"
            value = var.ecr_repository
          }
        }
      }
    }
  }
}

# Kubernetes Service
resource "kubernetes_service" "app" {
  metadata {
    name      = "${var.environment}-web-app-service"
    namespace = "default"

    labels = {
      app = "${var.environment}-web-app"
    }
  }

  spec {
    selector = {
      app = "${var.environment}-web-app"
    }

    port {
      port        = 80
      target_port = 80
      protocol    = "TCP"
    }

    type = "LoadBalancer"
  }
}

# ========================================
# Output - App Module
# ========================================

output "service_name" {
  description = "Kubernetes Service Name"
  value       = kubernetes_service.app.metadata[0].name
}

output "service_port" {
  description = "Kubernetes Service Port"
  value       = kubernetes_service.spec[0].port[0].port
}

output "deployment_name" {
  description = "Kubernetes Deployment Name"
  value       = kubernetes_deployment.app.metadata[0].name
}

output "service_type" {
  description = "Kubernetes Service Type"
  value       = kubernetes_service.spec[0].type
}


