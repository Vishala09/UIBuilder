import React, { useEffect,useState } from 'react'
import './elements.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser from 'react-html-parser';
import Drag from './drag';
import { connect } from 'react-redux';
import './Drop.css';
import getConstantsElements from './Elements'
function Drop(props) {
 
 //DRAG AND DROP FROM HTML API
    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        console.log(ev.target.id,'dragging');
          ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        
        if(document.getElementById(data)){
          props.setData(data);
        }
        
      }
//RENDER CONSTANT ELEMENTS TO BE DRAGGED ON TOP
      const renderElements = () => {
        return getConstantsElements()
      }

    return (
        <div>
                <div data-testid="constantelements" className="allElements">
                    {
                        renderElements()
                    }
                    
                </div>
                <div id="drag" key='drag' onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)} className="droppedElems">
                    <div key='dropped' id="dropped">
                                  <Drag />
                    </div> 
                </div>
        </div>
    )
}
const mapStateToProps = state => {
  return {
     elems:state.setReducer,
     droppedElems:state.dropReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
     setData:(data) => dispatch({type:'ADD_ELEMENT',payload:data})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Drop);
