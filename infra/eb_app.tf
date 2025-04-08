resource "aws_elastic_beanstalk_application" "app" {
  name        = var.app_name
  description = "Aplicação do projeto petshop"
}

resource "aws_elastic_beanstalk_application_version" "app_version" {
  name        = "v1"
  application = aws_elastic_beanstalk_application.app.name
  bucket      = var.s3_bucket
  key         = aws_s3_object.app_version.key

  depends_on = [aws_s3_object.app_version]
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = var.env_name
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.5.9 running Docker"

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NODE_ENV"
    value     = "production"
  }

  version_label = aws_elastic_beanstalk_application_version.app_version.name
}
