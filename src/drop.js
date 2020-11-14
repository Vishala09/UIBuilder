import React, { useEffect,useState } from 'react'
import './elements.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser from 'react-html-parser';
import Drag from './drag';
import { connect } from 'react-redux';

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
         // document.getElementById(data).draggable=false;
         // document.getElementById(data).ondragstart=function(){return false;}
         
          //let clone = document.getElementById(data).cloneNode(true);
          //clone.id=data+'clone';
          //console.log('clone',clone)
          //document.body.appendChild(clone);
          //ev.target.appendChild(document.getElementById(data+'clone'));
          props.setData(data);
          //props.setElements(data);
          //let element = document.getElementById(data+'clone');
          //element.parentNode.removeChild(element);
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
                    return <img id="img" src="https://en.js.cx/clipart/ball.svg" draggable="true" onDragStart={(event)=>drag(event)} width="336" height="69" />
                }
                 case 'button':
                {
                    return <span><button id={'button'}  className={'button'} draggable="true" onDragStart={(event)=>drag(event)} >Button</button></span>
                }
                case "input":
                {
                  return <span id="input" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Input Box</span>
                }
                case "para":
                {
                  return <span id="para" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Paragraph</span>
                }
                case "div":
                {
                  return <span id="div" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Div</span>
                }
                case "hr":
                {
                   return <span id="hr" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>Line</span>
                }
                case "h1":
                  {
                     return <span id="h1" draggable="true" style={{border:'2px solid black'}} onDragStart={(event)=>drag(event)}>H1</span>
                  }
                case "smile":
                {
                   return <img id="smile" onDragStart={(event)=>drag(event)} draggable="true" src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
                }
               
                default:
                {
                   return '';
                }
                
             }
            }
          )
      }

    return (
        <div>
              <div className="">
                <div className="" style={{height:'100px',width:'100%', border:'3px solid blue',background:'gainsboro',overflow:'auto',padding:'10px'}}>
                    {
                        renderElements()
                    }
                    
                </div> 
                
              </div>
                <div id="drop" onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)} style={{margin:'auto',height:'100px',width:'90%',zIndex:'2000'}}>
                    <div id="dropped">
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
