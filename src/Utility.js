import React,{useRef,useEffect,useState}  from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
function Utility(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentID=props.currentID
  const colorRef=useRef();
  const numRef=useRef();
    return (
        <div>
             <Modal show={show} onHide={() => {handleClose();props.dontShowModal()}}>
                <Modal.Header closeButton>
                    {
                        document.getElementById(currentID) ?
                        <Modal.Title>Style your UI 
                            <input type="color" ref={colorRef} />
                            <input type="number" ref={numRef} placeholder="Enter height or width in px" />
                        </Modal.Title>  :
                        <Modal.Title>Error in Selection</Modal.Title>
                    }
                
                </Modal.Header>
                <Modal.Body>
                    {
                        document.getElementById(currentID) ?
                    <div>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.position='sticky'}}>Static</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.fontWeight='bold'}}><b>B</b></Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.fontStyle='italic'}}><i>I</i></Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.fontStyle='normal'}}>N</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.textDecoration ='underline'}}><u>U</u></Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.background=colorRef.current.value}}>Background</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.border='5px solid '+colorRef.current.value}}>Border Color</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.border =numRef.current.value+'px solid '+colorRef.current.value}}>Border Width</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.color=colorRef.current.value}}>Color</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.height=numRef.current.value+'px'}}>Height</Button>
                    <Button variant="secondary" onClick={()=>{document.getElementById(currentID).style.width=numRef.current.value+'px'}}>Width</Button>
                    </div> 
                    :
                    <div>
                        Please select a valid element
                    </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleClose();props.dontShowModal()}}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
       
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        
        dontShowModal:() => dispatch({type:'SET_FALSE'})
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Utility);
  
