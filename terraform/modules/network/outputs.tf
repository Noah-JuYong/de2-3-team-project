# ========================================
# Network Module - Outputs
# ========================================

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "Private Subnet IDs (all private subnets)"
  value       = aws_subnet.private[*].id
}

output "eks_node_security_group_id" {
  description = "EKS Node Security Group ID"
  value       = aws_security_group.eks_node.id
}

output "rds_security_group_id" {
  description = "RDS Security Group ID"
  value       = aws_security_group.rds.id
}

# [추가] RDS 전용 서브넷 ID만 따로 추출하여 Database 모듈에 전달합니다.
output "db_subnet_ids" {
  description = "Subnet IDs for RDS (the last 2 private subnets)"
  value       = slice(aws_subnet.private[*].id, length(var.private_subnet_cidrs) - 2, length(var.private_subnet_cidrs))
}

