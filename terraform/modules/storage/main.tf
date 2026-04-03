# ========================================
# Storage Module - S3, ECR, KMS Keys
# ========================================

# KMS Key for S3 encryption
resource "aws_kms_key" "main" {
  description             = "KMS key for S3 bucket encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = {
    Name        = "${var.environment}-s3-kms-key"
    Environment = var.environment
  }
}

# KMS Key Alias
resource "aws_kms_alias" "main" {
  name          = "alias/${var.environment}-s3-kms-key"
  target_key_id = aws_kms_key.main.key_id
}

# S3 Bucket for static assets (images, etc.)
resource "aws_s3_bucket" "main" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = "${var.environment}-s3-static"
    Environment = var.environment
  }
}

# S3 Bucket Versioning (disabled as per user request)
resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id

  versioning_configuration {
    status = "Disabled"
  }
}

# S3 Bucket Server-Side Encryption with KMS
resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.main.key_id
      sse_algorithm     = "aws:kms"
    }
  }
}

# ECR Repository for Docker images
resource "aws_ecr_repository" "main" {
  name                 = var.ecr_repository
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = aws_kms_key.main.key_id
  }

  tags = {
    Name        = "${var.environment}-ecr-repo"
    Environment = var.environment
  }
}
