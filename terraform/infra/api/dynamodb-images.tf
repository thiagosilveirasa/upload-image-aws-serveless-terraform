resource "aws_dynamodb_table" "images" {
  name     = "${var.environment}-images"
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
  write_capacity   = 20
  read_capacity    = 20
}

resource "aws_ssm_parameter" "dynamodb_images_table" {
  name  = "${var.environment}-dynamodb-images-table"
  type  = "String"
  value = "${aws_dynamodb_table.images.name}"
}
