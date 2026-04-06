# ========================================
# Terraform - Main Configuration
# ========================================

terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "shopping-eks"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

provider "kubernetes" {
  host = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command = "aws"
    args = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

# ========================================
# Network Module (VPC, Subnets, NAT Gateway)
# ========================================
module "network" {
  source = "./modules/network"

  vpc_cidr                     = var.vpc_cidr
  environment                  = var.environment
  aws_region                   = var.aws_region
  availability_zones           = var.availability_zones
  public_subnet_cidrs          = var.public_subnet_cidrs
  private_subnet_cidrs         = var.private_subnet_cidrs
}

# ========================================
# EKS Module (Cluster + Node Groups)
# ========================================
module "eks" {
  source = "./modules/eks"

  cluster_name               = var.cluster_name
  aws_region                 = var.aws_region
  environment                = var.environment
  private_subnet_ids         = module.network.private_subnet_ids
  eks_node_security_group_id = module.network.eks_node_security_group_id
  node_instance_type         = var.node_instance_type
  node_auto_scaling          = var.node_auto_scaling
}

# ========================================
# Database Module (RDS MySQL)
# ========================================
module "database" {
  source = "./modules/database"

  vpc_id                      = module.network.vpc_id
  subnet_ids                  = [module.network.private_subnet_ids[2], module.network.private_subnet_ids[3]]
  environment                 = var.environment
  rds_security_group_id       = module.network.rds_security_group_id
  db_instance_class           = var.db_instance_class
  db_admin_password           = var.db_admin_password
}

# ========================================
# Storage Module (S3, ECR)
# ========================================
module "storage" {
  source = "./modules/storage"

  environment      = var.environment
  s3_bucket_name   = var.s3_bucket_name
  ecr_repository   = var.ecr_repository
}

# ========================================
# App Module (Deployment, Service) - Uncomment to enable
# ========================================
# module "web_app" {
#   source = "./modules/app"

#   image_url    = module.storage.ecr_repository_url
#   cluster_name = module.eks.cluster_name
  
# }