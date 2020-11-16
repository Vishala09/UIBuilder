import React, { useEffect,useState } from 'react'
import './elements.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser from 'react-html-parser';
import Drag from './drag';
import { connect } from 'react-redux';
import './Drop.css';
import GetConstantsElements from './Elements'
function Drop(props) {
 
 //DRAG AND DROP FROM HTML API
    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
       
        if(document.getElementById(data)){
          document.getElementById(data).style.opacity=1;
          props.setData(data);
        }
        
    }
//RENDER CONSTANT ELEMENTS TO BE DRAGGED ON TOP
      const renderElements = () => {
        return GetConstantsElements()
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
