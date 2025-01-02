import React, { useState, useEffect } from 'react'
import TagTree from './TagTree'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state/index';

export default function Content(props) {

  const dispatch = useDispatch();

  const [dataVal, setDataVal] = useState(props.data)

  useEffect(() => {
      setDataVal(props.data)
    }, [props.data])

  const handleOnChange = (event) => {
    setDataVal(event.target.value)

    dispatch(actionCreators.updateComponent(props.component.componentId, props.component.name, event.target.value, props.component.children, props.index))
  }

  if (props.children.length === 0) {
    return (
      <>
        <div className="input-group mt-2">
          <span className="input-group-text" id="inputGroup-sizing-default">DATA:</span>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={dataVal} onChange={handleOnChange}/>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        {props.children.map((childData, index) => (
          <TagTree data={childData} key={index} index={props.index} name={childData.name}/>
        ))}
      </>
    )
  }
}
