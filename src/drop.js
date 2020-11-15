import React, { useEffect,useState } from 'react'
import './elements.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser from 'react-html-parser';
import Drag from './drag';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './Drop.css';
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
         return props.elems.map((elem,index) => 
           {  
           switch(elem)
             { 
               
                 case "img":
                {
                    return <img key="img" id="img" src="https://en.js.cx/clipart/ball.svg" draggable="true" onDragStart={(event)=>drag(event)} width="336" height="69" />
                }
                 case 'button':
                {
                    return <span key="buttonspan"><button key="button" id={'button'} draggable="true" onDragStart={(event)=>drag(event)} >Button</button></span>
                }
                case "input":
                {
                  return <span key='input' id='input' draggable='true' style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Input Box</span>
                }
                case "para":
                {
                  return <span key="para" id="para" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Paragraph</span>
                }
                case "div":
                {
                  return <span key="div" id="div" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Div</span>
                }
                case "hr":
                {
                   return <span key="hr" id="hr" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Line</span>
                }
                case "h1":
                  {
                     return <span key="h1" id="h1" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>H1</span>
                  }
                case "smile":
                {
                   return <img key='smile' id="smile" onDragStart={(event)=>drag(event)} draggable="true" src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
                }
               
                case "coffee":
                {
                   return <span key='coffee' id="coffee" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)} draggable="true">CoffeeIcon</span>
                   return  <FontAwesomeIcon id="coffee" onDragStart={(event)=>drag(event)} draggable="true" icon={faCoffee} />;
                }
                
             }
            }
         )
      }

    return (
        <div>
                <div data-testid="constantelements" className="allElements">
                    {
                        renderElements()
                    }
                    
                </div>
                <div id="drop" key='drag' onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)} className="droppedElems">
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
