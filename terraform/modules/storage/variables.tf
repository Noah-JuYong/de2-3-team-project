# ========================================
# Storage Module - Variables
# ========================================

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket name for static assets"
  type        = string
}

variable "ecr_repository" {
  description = "ECR repository name for Docker images"
  type        = string
}
