# ========================================
# App Module - Variables
# ========================================

variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "image_url" {
  description = "Docker image URL for the application (e.g., from ECR)"
  type        = string
}

variable "app_replicas" {
  description = "Number of app replicas"
  type        = number
  default     = 2
}

variable "app_cpu_request" {
  description = "CPU request for the app"
  type        = string
  default     = "250m"
}

variable "app_cpu_limit" {
  description = "CPU limit for the app"
  type        = string
  default     = "500m"
}

variable "app_memory_request" {
  description = "Memory request for the app"
  type        = string
  default     = "512Mi"
}

variable "app_memory_limit" {
  description = "Memory limit for the app"
  type        = string
  default     = "1Gi"
}

variable "db_host" {
  description = "RDS endpoint for database connection"
  type        = string
}

variable "db_port" {
  description = "RDS port for database connection"
  type        = number
  default     = 3306
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "shopdb"
}

variable "db_user" {
  description = "Database user"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Database password (sensitive)"
  type        = string
  sensitive   = true
}

variable "s3_bucket_name" {
  description = "S3 bucket name for static assets"
  type        = string
}

variable "ecr_repository" {
  description = "ECR repository name for Docker images"
  type        = string
}
