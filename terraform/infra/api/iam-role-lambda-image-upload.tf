resource "aws_iam_role" "lambda_image_upload_iam_role" {
  name = "${var.environment}-lambda-image-upload-iam-role"  
  assume_role_policy = templatefile("${path.module}/templates/lambda-image-handler-upload-policy.tpl", {})
}

resource "aws_iam_role_policy_attachment" "lambda_image_upload_iam_role_attach_s3" {
  role = "${aws_iam_role.lambda_image_upload_iam_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_image_upload_iam_role_attach_cloudwatch" {
  role = "${aws_iam_role.lambda_image_upload_iam_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_image_upload_iam_role_attach_dynamo_db" {
  role = "${aws_iam_role.lambda_image_upload_iam_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_ssm_parameter" "lambda_image_upload_iam_role" {
  name  = "${var.environment}-lambda-image-upload-iam-role"
  type  = "String"
  value = "${aws_iam_role.lambda_image_upload_iam_role.arn}"
}
