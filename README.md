# lambda-papertrail

This is **lambda-papertrail**, a Lambda function to forward logs from CloudWatch to [Papertrail](http://papertrailapp.com). It is built with the [Serverless Framework](https://serverless.com/), and is a perfect companion to the [`serverless-log-forwarding`](https://github.com/amplify-education/serverless-log-forwarding) plugin.

## Getting Started

Install [Node](https://nodejs.org/en/) 8.x, [Docker](https://www.docker.com/docker-mac), and the [AWS CLI](https://aws.amazon.com/cli/). Then clone this repository & install dependencies:

```sh
# Install dependencies
npm install

# Run local tests:
npm test
```

Next, configure `serverless-dev` (for dev & QA stages) and `serverless-produciton` IAM roles:

```sh
$ aws configure --profile serverless-dev
AWS Access Key ID [None]: **************
AWS Secret Access Key [None]: **************
Default region name [None]: us-east-1
Default output format [None]: text

$ aws configure --profile serverless-production
AWS Access Key ID [None]: **************
AWS Secret Access Key [None]: **************
Default region name [None]: us-east-1
Default output format [None]: text
```

Finally, run either `npm run deploy:dev`, `npm run deploy:qa`, or `npm run deploy:prod` to deploy!

## Usage

You can now easily forward logs from any other Serverless application with [`serverless-log-forwarding`](https://github.com/amplify-education/serverless-log-forwarding).

```yml
plugins:
  - serverless-log-forwarding

custom:
  logForwarding:
    destinationARN: ${cf:lambda-papertrail-${opt:stage}.ForwarderLambdaArn}
```

You can also manually attach a log group by clicking **Actions → Stream to AWS Lambda** from the [CloudWatch Log Groups dashboard](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:). Then just choose the appropriate destination Lambda function (e.g. `lambda-papertrail-prod-forwarder`) and configure a filter (or "Other" to forward all log messages).

## License

&copy; DoSomething.org. lambda-papertrail is free software, and may be redistributed under the terms specified
in the [LICENSE](https://github.com/DoSomething/lambda-papertrail/blob/master/LICENSE) file. The name and logo for
DoSomething.org are trademarks of Do Something, Inc and may not be used without permission.
