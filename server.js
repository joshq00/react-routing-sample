#!/usr/bin/env babel-node

import express from 'express';

const app = express();
app.listen( 3000 );

import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';
import { match, RoutingContext, createRoutes } from 'react-router';
import { base } from './Routes';
import { NoMatch } from './components';
import { memoize } from 'lodash';
const routes = createRoutes( base );
const render = renderToStaticMarkup;
// const renderRoute = _.memoize( ( props ) => render( <RoutingContext { ...props } /> ) );

let renderRoute = memoize( render );
setInterval( () => {
	renderRoute = memoize( render );
}, 500 );

app.set( 'view engine', 'ejs' );
app.set( 'views', './views' );
app.use( '/node_modules', express.static( 'node_modules' ) );
app.use( '/', express.static( '.' ) );
app.use( ( req, res, next ) => {
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	match( { routes, location: req.url }, ( error, redirectLocation, props ) => {
		if ( error ) {
			res.status( 500 ).send( error.message );
		} else if ( redirectLocation ) {
			res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
		} else if ( props ) {
			// let body = renderRoute( props );
			let body = renderRoute( <RoutingContext { ...props } /> );
			res.render( 'index', { body } );
		} else {
			let body = render( <NoMatch /> );
			res.status( 404 ).render( '404', { body } );
		}
	} );
} );
