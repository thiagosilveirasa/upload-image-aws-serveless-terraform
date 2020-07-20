resource "aws_sqs_queue" "tag_image" {
  name = "${var.environment}-tag-image-queue"
  policy = templatefile("${path.module}/templates/sqs-queue-tag-images-policy.tpl", {
    resource = "arn:aws:sqs:${var.region}:${var.account_id}:${var.environment}-tag-image-queue",
    bucket_arn = "${data.aws_s3_bucket.s3_images.arn}"
  }) 
}

resource "aws_ssm_parameter" "tag_image_sqs" {
  name  = "${var.environment}-tag-image-sqs"
  type  = "String"
  value = "${aws_sqs_queue.tag_image.arn}"
}