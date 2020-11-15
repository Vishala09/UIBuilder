import React,{useRef,useEffect,useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './elements.css';
import { connect } from 'react-redux';
import Utility from './Utility';
import GetSavedElements from './SavedElems';import GetDroppedElements from './DroppedElems'
import './Drag.css';
function Drag(props) {
  
  const [currentID, setCurrentID] = useState(null);

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
                        let l1=document.getElementById('droppedelems').getBoundingClientRect().left;
                        let l2=dom.getBoundingClientRect().left;
                        let b1=document.getElementById('droppedelems').getBoundingClientRect().bottom;
                        let b2=dom.getBoundingClientRect().bottom;
                        let r1=document.getElementById('droppedelems').getBoundingClientRect().right;
                        let r2=dom.getBoundingClientRect().right;
                        //console.log(l1,l2)
                        if(dom && (l1<l2 && r1>r2 && b1>b2))
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
                return  <GetSavedElements elem={elem}  /> 
           })
      }
      
      //RENDERING THE UI ELEMENTS THAT ARE DROPPED. FREE DRAGGING IS DONE HERE
      const renderDrags = () => {
        let add=props.savedElems.length;
        return props.droppedElems.map((elem,index) => 
          {  
            index=index+add;
            return  <GetDroppedElements elem={elem} index={index} />
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
        <p  style={{float:"right",position:'sticky',marginTop:'-25px'}}>Ctrl+A or Highlight any text to apply styles , Elements outside outer border won't be saved</p>
   
            <div data-testid="toBeDraggedelements"   onMouseUp={()=>makeStyle()} onKeyUp={() => makeStyle()} id="droppedelems"  style={{marginLeft:'50px',marginRight:'50px',height:'600px',width:'90%',border:'2px solid black',zIndex:'100'}}>
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
