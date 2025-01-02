export const addComponent = (parentId = -1, name, data, children = [], index) => {
  return (dispatch, getState) => {
    const state = getState();
    const compId = state.idCount + 1;

    const component = {
      name: name,
      data: data,
      children: children,
      componentId: compId
    };

    dispatch({
      type: 'add',
      parentId: parentId,
      component: component,
      index: index
    });
  }
}

export const updateComponent = (componentId, name, data, children, index) => {
  return (dispatch) => {
    dispatch({
      type: 'update',
      componentId: componentId,
      name: name,
      data: data,
      children: children,
      index: index
    })
  }
}

export const initializeTree = (idCount, treeList, childParentMap, treeNodes, index=0) => {
  return (dispatch) => {
    dispatch({
      type: 'initialize',
      idCount: idCount,
      treeList: treeList,
      childParentMap: childParentMap,
      treeNodes: treeNodes,
      index: index
    })
  }
}

export const addNewTreeComponent = () => {

  return (dispatch) => {
    dispatch({
      type: 'new_tree'
    })
  }

  // return (dispatch, getState) => {
  //   const state = getState();
  //   const compId = state.idCount + 1;

  //   const component = {
  //     name: name,
  //     data: data,
  //     children: children,
  //     componentId: compId
  //   };

  //   dispatch({
  //     type: 'add',
  //     parentId: parentId,
  //     component: component,
  //     index: index
  //   });
  // }
}