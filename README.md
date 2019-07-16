# lambda-papertrail

This is **lambda-papertrail**, a Lambda function to forward logs from CloudWatch to [Papertrail](http://papertrailapp.com). It is built with the [Serverless Framework](https://serverless.com/), and is a perfect companion to the [`serverless-log-forwarding`](https://github.com/amplify-education/serverless-log-forwarding) plugin.

## Local Development

Requires Docker.

```sh
$ make tests
```

## Deployment

Use the [serverless toolbox](https://github.com/Elizabeth-Warren/serverless-toolbox),

```sh
# From the `serverless-toolbox` directory,
# Replace ~/dev/lambda-papertrail with the path to the
# `lambda-papertrail` directory on your host machine.
$ SRC=~/dev/lambda-papertrail make toolbox

$ sls deploy -f forwarder --stage prod
$ sls logs -f forwarder --stage prod
```

## Usage

You can now easily forward logs from any other Serverless application with [`serverless-log-forwarding`](https://github.com/amplify-education/serverless-log-forwarding).

```yml
plugins:
  - serverless-log-forwarding

custom:
  logForwarding:
    destinationARN: ${cf:lambda-papertrail-prod.ForwarderLambdaArn}
```

You can also manually attach a log group by clicking **Actions → Stream to AWS Lambda** from the [CloudWatch Log Groups dashboard](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:). Then just choose the appropriate destination Lambda function (e.g. `lambda-papertrail-prod-forwarder`) and configure a filter (or "Other" to forward all log messages).

## License

&copy; DoSomething.org. lambda-papertrail is free software, and may be redistributed under the terms specified
in the [LICENSE](https://github.com/DoSomething/lambda-papertrail/blob/master/LICENSE) file. The name and logo for
DoSomething.org are trademarks of Do Something, Inc and may not be used without permission.
