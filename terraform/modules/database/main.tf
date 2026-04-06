# ========================================
# Database Module - RDS MySQL
# ========================================

# RDS Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name        = "${var.environment}-db-subnet-group"
    Environment = var.environment
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier     = "${var.environment}-mysql"
  engine         = var.db_engine
  engine_version = "8.0"
  instance_class = var.db_instance_class

  db_name  = var.db_name
  username = var.db_admin_user
  password = var.db_admin_password

  allocated_storage     = 20
  storage_encrypted     = true
  multi_az              = true
  db_subnet_group_name  = aws_db_subnet_group.main.name

  vpc_security_group_ids = [var.rds_security_group_id]

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "${var.environment}-final-snapshot"

  tags = {
    Name        = "${var.environment}-mysql"
    Environment = var.environment
  }
}