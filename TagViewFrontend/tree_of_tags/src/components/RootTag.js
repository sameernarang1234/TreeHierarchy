import React, {useEffect, useState} from 'react'
import TagTree from './TagTree'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { actionCreators } from "../state/index";

export default function RootTag() {

  const treeData = useSelector(state => state.component);
  const dispatch = useDispatch();
  const [showJsonTree, setShowJsonTree] = useState(false);
  const [jsonTreeList, setJsonTreeList] = useState([]);

  const buildJsonTree = (currNode) => {
    let treeNode = {}
    treeNode['name'] = currNode.name

    if (currNode.children === undefined || currNode.children.length === 0) {
      treeNode['data'] = currNode.data
      return treeNode
    }

    let currChildren = []

    currNode.children.forEach(childNode => {
      currChildren.push(buildJsonTree(childNode))
    })

    treeNode['children'] = currChildren

    return treeNode
  }

  const buildJsonTreeList = (treeList) => {
    let jsonTreeList = []

    treeList.forEach(tree => {
      jsonTreeList.push(JSON.stringify(buildJsonTree(tree)))
    })

    return jsonTreeList
  }

  const modifyStateWithFetchedData = (newState) => {
    const idCount = newState.idCount
        const treeList = newState.treeList
        const childParentMap = newState.childParentMap
        const treeNodes = newState.treeNodes

        dispatch(actionCreators.initializeTree(idCount, treeList, childParentMap, treeNodes))
  }

  useEffect(() => {
    if (treeData.isInitialLoad) {
      // const url = "https://206.189.135.103:443/api/tree/"
      const url = "/api/proxy"

      axios.get(url).then(response => {
        const responseData = response.data

        modifyStateWithFetchedData(responseData)
      }).catch(e => {
        console.log('ERROR = ', e)
      })
    }
  }, [])

  const callUpdateTreeAPI = (url, payload) => {
    axios.put(url, payload).then(response => {
      const responseData = response.data

      modifyStateWithFetchedData(responseData)
    }).catch(e => {
      console.log('ERROR = ', e)
    }).finally(() => {
      let jsonTreeListLocal = buildJsonTreeList(treeData.treeList)

      setJsonTreeList(jsonTreeListLocal)
      setShowJsonTree(true)
    })
  }

  const callAddNewTreeAPI = (url, payload) => {
    axios.post(url, payload).then(response => {
      const responseData = response.data

      modifyStateWithFetchedData(responseData)
    }).catch(e => {
      console.log('ERROR = ', e)
    }).finally(() => {
      let jsonTreeListLocal = buildJsonTreeList(treeData.treeList)

      setJsonTreeList(jsonTreeListLocal)
      setShowJsonTree(true)
    })
  }

  const handleExportClick = () => {

    const editedNodes = treeData.editedTreeNodes
    const originalNodes = treeData.originalTreeNodes

    let editedData = []
    let newData = []

    for (let i = 0; i < editedNodes.length; i++) {
      
      if (i < originalNodes.length) {
        if (JSON.stringify(editedNodes[i]) !== JSON.stringify(originalNodes[i])) {
          editedData.push(editedNodes[i])
        }
      }
      else {
        newData.push(editedNodes[i])
      }
    }

    const apiPayload = {
      newNodes: newData,
      editedNodes: editedData,
      newChildParentMaps: treeData.newChildParentMaps
    }

    let isNewTreeHierarachyAdded = false
    for (const key in treeData.newChildParentMaps) {
      if (treeData.newChildParentMaps[key] < 0) {
        isNewTreeHierarachyAdded = true
        break
      }
    }

    const url = "/api/proxy"

    if (!isNewTreeHierarachyAdded) {
      // const url = "https://206.189.135.103:443/api/update-tree/"
      callUpdateTreeAPI(url, apiPayload)
    }
    else {
      // const url = "https://206.189.135.103:443/api/add-new-tree/"
      callAddNewTreeAPI(url, apiPayload)
    }
  }

  return (
    <>
      {treeData.treeList.map((treeNode, index) => (
        <div className='mt-3'>
          <h3>Tree Hierarchy {index+1}:</h3>
          <TagTree data={treeNode} index={index} key={index} name={treeNode.name}/>
        </div>
      ))}
      <div className="row justify-content-end">
        <div className="col d-flex justify-content-start">
          <button className="btn mt-3" style={{backgroundColor: "rgb(45, 54, 153)", color: 'white'}} onMouseUp={() => {
            dispatch(actionCreators.addNewTreeComponent())
          }}>+ Add New</button>
        </div>
        <div className="col d-flex justify-content-end">
          <button className="btn mt-3" style={{backgroundColor: "rgb(58, 136, 98)", color: 'white'}} onMouseUp={handleExportClick}>Export</button>
        </div>
      </div>
      {showJsonTree && jsonTreeList.map((tree, i) => (
        <div className="container mt-4">
        {tree}
      </div>
      ))}
    </>
  )
}
