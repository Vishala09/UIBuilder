
import './elements.css'

export default function GetConstantsElements(){
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        document.getElementById(ev.target.id).style.opacity=0.1;
  }
    return (
        <span>
        
        <button key="button" id={'button'} draggable="true" onDragStart={(event)=>drag(event)} >Button</button>
   
        <span key='input' id='input' draggable='true' className="bigBorder" onDragStart={(event)=>drag(event)}>Input Box</span>
   
        <span key="para" id="para" draggable="true" className="bigBorder" onDragStart={(event)=>drag(event)}>Paragraph</span>
   
        <span key="div" id="div" draggable="true" className="bigBorder" onDragStart={(event)=>drag(event)}>Div</span>
    
        <span key="hr" id="hr" draggable="true" className="bigBorder" onDragStart={(event)=>drag(event)}>Line</span>
    
        <span key="h1" id="h1" draggable="true" className="bigBorder" onDragStart={(event)=>drag(event)}>H1</span>
    
        <span key='smile' id="smilespan" onDragStart={(event)=>drag(event)} draggable="true">
            
            <img id='smile'  src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png" height="70px" width="70px" />
        </span>
        <span key='coffee' id="coffee" className="bigBorder" onDragStart={(event)=>drag(event)} draggable="true">CoffeeIcon</span>
        </span>
        )
}


                    
             