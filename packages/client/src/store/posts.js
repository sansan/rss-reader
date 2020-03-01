import { default as API } from './api';

export default store => {
    store.on('@init', () => ({ posts: [] }));

    store.on('posts/get', () => {
        store.dispatch('loading/start', 'FEED');
        API.get('/feed').then(({stats, items }) => {
            store.dispatch('posts/set', items);
            store.dispatch('stats/set', stats)         
            store.dispatch('loading/end', 'FEED');
        });
    });

    store.on('posts/set', (state, newPosts) => {
        return { posts: newPosts };
    });

    store.on('posts/destroy', () => ({ posts: []}));

};