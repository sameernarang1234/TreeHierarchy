const reducer = (state = {isExpanded: false}, action) => {
  if (action.type === 'EXPAND') {
    return {
      isExpanded: true
    }
  }
  else {
    return {
      isExpanded: false
    }
  }
}

export default reducer;