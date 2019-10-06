import API, {graphqlOperation} from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import {createTodo} from './graphql/mutations';

import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

async function createNewTodo() {
	const todo = {name: 'Use AppSync', description: 'Realtime and Offline'};
	return await API.graphql(graphqlOperation(createTodo, {input: todo}));
}

const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');

MutationButton.addEventListener('click', evt => {
	MutationResult.innerHTML = `MUTATION RESULTS:`;
	createNewTodo().then(evt => {
		MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
	});
});
