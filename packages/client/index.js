import './index.css';
import App from './src/App';
import { HomePage, FeedPage, EatsPage } from './src/pages';
// import * as serviceWorker from "./serviceWorker";

export { App, HomePage, FeedPage, EatsPage };

/**
 * since we need to be IE11 compatible I won't be using the serviceWorker
 */
//serviceWorker.unregister();
