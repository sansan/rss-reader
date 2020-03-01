// #TODO - decide how to store errors so that updating them would not cause re-render
// idea is to have multi-scope errors (e.g. general whole app and then component based)
// e.g. globalErrorState, componentErrorState 
export default store => {
    store.on('@init', () => ({ errorState: [] }))
  
    store.on('errors/set', ({errorState}, error) => {
      return { errorState: [...errorState, error]}
    });

    store.on('errors/clear', () => ({ errorState: [] }));

    store.on('errors/destroy', () => ({ errorState: []}));

  }