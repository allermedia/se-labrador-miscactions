import * as core from '@actions/core';

const workflowAction = core.getInput('WORKFLOW_ACTION');
const LAIKA_TOKEN = core.getInput('LAIKA_TOKEN');
const LAIKA_ENDPOINT = core.getInput('LAIKA_ENDPOINT');
const LAIKA_DEPLOY_REF = core.getInput('LAIKA_DEPLOY_REF');

const deployClusterRepo = async () => {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LAIKA_TOKEN}`
    },
    body: JSON.stringify({ deploy_ref: LAIKA_DEPLOY_REF }),
  };

  return await fetch(LAIKA_ENDPOINT, requestOptions);
};

const handleFlowAction = async () => {
  switch (workflowAction) {
    case 'deploy-cluster-repo':
      if (LAIKA_TOKEN && LAIKA_ENDPOINT && LAIKA_DEPLOY_REF) {
        const deployStatus = await deployClusterRepo();
        console.log(`Deployed ${LAIKA_DEPLOY_REF} with success status: ${deployStatus?.success}`);
      } else {
        console.log('Missing arguments. Laika Token, Endpoint and Deploy ref are mandatory');
      }
      break;
    default:
      console.log(`Workflow action not supported!`);
  }
};

handleFlowAction().then(r => console.log(`${workflowAction} was run!`));
