# de2-3-team-project

[SK플래닛] 데이터엔지니어 2기 AWS 미니프로젝트 3팀

팀장 : 박주용
팀원 : 강태주, 고준섭, 송아름, 이영준, (최재혁)

주제 : 웹서비스 트래픽 문제 해결


# AWS EKS 인프라 Terraform 모듈 문서

이 문서는 AWS EKS (Elastic Kubernetes Service) 환경을 구축하기 위한 Terraform 모듈 구조와 각 모듈의 역할을 설명합니다.

## 📁 프로젝트 구조

```
terraform/
├── main.tf                    # 메인 설정 및 모듈 호출
├── variables.tf               # 주요 변수 정의
├── outputs.tf                 # 출력값 정의
└── modules/
    ├── network/              # VPC, 서브넷, NAT 게이트웨이, 보안 그룹
    ├── eks/                  # EKS 클러스터 및 노드 그룹
    ├── database/             # RDS MySQL
    └── storage/              # S3, ECR, KMS 키
```

---

## 🏗️ 모듈별 상세 설명

### 1. Network Module (`modules/network`)

네트워크 인프라를 담당하는 모듈로, VPC와 관련된 모든 리소스를 생성합니다.

#### 주요 기능
- **VPC**: CIDR `10.0.0.0/16` 으로 VPC 생성
- **Internet Gateway**: 외부 인터넷 접근을 위한 게이트웨이
- **Public Subnets**: 2 개의 Availability Zone (AZ) 에 각각 1 개씩, 총 2 개
- **Private Subnets**: 4 개 (EKS 애플리케이션용 2 개 + RDS 데이터베이스용 2 개)
- **NAT Gateway**: 2 AZ 에서 고가용성 (HA) 구성
- **Security Groups**:
  - `bastion-sg`: Bastion 호스트용 (SSH 포트 22 개방)
  - `private-sg`: Private 서브넷용 보안 그룹
  - `eks-node-sg`: EKS 노드가 RDS 접근을 위한 보안 그룹 (포트 3306)
  - `rds-sg`: RDS 인스턴스용 (EKS 노드에서만 접근 허용)

#### 출력값
- `vpc_id`: VPC ID
- `private_subnet_ids`: 모든 private 서브넷 ID 목록 (4 개)
- `eks_node_security_group_id`: EKS 노드용 보안 그룹 ID
- `rds_security_group_id`: RDS용 보안 그룹 ID
- `db_subnet_ids`: RDS 전용 서브넷 ID (마지막 2 개)

#### 변수
- `vpc_cidr`: VPC CIDR 블록
- `environment`: 환경 이름 (dev, staging, prod)
- `aws_region`: AWS 리전
- `availability_zones`: Availability Zone 목록
- `public_subnet_cidrs`: Public 서브넷 CIDR 목록
- `private_subnet_cidrs`: Private 서브넷 CIDR 목록

---

### 2. EKS Module (`modules/eks`)

Kubernetes 클러스터와 노드 그룹을 관리하는 모듈입니다.

#### 주요 기능
- **IAM Role for Cluster**: EKS 클러스터용 IAM 역할
- **EKS Cluster**: Kubernetes 1.30 버전 클러스터 생성
- **IAM Role for Node Group**: EKS 노드용 IAM 역할
  - `AmazonEKSWorkerNodePolicy`
  - `AmazonEKS_CNI_Policy`
  - `AmazonEC2ContainerRegistryReadOnly`
- **Node Group**: 자동 확장 (Auto Scaling) 구성
  - 최소 2 개, 최대 10 개 노드
  - 인스턴스 타입: `m7i-flex.large`

#### 출력값
- `cluster_endpoint`: EKS 클러스터 엔드포인트
- `cluster_certificate_authority`: 인증서 데이터
- `node_group_id`: 노드 그룹 ID
- `cluster_name`: 클러스터 이름

#### 변수
- `aws_region`: AWS 리전 (기본값: `us-west-2`)
- `environment`: 환경 이름 (기본값: `prod`)
- `cluster_name`: EKS 클러스터 이름 (기본값: `shop-eks`)
- `private_subnet_ids`: Private 서브넷 ID 목록
- `eks_node_security_group_id`: EKS 노드 보안 그룹 ID
- `node_instance_type`: 노드 인스턴스 타입 (기본값: `m7i-flex.large`)
- `node_auto_scaling`: 자동 확장 설정

---

### 3. Database Module (`modules/database`)

RDS MySQL 데이터베이스를 관리하는 모듈입니다.

#### 주요 기능
- **DB Subnet Group**: RDS 전용 서브넷 그룹 생성
- **RDS Instance**: MySQL 8.0 인스턴스
  - 멀티 AZ 구성으로 고가용성
  - 스토리지 암호화 (KMS)
  - 자동 백업 (7 일 유지, 백업 창: 03:00-04:00)
  - 최종 스냅샷 생성 설정

#### 출력값
- `rds_endpoint`: RDS 엔드포인트
- `rds_port`: RDS 포트 (3306)
- `rds_instance_id`: RDS 인스턴스 ID

#### 변수
- `vpc_id`: VPC ID
- `subnet_ids`: RDS용 서브넷 ID (2 개)
- `environment`: 환경 이름
- `rds_security_group_id`: RDS 보안 그룹 ID
- `db_engine`: 데이터베이스 엔진 (기본값: `mysql`)
- `db_instance_class`: 인스턴스 클래스 (기본값: `db.m7g.large`)
- `db_name`: 데이터베이스 이름 (기본값: `shopdb`)
- `db_admin_user`: 관리자 사용자 (기본값: `admin`)
- `db_admin_password`: 관리자 비밀번호 (**필수**, 민감 정보)

---

### 4. Storage Module (`modules/storage`)

AWS 저장소 서비스 (S3, ECR) 와 암호화 키 (KMS) 를 관리하는 모듈입니다.

#### 주요 기능
- **KMS Key**: S3 암호화용 KMS 키 생성
  - 7 일 삭제 대기 시간
  - 키 회전이 활성화됨
- **KMS Alias**: `alias/{environment}-s3-kms-key`
- **S3 Bucket**: 정적 자산 (이미지 등) 저장용
  - 버전 제어 비활성화
  - 서버 사이드 암호화 (KMS)
- **ECR Repository**: Docker 이미지 저장소
  - `scan_on_push`: 푸시 시 이미지 스캔 활성화
  - 암호화: KMS 사용

#### 출력값
- `s3_bucket_name`: S3 버킷 이름
- `ecr_repository_url`: ECR 리포지토리 URL

#### 변수
- `environment`: 환경 이름
- `s3_bucket_name`: S3 버킷 이름
- `ecr_repository`: ECR 리포지토리 이름

---

## 🔧 메인 설정 (`main.tf`)

### Terraform 설정
- **필수 버전**: `>= 1.0.0`
- **AWS Provider**: `~> 5.0`

### Provider 구성
- **AWS Provider**: `var.aws_region` 리전 사용
- **Kubernetes Provider**: EKS 클러스터 엔드포인트와 인증서 사용

### 모듈 호출 순서
1. **Network**: VPC 및 서브넷 생성
2. **EKS**: 클러스터 및 노드 그룹 생성
3. **Database**: RDS MySQL 생성
4. **Storage**: S3 및 ECR 생성

### App Module (옵션)
- 주석 처리됨, 필요시 활성화 가능
- ECR 이미지 URL과 클러스터 이름을 입력받아 애플리케이션 배포

---

## 📋 주요 변수 (`variables.tf`)

### 기본 환경 설정
| 변수 | 설명 | 기본값 |
|------|------|--------|
| `aws_region` | AWS 리전 | `us-west-2` |
| `environment` | 환경 이름 | `prod` |
| `cluster_name` | EKS 클러스터 이름 | `shop-eks` |

### 네트워크 설정
| 변수 | 설명 | 기본값 |
|------|------|--------|
| `vpc_cidr` | VPC CIDR 블록 | `10.0.0.0/16` |
| `public_subnet_cidrs` | Public 서브넷 CIDR | `["10.0.1.0/24", "10.0.2.0/24"]` |
| `private_subnet_cidrs` | Private 서브넷 CIDR | `["10.0.10.0/24", "10.0.11.0/24", "10.0.20.0/24", "10.0.21.0/24"]` |
| `availability_zones` | AZ 목록 | `["us-west-2a", "us-west-2b"]` |

### EKS 설정
| 변수 | 설명 | 기본값 |
|------|------|--------|
| `node_instance_type` | 노드 인스턴스 타입 | `m7i-flex.large` |
| `node_auto_scaling` | 자동 확장 설정 | `{min: 2, max: 10, desired: 2}` |

### 데이터베이스 설정
| 변수 | 설명 | 기본값 |
|------|------|--------|
| `db_engine` | 데이터베이스 엔진 | `mysql` |
| `db_instance_class` | 인스턴스 클래스 | `db.m7g.large` |
| `db_admin_password` | 관리자 비밀번호 | **필수** |

### 스토리지 설정
| 변수 | 설명 | 기본값 |
|------|------|--------|
| `s3_bucket_name` | S3 버킷 이름 | `shop-eks-static-assets` |
| `ecr_repository` | ECR 리포지토리 이름 | `shop-eks-app` |

---

## 📤 출력값 (`outputs.tf`)

| 출력명 | 설명 |
|--------|------|
| `cluster_endpoint` | EKS 클러스터 엔드포인트 |
| `cluster_certificate_authority` | 인증서 데이터 (k8s 연결용) |
| `vpc_id` | VPC ID |
| `private_subnet_ids` | Private 서브넷 ID 목록 |
| `rds_endpoint` | RDS 엔드포인트 |
| `s3_bucket_name` | S3 버킷 이름 |
| `ecr_repository_url` | ECR 리포지토리 URL |

---

## 🚀 배포 가이드

### 1. Terraform 초기화
```bash
cd terraform
terraform init
```

### 2. 변수 파일 생성 (`terraform.tfvars`)
```hcl
aws_region       = "us-west-2"
environment      = "prod"
db_admin_password = "your-secure-password"  # 실제 환경에서는 CLI 또는 환경 변수 사용 권장
```

### 3. 플랜 확인
```bash
terraform plan
```

### 4. 인프라 배포
```bash
terraform apply
```

### 5. kubectl 설정
```bash
aws eks update-kubeconfig --name shop-eks --region us-west-2
```

---

## 🛡️ 보안 고려사항

1. **KMS 암호화**: S3, ECR, RDS 모두 KMS 키로 암호화됨
2. **보안 그룹**: 
   - RDS는 EKS 노드 보안 그룹에서만 접근 가능
   - Bastion은 SSH 포트 22만 개방 (실제 배포 시 IP 제한 권장)
3. **민감 정보**: `db_admin_password` 는 환경 변수 또는 CLI 를 통해 전달 권장
4. **버전 제어**: S3 버전 제어는 비활성화됨 (요구사항에 따름)

---

## 📊 아키텍처 다이어그램 (개념적)

```
┌─────────────────────────────────────────────────────────────┐
│                         AWS us-west-2                       │
├─────────────────────────────────────────────────────────────┤
│  VPC (10.0.0.0/16)                                          │
├─────────────────────┬───────────────────────────────────────┤
│  Public Subnets     │  Private Subnets                      │
│  (us-west-2a, b)    │  ┌─────────────┬─────────────┐       │
│                     │  │ App (2 AZ)  │  DB (2 AZ)  │       │
│  Internet Gateway   │  └─────────────┴─────────────┘       │
│                     │                                       │
│  NAT Gateway (HA)   │  ┌─────────────────────────────┐     │
│                     │  │  EKS Cluster                 │     │
│                     │  │  └─ Node Group (Auto Scale)  │     │
│                     │  └─────────────────────────────┘     │
│                     │                                       │
│                     │  ┌─────────────────────────────┐     │
│                     │  │  RDS MySQL (Multi-AZ)       │     │
│                     │  └─────────────────────────────┘     │
├─────────────────────┴───────────────────────────────────────┤
│  S3 Bucket (Static Assets)                                  │
│  ECR Repository (Docker Images)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 트러블슈팅

### kubectl 연결 실패
- `cluster_certificate_authority` 출력값 확인
- AWS EKS 토큰이 유효한지 확인 (`aws eks get-token`)

### RDS 접근 불가
- EKS 노드 보안 그룹이 RDS 보안 그룹에 추가되었는지 확인
- `eks-node-sg` 가 RDS 보안 그룹의 인그레스 규칙에 있는지 확인

### 노드 생성 실패
- IAM 역할과 정책 어태치가 올바르게 설정되었는지 확인
- VPC 서브넷이 프라이빗하고 NAT 게이트웨이가 연결되어 있는지 확인

---

## 📚 참고 자료

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Amazon RDS MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html)
- [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)

---

*문서 버전: 1.0*  
*최종 업데이트: 2024*
