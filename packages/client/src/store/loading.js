export default store => {
    store.on('@init', () => ({ loading: [] }))
  
    store.on('loading/start', ({loading}, startLoading) => {
      return { loading: [...loading, startLoading]}
    });

    store.on('loading/end', ({ loading }, endLoading) => {
        const index = loading.indexOf(endLoading);
        if (index > -1) {
            loading.splice(index, 1);
        }
        return { loading: loading}
    });
  }