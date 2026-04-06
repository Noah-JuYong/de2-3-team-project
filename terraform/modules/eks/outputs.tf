# ========================================
# EKS Module - Outputs
# ========================================

output "cluster_endpoint" {
  description = "EKS Cluster Endpoint"
  value       = aws_eks_cluster.main.endpoint
}
output "cluster_certificate_authority" {
  description = "EKS Cluster Certificate Authority Data"
  value       = aws_eks_cluster.main.certificate_authority[0].data
}

output "node_group_id" {
  description = "EKS Node Group ID"
  value       = aws_eks_node_group.main.id
}

output "cluster_name" {
  value = aws_eks_cluster.main.name
}