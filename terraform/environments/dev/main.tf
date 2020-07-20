data "aws_caller_identity" "current" {}

module "api" {
  source = "../../infra/api"
  environment = "${var.environment}"
  region = "${var.region}"
  bucket_name = "${var.bucket_name}"
}

module "function_tag" {
  source = "../../infra/functions/image-tagging"
  environment = "${var.environment}"
  region = "${var.region}"
  bucket_name = "${module.api.s3_bucket_images_name}"
  account_id = "${data.aws_caller_identity.current.account_id}"  
}
