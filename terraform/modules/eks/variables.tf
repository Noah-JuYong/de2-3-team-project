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

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "shop-eks"
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for EKS cluster"
  type        = list(string)
}

variable "eks_node_security_group_id" {
  description = "EKS Node Security Group ID (from network module)"
  type        = string
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
    desired_size   = 2
  }
}

