import {CfnOutput, Construct, Stack, StackProps} from "@aws-cdk/core";
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway'
import path = require('path');

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
        const api = new apigw.RestApi(this, 'DiceGateway', {
            description: 'Endpoint for a simple Lambda-powered web service',
        });

        const diceRoll = api.root.addResource('diceRoll')

        // We define the JSON Schema for the transformed valid response
        const responseModel = api.addModel('ResponseModel', {
            contentType: 'application/json',
            modelName: 'ResponseModel',
            schema: {
                schema: apigw.JsonSchemaVersion.DRAFT4,
                title: 'pollResponse',
                type: apigw.JsonSchemaType.OBJECT,
                properties: {
                    state: {type: apigw.JsonSchemaType.STRING},
                    greeting: {type: apigw.JsonSchemaType.STRING}
                }
            }
        });

// We define the JSON Schema for the transformed error response
        const errorResponseModel = api.addModel('ErrorResponseModel', {
            contentType: 'application/json',
            modelName: 'ErrorResponseModel',
            schema: {
                schema: apigw.JsonSchemaVersion.DRAFT4,
                title: 'errorResponse',
                type: apigw.JsonSchemaType.OBJECT,
                properties: {
                    state: {type: apigw.JsonSchemaType.STRING},
                    message: {type: apigw.JsonSchemaType.STRING}
                }
            }
        });

        const postDiceRollIntegration = new apigw.LambdaIntegration(handler, {
            proxy: false,
            allowTestInvoke: true,
            passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
            integrationResponses: [
                {
                    statusCode: "200",
                    responseParameters: {
                        'method.response.header.Content-Type': "'application/json'",
                        'method.response.header.Access-Control-Allow-Origin': "'*'",
                        'method.response.header.Access-Control-Allow-Credentials': "'true'"
                    },

                },
                {
                    selectionPattern: 'Number of sides and number of dices must be an integer',
                    statusCode: "400",
                    responseParameters: {
                        'method.response.header.Content-Type': "'application/json'",
                        'method.response.header.Access-Control-Allow-Origin': "'*'",
                        'method.response.header.Access-Control-Allow-Credentials': "'true'"
                    }
                }
            ]
        })
        diceRoll.addMethod('POST', postDiceRollIntegration,
            {
                requestValidatorOptions: {
                    requestValidatorName: 'test-validator',
                    validateRequestBody: true,
                    validateRequestParameters: false
                },
                methodResponses: [
                    {
                        // Successful response from the integration
                        statusCode: '200',
                        // Define what parameters are allowed or not
                        responseParameters: {
                            'method.response.header.Content-Type': true,
                            'method.response.header.Access-Control-Allow-Origin': true,
                            'method.response.header.Access-Control-Allow-Credentials': true
                        },
                    },
                    {
                        // Same thing for the error responses
                        statusCode: '400',
                        responseParameters: {
                            'method.response.header.Content-Type': true,
                            'method.response.header.Access-Control-Allow-Origin': true,
                            'method.response.header.Access-Control-Allow-Credentials': true
                        },
                    }
                ]
            })


        this.urlOutput = new CfnOutput(this, 'url', {value: api.urlForPath("/")});

    }
}