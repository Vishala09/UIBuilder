import { mousedown,dragstart } from './FreeDrag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
export default function GetDroppedElements({elem,index}){
    switch(elem)
            {
                
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
                    return <p id={elem+index} className="hr cursorpointer"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem+index)}></p>
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
            default:
                return '' ;  
            }
}