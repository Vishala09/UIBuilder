import { mousedown,dragstart } from './FreeDrag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
export default function GetDroppedElements({elem,index}){
    const ref=useRef();
    switch(elem)
            {
                
                case "button":
               {
                   return <button id={elem+index} ref={ref} className="button centerElem" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}>Button</button>
               }
               case "input":
                {
                  return <input ref={ref} id={elem+index} className="centerElem"  type="text" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}/>
                }
                case "para":
                {
                  return <p ref={ref} id={elem+index} className="centerElem borderForElem" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}>Paragraph</p>
                }
                case "div":
                {
                  return <div ref={ref} id={elem+index} className="centerElem borderForDiv" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}>DIV</div>
                }
                case "hr":
                {
                    return <p ref={ref} id={elem+index} className="hr cursorpointer"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}></p>
                }
                case "h1":
                {
                    return <h1 ref={ref} id={elem+index} className="centerElem heading1" contentEditable="true" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}>H1</h1>
                }
                case "smile":
                  {
                      return <img ref={ref} id={elem+index} className="centerElem" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
                  } 
             case "coffee":
                {
                  return  <p className="cursorpointer"  ><FontAwesomeIcon ref={ref} id={elem+index} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index,ref)}  icon={faCoffee} /></p>;
                      
               }   
            default:
                return '' ;  
            }
}