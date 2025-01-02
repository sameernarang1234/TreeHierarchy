const updateTree = (tree, component, parentId, childParentMap) => {
  let treeLocal = { ...tree }; 

  let parents = [parentId];
  let pId = childParentMap[parentId];

  while (pId >= 0) {
    parents = [pId].concat(parents);
    pId = childParentMap[pId];
  }

  let node = treeLocal;
  
  parents.forEach(id => {
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].componentId === id) {
        node = children[i];
        break;
      }
    }
  });

  // node.children = [component, ...node.children]; 
  node.children.push(component)

  return treeLocal;
};

const editTree = (tree, childParentMap, componentId, data, name) => {

  let treeLocal = { ...tree };

  console.log('INSIDE EDIT TREE')
  console.log(treeLocal)
  console.log(tree)

  let parents = [];
  let pId = componentId;

  while (pId >= 0) {
    parents = [pId].concat(parents);
    pId = childParentMap[pId];
  }

  let node = treeLocal;
  
  parents.forEach(id => {
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].componentId === id) {
        node = children[i];
        break;
      }
    }
  });

  node.name = name
  node.data = data

  return treeLocal;
}

const reducer = (state = {
  idCount: 1,
  childParentMap: { 1: -1 },
  newChildParentMaps: {},
  originalTreeNodes: [{
    name: 'Root Tag',
    componentId: 1,
    data: 'Data',
    children: []
  }],
  editedTreeNodes: [{
    name: 'Root Tag',
    componentId: 1,
    data: 'Data',
    children: []
  }],
  isInitialLoad: true,
  treeList: [{
    name: 'Root Tag',
    componentId: 1,
    data: 'Data',
    children: []
  }]
}, action) => {

  console.log('INSIDE REDUCER :')
  console.log('ACTION =')
  console.log(action)
  console.log('STATE =')
  console.log(state)

  const index = action.index
  let treeList = state.treeList
  const component = action.component
  let idCount = state.idCount
  let childParentMapLocal = state.childParentMap
  let newChildParentMapsLocal = state.newChildParentMaps
  // let originalTreeNodesLocal = state.originalTreeNodes
  let editedTreeNodesLocal = state.editedTreeNodes
  // let isInitialLoadLocal = state.isInitialLoad

  switch (action.type) {
    case 'initialize':

      console.log('INSIDE INITIALIZE REDUCER')
      console.log(action)
      console.log(state)

      // return {
      //   idCount: action.idCount,
      //   tree: action.tree,
      //   childParentMap: action.childParentMap,
      //   originalTreeNodes: action.treeNodes,
      //   editedTreeNodes: action.treeNodes,
      //   isInitialLoad: state.isInitialLoad,
      //   newChildParentMaps: {}
      // }

      let treeListActionLocal = []
      action.treeList.forEach(t => {
        treeListActionLocal.push(t)
      })

      console.log('TREE LIST ACTION LOCAL =')
      console.log(treeListActionLocal)

      return {
        treeList: treeListActionLocal,
        idCount: action.idCount,
        childParentMap: action.childParentMap,
        newChildParentMaps: {},
        originalTreeNodes: JSON.parse(JSON.stringify(action.treeNodes)),
        editedTreeNodes: JSON.parse(JSON.stringify(action.treeNodes)),
        isInitialLoad: state.isInitialLoad
      }
    case 'add':

      const compId = idCount + 1;
      component.componentId = compId

      // console.log('INSIDE REDUCER')
      // console.log(compId)
      // console.log(action)
      // console.log(tree)

      // let newChildParentMapsLocal = treeList[index].newChildParentMaps

      childParentMapLocal[compId] = action.parentId;
      newChildParentMapsLocal[compId] = action.parentId;

      // let editedTreeNodesLocalAdd = treeList[index].editedTreeNodes
      editedTreeNodesLocal = editedTreeNodesLocal.concat([component])


      // treeList[index].idCount = compId
      // treeList[index].childParentMap = childParentMapLocal
      treeList[index] = updateTree(treeList[index], component, action.parentId, childParentMapLocal)
      // treeList[index].editedTreeNodes = editedTreeNodesLocal
      // treeList[index].newChildParentMaps = newChildParentMapsLocal

      // return {
      //   ...state,
      //   isInitialLoad: false,
      //   idCount: state.idCount + 1,
      //   childParentMap: childParentMapLocal,
      //   tree: updateTree(state.tree, component, action.parentId, childParentMapLocal),
      //   editedTreeNodes: editedTreeNodesLocalAdd,
      //   newChildParentMaps: newChildParentMapsLocal
      // };

      return {
        ...state,
        isInitialLoad: false,
        idCount: idCount + 1,
        childParentMap: childParentMapLocal,
        treeList: treeList,
        editedTreeNodes: editedTreeNodesLocal,
        newChildParentMaps: newChildParentMapsLocal
      };

    case 'new_tree':
      const newTreeComp = {
        name: 'New Root Tag',
        componentId: idCount + 1,
        data: 'New Root Data',
        children: []
      }

      treeList.push(newTreeComp)
      // editedTreeNodesLocal.push(newTreeComp)
      editedTreeNodesLocal = editedTreeNodesLocal.concat([newTreeComp])
      childParentMapLocal[idCount+1] = -1
      newChildParentMapsLocal[idCount+1] = -1

      console.log('INSIDE new_tree REDUCER')
      console.log(treeList)
      console.log(editedTreeNodesLocal)
      console.log(childParentMapLocal)
      console.log(newChildParentMapsLocal)

      return {
        ...state,
        isInitialLoad: false,
        idCount: idCount + 1,
        childParentMap: childParentMapLocal,
        treeList: treeList,
        editedTreeNodes: editedTreeNodesLocal,
        newChildParentMaps: newChildParentMapsLocal
      };

    case 'update':

      console.log('INSIDE UPDATE REDUCER')
      console.log(action)
      console.log(state)


      let editedTreeNodesLocal2 = [ ...state.editedTreeNodes ]
      // let editedTreeNodesLocal = treeList[index].editedTreeNodes
      editedTreeNodesLocal2.forEach(node => {
        if (node.componentId === action.componentId) {
          node.name = action.name
          node.data = action.data
        }
      })

      treeList[index] = editTree(treeList[index], childParentMapLocal, action.componentId, action.data, action.name)
      // treeList[index].editedTreeNodes = editedTreeNodesLocal

      // return {
      //   ...state,
      //   isInitialLoad: false,
      //   tree: editTree(tree, childParentMapLocal, component),
      //   editedTreeNodes: editedTreeNodesLocal,
      //   newChildParentMaps: state.newChildParentMaps
      // };

      return {
        ...state,
        isInitialLoad: false,
        treeList: treeList,
        // editedTreeNodes: editedTreeNodesLocal,
        newChildParentMaps: state.newChildParentMaps
      };

      // return {
      //   treeList: treeList,
      //   isInitialLoad: false
      // }
      

    default:
      return state;
  }
}

export default reducer;