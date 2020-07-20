data "aws_s3_bucket" "s3_images" {
  bucket = "${var.bucket_name}"
}