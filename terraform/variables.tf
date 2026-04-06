# ========================================
# Terraform Variables - Environment Configuration
# ========================================

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "db_admin_password" {
  description = "RDS database admin password (must be provided via CLI or environment variable)"
  type        = string
  sensitive   = true
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks (2 AZs)"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks (4 subnets: 2 app + 2 db)"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24", "10.0.20.0/24", "10.0.21.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones for VPC subnets"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

variable "node_instance_type" {
  description = "EKS node instance type (m7i-flex.large)"
  type        = string
  default     = "m7i-flex.large"
}

variable "node_auto_scaling" {
  description = "Node group auto scaling configuration"
  type = object({
    min_size     = number
    max_size     = number
    desired_size = number
  })
  default = {
    min_size     = 2
    max_size     = 10
    desired_size = 2
  }
}

variable "db_engine" {
  description = "RDS database engine (mysql)"
  type        = string
  default     = "mysql"
}

variable "db_instance_class" {
  description = "RDS instance class (db.m7g.large)"
  type        = string
  default     = "db.m7g.large"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "shop-eks"
}

variable "s3_bucket_name" {
  description = "S3 bucket name for static assets"
  type        = string
  default     = "shop-eks-static-assets"
}

variable "ecr_repository" {
  description = "ECR repository name for Docker images"
  type        = string
  default     = "shop-eks-app"
}

# ========================================
# App Module Variables (Optional)
# ========================================
variable "image_url" {
  description = "Docker image URL for the application (e.g., from ECR)"
  type        = string
  default     = ""
}

variable "app_replicas" {
  description = "Number of app replicas"
  type        = number
  default     = 2
}

variable "app_cpu" {
  description = "CPU request/limit for the app (e.g., '250m' or '250m/500m')"
  type        = string
  default     = "250m"
}

variable "app_memory" {
  description = "Memory request/limit for the app (e.g., '512Mi' or '512Mi/1Gi')"
  type        = string
  default     = "512Mi"
}

# [삭제] eks_node_security_group_id 제거 - 순환 참조를 유발하므로 삭제합니다.

