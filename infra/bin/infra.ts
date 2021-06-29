#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {FrontendStack} from '../lib/frontend-stack';
import {BackendStack} from "../lib/backend-stack";
import {PipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
new FrontendStack(app, 'FrontendDiceReactStack', {
    env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION},
});

new PipelineStack(app, "PipelineDiceRollStack", {
     env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION},
})






