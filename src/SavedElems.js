import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { mousedown,dragstart } from './FreeDrag'
export default function GetSavedElements({elem}){
    
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
        default:
            return '';
    }
}