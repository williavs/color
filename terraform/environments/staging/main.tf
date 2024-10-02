provider "linode" {
  token = var.linode_token
}

module "networking" {
  source = "../../modules/networking"
  # Add necessary variables
}

module "compute" {
  source = "../../modules/compute"
  # Add necessary variables
}

module "database" {
  source = "../../modules/database"
  # Add necessary variables
}

variable "linode_token" {
  description = "Linode API Token"
  type        = string
}