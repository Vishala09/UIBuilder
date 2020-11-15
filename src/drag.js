import React,{useRef,useEffect,useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './elements.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Utility from './Utility';
import './Drag.css';
function Drag(props) {
  
  const [currentID, setCurrentID] = useState(null);

  //CUSTOM DRAG AND DROP FEATURE. 
      //WHEN MOUSE IS DOWN ON AN ELEM, 
          //MOUSE MOVE IS CONFIGURED AND POSITIONS OF MOUSE MOVE ARE SET TO DRAGGING ELEMENT
              //ONCE MOUSE IS UP,MOUSE MOVE IS REMOVED
    function mousedown(event,id) {
        
         let ball = document.getElementById(id);
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
        ball.style.position = 'absolute';
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
                    ball.style.left = pageX - shiftX + 'px';
                    ball.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
          }

        function onMouseUp() {
            document.getElementById('droppedelems').removeEventListener('mousemove', onMouseMove); 
          };
        ball.addEventListener('mouseup',onMouseUp)
        document.getElementById('droppedelems').addEventListener('mousemove', onMouseMove);   
  
      };
      
      let dragstart = function() {
        return false;
      };
    

      //APPLYING STYLES TO ELEMENTS IN UI- SELECT(HIGHLIGHT/CTRL+A) AND A DIALOG BOX OPENS -> WORK ON STYLES FROM THERE
      function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
      }
      function makeStyle(){
        var selectedText = getSelectedText();
        if (selectedText) {
          setCurrentID(document.activeElement.id);
         // setShow(true);
          props.setShowModal();
        }
      }

      //FORMATTING DONE BEFORE SAVING TO LOCAL STORAGE
      const save =() => {
            let  allData=[...props.savedElems,...props.droppedElems];
            console.log(allData);
            let saveData=[];
            let add=props.savedElems.length;
            allData.map((elem,index)=> {
              let dom;
                    if(index<add)
                    {
                        dom=document.getElementById(elem.id);
                        if(dom)
                      {
                        let element = dom;
                        let style=element.style;
                        let css=window.getComputedStyle(element,null)
                        let i=0;
                        let obj={};
                        while(style[i])
                        {
                          obj[style[i]]=css[style[i]];
                          i++;
                        }
                        
                        let elemObj;
                        if(element.nodeName=='INPUT')
                        {elemObj={type:elem.type,id:elem.id,styles:obj,text:element.value};
                      }
                        else
                        elemObj={type:elem.type,id:elem.id,styles:obj,text:element.textContent};
                        saveData.push(elemObj);
                        console.log("elem",saveData[index])
                      }
                    }
                    else
                    {
                        dom=document.getElementById(elem+index);
                        if(dom)
                        {
                          let element = dom;
                          let style=element.style;
                          let css=window.getComputedStyle(element,null);
                          let i=0;
                          let obj={};
                          while(style[i])
                          {
                            obj[style[i]]=css[style[i]];
                            i++;
                          }
                          
                          let elemObj;
                          if(element.nodeName=='INPUT')
                          {elemObj={type:elem,id:elem+index,styles:obj,text:element.value};}
                          else
                          elemObj={type:elem,id:elem+index,styles:obj,text:element.textContent};
                          saveData.push(elemObj);
                          console.log("elem",saveData[index])
                        }
                    }
                   
                   
                  
            });
            props.saveWork(saveData)
      }

      //LOADING PAGE INITIALLY WITH DATA FROM LOCAL STORAGE
      const convertJsonToHtml = () => {
          return props.savedElems.map((elem,ind)=>{

               switch(elem.type)
               {
                   case "button":
                    {
                        return <button id={elem.id} className="button" style={elem.styles} contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</button>
                    }
                    case "para":
                    {
                      return <p id={elem.id}  style={elem.styles} className="button centerElem borderForElem" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</p>
                    }
                    case "input":
                      {
                        return <input type="text" id={elem.id} style={elem.styles} className="centerElem"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}/>
                      }
                    case "div":
                      {
                        return <div id={elem.id} style={elem.styles} className="centerElem borderForDiv" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</div>
                      }
                      case "hr":
                    {
                           return <p id={elem.id} style={elem.styles} className="centerElem hr cursorpointer" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}></p>
                    }
                    case "h1":
                      {
                          return <h1 id={elem.id} contentEditable="true" className="centerElem heading1"  style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</h1>
                      }
                   case "smile":
                        {
                           return <img id={elem.id} style={elem.styles} className="centerElem" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
                        } 
                   case "coffee":
                          {
                            return  <p id={elem.id} style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)} className="cursorpointer" ><FontAwesomeIcon   icon={faCoffee} /></p>;
                         }  
               }
           })
      }
      
      //RENDERING THE UI ELEMENTS THAT ARE DROPPED. FREE DRAGGING IS DONE HERE
      const renderDrags = () => {
        let add=props.savedElems.length;
        return props.droppedElems.map((elem,index) => 
          {  
            index=index+add;
          switch(elem)
            {
                case "img":
                {
                   return <img id={elem+index} className="centerElem"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)} src="https://en.js.cx/clipart/ball.svg"></img>
                }
                case "button":
               {
                   return <button id={elem+index}  className="button centerElem" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>Button</button>
               }
               case "input":
                {
                  return <input id={elem+index} className="centerElem"  type="text" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}/>
                }
                case "para":
                {
                  return <p id={elem+index} className="centerElem borderForElem" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>Paragraph</p>
                }
                case "div":
                {
                  return <div id={elem+index} className="centerElem borderForDiv" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>DIV</div>
                }
                case "hr":
                {
                    return <p id={elem+index} className="centerElem hr cursorpointer"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}></p>
                }
                case "h1":
                {
                    return <h1 id={elem+index} className="centerElem heading1" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>H1</h1>
                }
                case "smile":
                  {
                      return <img id={elem+index} className="centerElem" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
                  } 
             case "coffee":
                {
                  return  <p  className="cursorpointer " ><FontAwesomeIcon id={elem+index} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}   icon={faCoffee} /></p>;
                      
               }      
            }
           }
         )
      }
    let clear = () => {
      let yes=window.confirm("Are you sure you want to erase all the data?");
      if(yes)
      {
         localStorage.removeItem('elements') ;
         window.location.reload();
      }
    }
    return (
      <div>
        <button style={{float:"right",position:'sticky',marginTop:'-100px'}} onClick={() => save()}  className="btn btn-primary" >Save my work</button>
        <button style={{float:"right",position:'sticky',marginTop:'-60px'}} onClick={() => clear()}  className="btn btn-danger" >Clear all my work</button>
        <p  style={{float:"right",position:'sticky',marginTop:'-25px'}}>Ctrl+A or Highlight any text to apply styles</p>
            <div data-testid="toBeDraggedelements"   onMouseUp={()=>makeStyle()} onKeyUp={() => makeStyle()} id="droppedelems"  style={{margin:'auto',height:'600px',width:'90%',border:'2px solid black',zIndex:'100'}}>
                {convertJsonToHtml()}
                 {renderDrags()}
                 
            </div>
                 
      
      {
        //To update Styles for elements in UI
         props.show && <Utility  currentID={currentID} />
      }
      
      </div>
    )
}
const mapStateToProps = state => {
  return {
     droppedElems:state.dropReducer,
     savedElems:state.storageReducer,
     show:state.currentIdReducer.show
  }
}
const mapDispatchToProps = dispatch => {
  return {
      saveWork:(json) => dispatch({type:'SET_IN_STORAGE',payload:json}),
      setData:(data) => dispatch({type:'ADD_ELEMENT',payload:data}),
      setShowModal:() => dispatch({type:'SET_TRUE'}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Drag);
