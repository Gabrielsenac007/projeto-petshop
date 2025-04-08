resource "aws_s3_object" "app_version" {
  bucket = var.s3_bucket
  key    = "app-v1.zip"
  source = "${path.module}/app-v1.zip"
  etag   = filemd5("${path.module}/app-v1.zip")
}
