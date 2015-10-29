import Routes from './Routes';
import { render } from 'react-dom';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

global.app = render( <Routes history={ history } />, document.querySelector( 'main' ) );
