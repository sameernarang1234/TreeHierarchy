import React, { useState } from 'react'
import TagNavbar from './TagNavbar'
import Content from './Content';

export default function TagTree(props) {

  const [expandStatus, setExpandStatus] = useState("EXPANDED");

  const handleOnClick = (dir) => {
    setExpandStatus(dir);
  }

  return (
    <>
      <div className="container p-2 border border-dark-subtle rounded">
        <TagNavbar index={props.index} onArrowClicked={handleOnClick} title={props.name} componentId={props.data.componentId} component={props.data} isCollapsed={false} />
        {expandStatus === "EXPANDED" && <Content index={props.index} expandStatus={expandStatus} data={props.data.data} children={props.data.children} component={props.data} />}
      </div>
    </>
  )
}
