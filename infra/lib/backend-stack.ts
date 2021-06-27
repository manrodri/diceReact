import {Construct, Stack, StackProps, CfnOutput} from "@aws-cdk/core";
import * as lambda from '@aws-cdk/aws-lambda';
import path = require('path');
import * as apigw from '@aws-cdk/aws-apigateway'

export class BackendStack extends Stack {
    urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // lambda function
        const handler = new lambda.Function(this, 'Handler', {
            code: new lambda.AssetCode(path.resolve(__dirname, 'lambda')),
            handler: 'handler.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
        });

        const alias = new lambda.Alias(this, "x", {
            aliasName: "Current",
            version: handler.currentVersion
        })

        // apigateway
        const api = new apigw.LambdaRestApi(this, 'DiceGateway', {
            description: 'Endpoint for a simple Lambda-powered web service',
            handler: alias,
        });

        this.urlOutput = new CfnOutput(this, 'url', { value: api.url });
    }
}