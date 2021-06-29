import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import * as cp from '@aws-cdk/aws-codepipeline';
import * as cpa from '@aws-cdk/aws-codepipeline-actions';
import * as pipelines from '@aws-cdk/pipelines';
import {BackendServiceStack, FrontendServiceStack} from "./backend-service-stack";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceArtifact = new cp.Artifact();
        const cloudAssemblyArtifact = new cp.Artifact();

        const sourceAction = new cpa.GitHubSourceAction({
            actionName: 'GitHub',
            output: sourceArtifact,
            oauthToken: SecretValue.secretsManager('remoteRepositorieKeys', {
                jsonField: "GitHub_key"
            }),
            owner: 'manrodri',
            repo: 'diceReact',
            branch: "pipeline"
        });

        const synthAction = pipelines.SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build',
            subdirectory: "infra"

        });

        const pipeline = new pipelines.CdkPipeline(this, 'Pipeline', {
            crossAccountKeys: false,
            cloudAssemblyArtifact,
            sourceAction,
            synthAction
        });



        const preProdBackend = new BackendServiceStack(this, "Pre-prod-backend")
        const preProdStage = pipeline.addApplicationStage(preProdBackend);
        const serviceUrl = pipeline.stackOutput(preProdBackend.urlOutput);

        const preProdFrontend = new FrontendServiceStack(this, 'Pre-prod-frontend')
        const preProdFrontendStage = pipeline.addApplicationStage(preProdFrontend)
        const frontendUrl = pipeline.stackOutput(preProdFrontend.bucketUrl)





    }

}