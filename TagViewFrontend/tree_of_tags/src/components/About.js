import React from 'react'

export default function About() {
  return (
    <>
      <div className="container">
        <div className="container" style={{marginTop: "5vh"}}>
        <h1 style={{color: "rgb(12, 16, 59)"}}>About TagTree ...</h1>
        <p style={{color: "rgb(59, 65, 136)"}}>
          TagTree is a web utility to create multiple nested tree hierarchy structures
          in each of which there will be one Root Node, a Data Element which will be 
          associated with it, and a list of its child nodes. The Frontend of the 
          application is implemented using <strong>React.js (version 18)</strong> for frontend, along with 
          libraries like <strong>Redux, Redux-Persist, Bootstrap</strong> and <strong>Material Icons</strong>. 
          It uses a <strong>Python</strong> based backend, implemented using <strong>Django Rest Framework</strong> for creating the REST APIs and the tree structure, on Exporting it, is stored in a <strong>SQLite</strong> Database.
        </p>
        <p style={{color: "rgb(59, 65, 136)"}}><strong>-Sameer Narang</strong></p>
        </div>
      </div>
    </>
  )
}
