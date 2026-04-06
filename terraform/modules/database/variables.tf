# ========================================
# Database Module - Variables
# ========================================

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for RDS (should be the 2 DB subnets)"
  type        = list(string)
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "rds_security_group_id" {
  description = "RDS Security Group ID (from network module)"
  type        = string
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

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "shopdb"
}

variable "db_admin_user" {
  description = "RDS database admin user"
  type        = string
  default     = "admin"
}

variable "db_admin_password" {
  description = "RDS database admin password (must be provided via CLI or environment variable)"
  type        = string
  sensitive   = true
}

# [변경] 민감한 정보는 CLI 또는 환경 변수로 전달 권장 (hardcoded password 제거)

