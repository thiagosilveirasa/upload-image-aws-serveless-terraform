provider "aws" {
  region = "${var.region}"
  shared_credentials_file = "$HOME/.aws/credentials"
  profile = "default"
}
