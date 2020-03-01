// store/index.js
import createStore from 'storeon';

import user from './user';
import stats from './stats';
import posts from './posts';
import loading from './loading';
import errorState from './errors';


export const store = createStore([
    user,
    stats,
    posts,
    loading,
    errorState,
    process.env.NODE_ENV !== 'production' && require('storeon/devtools/logger')
]);