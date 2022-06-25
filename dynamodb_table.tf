resource "aws_dynamodb_table" "login_table" {
    name= "Login_Users"
    read_capacity = 1
    write_capacity = 1
    billing_mode = "PROVISIONED"
    
    hash_key = "username"
    attribute {
      name = "username"
      type = "S"
    }
    lifecycle {
        #prevent_destroy = true
        ignore_changes = [write_capacity, read_capacity]
    }
    tags = {
        name="Login-Users"
        environment = "production"}
}

resource "aws_appautoscaling_target" "dynamodb_table_read_target" {
  max_capacity       = var.read_max_capacity
  min_capacity       = var.read_min_capacity
  resource_id        = "table/Login_Users"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_target" "dynamodb_table_write_target" {
  max_capacity       = var.write_max_capacity
  min_capacity       = var.write_min_capacity
  resource_id        = "table/Login_Users"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "dynamodb_table_read_policy" {
  name               = "DynamoDBReadCapacityUtilization:${aws_appautoscaling_target.dynamodb_table_read_target.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = "${aws_appautoscaling_target.dynamodb_table_read_target.resource_id}"
  scalable_dimension = "${aws_appautoscaling_target.dynamodb_table_read_target.scalable_dimension}"
  service_namespace  = "${aws_appautoscaling_target.dynamodb_table_read_target.service_namespace}"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value = var.read_target_value
    scale_in_cooldown = var.read_scale_in_cooldown
    scale_out_cooldown = var.read_scale_out_cooldown
  }
}

resource "aws_appautoscaling_policy" "dynamodb_table_write_policy" {
  name               = "DynamoDBWriteCapacityUtilization:${aws_appautoscaling_target.dynamodb_table_write_target.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = "${aws_appautoscaling_target.dynamodb_table_write_target.resource_id}"
  scalable_dimension = "${aws_appautoscaling_target.dynamodb_table_write_target.scalable_dimension}"
  service_namespace  = "${aws_appautoscaling_target.dynamodb_table_write_target.service_namespace}"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value = var.write_target_value
    scale_in_cooldown = var.write_scale_in_cooldown
    scale_out_cooldown = var.write_scale_out_cooldown
  }
}




