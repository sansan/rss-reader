export default store => {
    store.on('@init', () => ({ stats: [] }))
  
    store.on('stats/set', (state, newStats) => {
      console.log(newStats)
      return { stats: newStats}
    });

    store.on('stats/destroy', () => ({ stats: []}));
  }