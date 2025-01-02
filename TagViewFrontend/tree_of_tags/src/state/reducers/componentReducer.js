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

  node.children.push(component)

  return treeLocal;
};

const editTree = (tree, childParentMap, componentId, data, name) => {

  let treeLocal = { ...tree };

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

  const index = action.index
  let treeList = state.treeList
  const component = action.component
  let idCount = state.idCount
  let childParentMapLocal = state.childParentMap
  let newChildParentMapsLocal = state.newChildParentMaps
  let editedTreeNodesLocal = state.editedTreeNodes

  switch (action.type) {
    case 'initialize':
      let treeListActionLocal = []
      action.treeList.forEach(t => {
        treeListActionLocal.push(t)
      })

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

      childParentMapLocal[compId] = action.parentId;
      newChildParentMapsLocal[compId] = action.parentId;

      editedTreeNodesLocal = editedTreeNodesLocal.concat([component])

      treeList[index] = updateTree(treeList[index], component, action.parentId, childParentMapLocal)

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
      editedTreeNodesLocal = editedTreeNodesLocal.concat([newTreeComp])
      childParentMapLocal[idCount+1] = -1
      newChildParentMapsLocal[idCount+1] = -1

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

      let editedTreeNodesLocal2 = [ ...state.editedTreeNodes ]
      editedTreeNodesLocal2.forEach(node => {
        if (node.componentId === action.componentId) {
          node.name = action.name
          node.data = action.data
        }
      })

      treeList[index] = editTree(treeList[index], childParentMapLocal, action.componentId, action.data, action.name)

      return {
        ...state,
        isInitialLoad: false,
        treeList: treeList,
        newChildParentMaps: state.newChildParentMaps
      };
      
    default:
      return state;
  }
}

export default reducer;