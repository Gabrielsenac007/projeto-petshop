# infra/variables.tf
variable "region" {
  description = "Região da AWS"
  default     = "us-east-1"
}

variable "app_name" {
  default = "projeto-petshop"
}

variable "env_name" {
  default = "petshop-prod"
}

variable "s3_bucket" {
  description = "Nome do bucket S3 onde será enviado o pacote da aplicação"
  type        = string
}


