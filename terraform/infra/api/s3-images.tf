resource "aws_s3_bucket" "s3_bucket_images" {
  bucket = "${var.environment}-${var.bucket_name}-bucket-images"
  acl = "private"
}

resource "aws_ssm_parameter" "s3_bucket_images" {
  name = "${var.environment}-name-bucket-images"
  type = "String"
  value = "${var.environment}-${var.bucket_name}-bucket-images"
}

output s3_bucket_images_name {
  value = "${aws_s3_bucket.s3_bucket_images.bucket}"
}
