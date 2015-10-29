#!/usr/bin/env babel-node

import express from 'express';

const app = express();
app.listen( 3000 );

import React from 'react';

import { renderToString as render } from 'react-dom/server';
import { match, RoutingContext, createRoutes } from 'react-router';
import { base } from './Routes';
import { NoMatch } from './components';

const routes = createRoutes( base );

app.set( 'view engine', 'ejs' );
app.set( 'views', './views' );
app.use( '/node_modules', express.static( 'node_modules' ) );
app.use( '/', express.static( '.' ) );
app.use( ( req, res, next ) => {
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	match( { routes, location: req.url }, ( error, redirectLocation, renderProps ) => {
		if ( error ) {
			res.status( 500 ).send( error.message );
		} else if ( redirectLocation ) {
			res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
		} else if ( renderProps ) {
			let body = render( <RoutingContext {...renderProps} /> );
			res.render( 'index', { body } );
		} else {
			let body = render( <NoMatch /> );
			res.status( 404 ).render( '404', { body } );
		}
	} );
} );
