import React,{useRef,useEffect,useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './elements.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
function Drag(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const colorRef=useRef();
  const numRef=useRef();
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
          setShow(true);
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
                          {elemObj={type:elem,id:elem+index,styles:obj,text:element.value};
                        }
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
                      return <p id={elem.id} className="button" style={elem.styles} contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</p>
                    }
                    case "input":
                      {
                        return <input type="text" id={elem.id} style={elem.styles}  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}/>
                      }
                    case "div":
                      {
                        return <div id={elem.id} style={elem.styles}  contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</div>
                      }
                      case "hr":
                    {
                           return <p id={elem.id} style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}></p>
                    }
                    case "h1":
                      {
                          return <h1 id={elem.id} contentEditable="true"  style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)}>{elem.text}</h1>
                      }
                      case "smile":
                        {
                           return <img id={elem.id} style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
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
                   return <img id={elem+index}  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)} src="https://en.js.cx/clipart/ball.svg"></img>
                }
                case "button":
               {
                   return <button id={elem+index} className="button" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>Button</button>
               }
               case "input":
                {
                  return <input id={elem+index}   type="text" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}/>
                }
                case "para":
                {
                  return <p id={elem+index}  contentEditable="true" className="para"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>Paragraph</p>
                }
                case "div":
                {
                  return <div id={elem+index} contentEditable="true"  style={{border:'2px solid black',width:'200px'}} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>DIV</div>
                }
                case "hr":
                {
                    return <p id={elem+index} style={{width:'100%',height:'2px',background:'gray'}} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}></p>
                }
                case "h1":
                  {
                      return <h1 id={elem+index} contentEditable="true"  style={{width:'200px'}} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}>H1</h1>
                  }
                  case "smile":
                    {
                       return <img id={elem+index} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
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
            <div onMouseUp={()=>makeStyle()} onKeyUp={() => makeStyle()} id="droppedelems"  style={{margin:'auto',height:'500px',width:'90%',border:'2px solid white',zIndex:'100'}}>
                {convertJsonToHtml()}
                 {renderDrags()}
                 
            </div>
                 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Style your UI 
            <input type="color" ref={colorRef} />
            <input type="number" ref={numRef} placeholder="Enter height or width in px" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.fontWeight='bold'}}>B</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.fontStyle='italic'}}>Italics</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.textDecoration ='underline'}}>Underline</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.background=colorRef.current.value}}>Background</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.border='5px solid '+colorRef.current.value}}>Border Color</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.border =numRef.current.value+' solid '+colorRef.current.value}}>Border Width</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.color=colorRef.current.value}}>Color</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.height=numRef.current.value+'px'}}>Height</Button>
              <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.width=numRef.current.value+'px'}}>Width</Button>
              
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}
const mapStateToProps = state => {
  return {
     droppedElems:state.dropReducer,
     savedElems:state.storageReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
      saveWork:(json) => dispatch({type:'SET_IN_STORAGE',payload:json}),
      setData:(data) => dispatch({type:'ADD_ELEMENT',payload:data})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Drag);
