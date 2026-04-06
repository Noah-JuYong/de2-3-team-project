# ========================================
# Database Module - Outputs
# ========================================

output "rds_endpoint" {
  description = "RDS Endpoint"
  value       = aws_db_instance.main.endpoint
}

output "rds_port" {
  description = "RDS Port"
  value       = aws_db_instance.main.port
}

output "rds_instance_id" {
  description = "RDS Instance ID"
  value       = aws_db_instance.main.id
}

