//CUSTOM DRAG AND DROP FEATURE. 
      //WHEN MOUSE IS DOWN ON AN ELEM, 
          //MOUSE MOVE IS CONFIGURED AND POSITIONS OF MOUSE MOVE ARE SET TO DRAGGING ELEMENT
              //ONCE MOUSE IS UP,MOUSE MOVE IS REMOVED
        export  function mousedown(event,id) {
        
               let ball = document.getElementById(id);
               let shiftX = event.clientX - ball.getBoundingClientRect().left;
               let shiftY = event.clientY - ball.getBoundingClientRect().top;
               ball.style.position = 'absolute';
              // moveAt(event.pageX, event.pageY);
               function moveAt(pageX, pageY) {
                    {
                        ball.style.left = pageX - shiftX + 'px';
                        ball.style.top = pageY - shiftY + 'px' 
                    }   
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
             
        export const dragstart = function() {
               return false;
             };