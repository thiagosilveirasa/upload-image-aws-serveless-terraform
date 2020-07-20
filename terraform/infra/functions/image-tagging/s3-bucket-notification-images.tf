resource "aws_s3_bucket_notification" "images_bucket_notification" {
  bucket = "${data.aws_s3_bucket.s3_images.id}"

  queue {
    queue_arn     = "${aws_sqs_queue.tag_image.arn}"
    events        = ["s3:ObjectCreated:*"]
  }
}