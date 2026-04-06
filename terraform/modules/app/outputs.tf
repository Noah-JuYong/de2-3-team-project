# ========================================
# App Module - Outputs
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
