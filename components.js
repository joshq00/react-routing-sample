import React from 'react';
import { Link } from 'react-router';

function bare ( title ) {
	return ( { children, ...props } ) => (
		<div { ...props }>
			{ title }
			{ children }
		</div>
	);
}

let paths = [ '/', '/about', '/users', '/users/joe' ];
export const App = ( { children, ...props } ) => (
	<div { ...props }>
		<h1>App</h1>
		{ paths.map( path => <Link to={ path }>{ path }</Link> ) }
		{ children }
	</div>
);
export const About = bare( 'About' );
export const Users = bare( 'Users' );
export const User = bare( 'User' );
export const NoMatch = bare( '404 error' );
