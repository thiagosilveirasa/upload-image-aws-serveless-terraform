module "api" {
  source = "../../infra/api"
  environment = "${var.environment}"
  region = "${var.region}"
  bucket_name = "${var.bucket_name}"
}

