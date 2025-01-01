import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ArrowForward, ArrowDownward } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";

const TagNavbar = (props) => {

  const dispatch = useDispatch();

  const [isTitleEditEnabled, setIsTitleEditEnabled] = useState(false);
  const [titleLocal, setTitleLocal] = useState(props.title);
  const [isCollapsedLocal, setIsCollapsedLocal] = useState(props.isCollapsed);

  useEffect(() => {
    setTitleLocal(props.title)
  }, [props.title])

  const handleOnChange = (event) => {
    setTitleLocal(event.target.value);
  }

  const handleOnKeyUp = (event) => {
    if (event.key === 'Enter') {
      if (titleLocal === '') {
        setTitleLocal('Data')
      }
      setIsTitleEditEnabled(false);
      dispatch(actionCreators.updateComponent(props.componentId, titleLocal, props.component.data, props.component.children, props.index))
    }
  }

  const handleIsArrowClicked = () => {
    if (isCollapsedLocal === true) {
      setIsCollapsedLocal(false);
      props.onArrowClicked('EXPANDED')
    }
    else {
      setIsCollapsedLocal(true);
      props.onArrowClicked('COLLAPSED')
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg rounded" style={{backgroundColor: "rgb(45, 54, 153)"}} data-bs-theme='light'>
        <div className="container-fluid">
          <div className="navbar-brand bg-light rounded ps-3 pe-3 pt-0" style={{color: 'rgb(45, 54, 153)', cursor: 'pointer'}} onMouseDown={handleIsArrowClicked}>
            {isCollapsedLocal === true ? <ArrowForward /> : <ArrowDownward />}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {isTitleEditEnabled ?
                <input
                  className="form-control me-2"
                  placeholder="Data"
                  value={titleLocal}
                  onChange={handleOnChange}
                  aria-label="Search"
                  onKeyUp={handleOnKeyUp}
                /> : 
                <div className="nav-link active pt-0 pb-0" aria-current="page" href="#" style={{color: 'white'}} onMouseDown={() => setIsTitleEditEnabled(true)}>
                  {titleLocal}
                </div>}
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-light" onMouseDown={() => dispatch(actionCreators.addComponent(props.componentId, 'New Child', 'Data', [], props.index))}>
                Add Child
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

TagNavbar.propTypes = {
  title: PropTypes.string
}

export default TagNavbar;
