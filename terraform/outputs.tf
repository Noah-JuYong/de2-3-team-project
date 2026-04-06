# ========================================
# Output - Terraform Configuration
# ========================================

output "cluster_endpoint" {
  description = "EKS Cluster Endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_certificate_authority" {
  description = "EKS Cluster Certificate Authority"
  value       = module.eks.cluster_certificate_authority
}


output "vpc_id" {
  description = "VPC ID"
  value       = module.network.vpc_id
}

output "private_subnet_ids" {
  description = "Private Subnet IDs"
  value       = module.network.private_subnet_ids
}

output "rds_endpoint" {
  description = "RDS Endpoint"
  value       = module.database.rds_endpoint
}

output "s3_bucket_name" {
  description = "S3 Bucket Name"
  value       = module.storage.s3_bucket_name
}

output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = module.storage.ecr_repository_url
}

