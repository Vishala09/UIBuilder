import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { mousedown,dragstart } from './FreeDrag'
import { useRef } from 'react';
export default function GetSavedElements({elem}){
    const ref=useRef();
    switch(elem.type)
    {
        case "button":
         {
             return <button ref={ref} id={elem.id} className="button" style={elem.styles} contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}>{elem.text}</button>
         }
         case "para":
         {
           return <p ref={ref} id={elem.id}  style={elem.styles} className="button centerElem borderForElem" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}>{elem.text}</p>
         }
         case "input":
           {
             return <input ref={ref} type="text" id={elem.id} style={elem.styles} className="centerElem"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}/>
           }
         case "div":
           {
             return <div ref={ref} id={elem.id} style={elem.styles} className="centerElem borderForDiv" contentEditable="true"  onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}>{elem.text}</div>
           }
           case "hr":
         {
                return <p ref={ref} id={elem.id} style={elem.styles} className="centerElem hr cursorpointer" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}></p>
         }
         case "h1":
           {
               return <h1 ref={ref} id={elem.id} contentEditable="true" className="centerElem heading1"  style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)}>{elem.text}</h1>
           }
        case "smile":
             {
                return <img ref={ref} id={elem.id} style={elem.styles} className="centerElem" onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)} src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
             } 
        case "coffee":
               {
                 return  <p ref={ref} id={elem.id} style={elem.styles} onDragStart={() => dragstart()} onMouseDown={(e)=>mousedown(e,elem.id,ref)} className="cursorpointer" ><FontAwesomeIcon   icon={faCoffee} /></p>;
              }  
        default:
            return '';
    }
}