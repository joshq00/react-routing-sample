import React from 'react';
import { Router, Route } from 'react-router';
import { App, About, Users, User } from './components';

export const base = (
	<Route path="/" component={App}>
		<Route path="about" component={About}/>
		<Route path="users" component={Users}>
			<Route path=":userId" component={User}/>
		</Route>
	</Route>
);
export default ( props ) => (
	<Router { ...props }>
		{ base }
	</Router>
);
