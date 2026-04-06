# ========================================
# Network Module - Variables
# ========================================

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones for VPC subnets"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks (2 AZs)"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks (4 subnets: 2 app + 2 db)"
  type        = list(string)
}

# [삭제] variable "eks_node_security_group_id" - 순환 참조를 유발하므로 삭제합니다.

