//CUSTOM DRAG AND DROP FEATURE. 
      //WHEN MOUSE IS DOWN ON AN ELEM, 
          //MOUSE MOVE IS CONFIGURED AND POSITIONS OF MOUSE MOVE ARE SET TO DRAGGING ELEMENT
              //ONCE MOUSE IS UP,MOUSE MOVE IS REMOVED
        export  function mousedown(event,id,ref) {
               let ball;
               if(ref.current!=undefined)
               {
                ball = ref.current;
               }
               else
               {
                  ball=document.getElementById(id);
               }
               let shiftX = event.clientX - ball.getBoundingClientRect().left;
               let shiftY = event.clientY - ball.getBoundingClientRect().top;
               ball.style.position = 'absolute';
              // moveAt(event.pageX, event.pageY);
               function moveAt(pageX, pageY) {
                let l1=document.getElementById('droppedelems').getBoundingClientRect().left;
                let l2=ball.getBoundingClientRect().left;
                let b1=document.getElementById('droppedelems').getBoundingClientRect().bottom;
                let b2=ball.getBoundingClientRect().bottom;
                let r1=document.getElementById('droppedelems').getBoundingClientRect().right;
                let r2=ball.getBoundingClientRect().right;
                if(l1<=l2 && r1>=r2 && b1>=b2)
                    {
                        ball.style.left = pageX - shiftX + 'px';
                        ball.style.top = pageY - shiftY + 'px';
                        ball.style.opacity=1;
                    } 
                else{
                        ball.style.left = pageX - shiftX + 'px';
                        ball.style.top = pageY - shiftY + 'px' 
                        ball.style.opacity=0.1;
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