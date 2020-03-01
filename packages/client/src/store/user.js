import { default as API } from './api';

export default store => {
    store.on('@init', () => ({ user: null }));

    store.on('user/signin', (state, data) => {
        store.dispatch('loading/start', 'USER_LOGIN');
        API.post('/auth/login', data, {}).then(({ok, id, email, error}) => {
          
          if (ok) {
            store.dispatch('user/set', { id, email });
          }
          else {
            store.dispatch('errors/set', 'Wrong password');
            // #TODO - based on status codes set error msg
          }

            store.dispatch('loading/end', 'USER_LOGIN');
        });
    });

    store.on('user/signup', (state, data) => {
        store.dispatch('loading/start', 'USER_SIGN_UP');
        API.post('/auth/signup', data, {}).then(({ ok, id, email, error }) => {
          if (ok) {
            store.dispatch('user/set', { id, email });
          }
          else {
            const response = error;

            if(response && response.status === 403){
              store.dispatch('errors/set', 'Wrong password.')
            }
          }

            store.dispatch('loading/end', 'USER_SIGN_UP');
        });
    });

    store.on('user/logout', () => {
        store.dispatch('loading/start', 'USER_LOGOUT');
        API.get('/auth/logout').then(() => {
            store.dispatch('user/set', null);
            store.dispatch('loading/end', 'USER_LOGOUT');
        });
    });

    store.on('user/get', () => {
        store.dispatch('loading/start', 'USER_INFO');
        API.get('/auth/userinfo').then(({ ok, id, email }) => {
                if (ok) {
                    store.dispatch('user/set', { id, email });
                }
                
                store.dispatch('loading/end', 'USER_INFO');
        });
        
    });

    store.on('user/set', (state, newUser) => {
        return { user: newUser };
    });
};
