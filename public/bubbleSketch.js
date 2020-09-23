//idea and adapation from daniel schiffman: https://www.youtube.com/watch?v=uAfw-ko3kB8



let bubbles = [];
let unicorn;


function setup() {
  createCanvas(600, 400);

   
  

 
 let howMany= prompt("How many bubbles?");
  if( howMany != null){
  
  
  for (i=0; i<howMany; i++){
  let x = random(width);
  let y= random(height);
  let r= random (10,50);

  
    
    
  
   
    bubbles[i]= new Bubble(x,y,r);
   
  }
 


unicorn= new Bubble (50,40,25)
  }
}

function draw() {
  background(0);

 
for (i=0; i< bubbles.length;i++)
  {bubbles[i].show();
   bubbles[i].move();
    
  

    
  
  unicorn.x= mouseX;
  unicorn.y= mouseY;
  unicorn.show();
  unicorn.move();
  }// for i loop end
                       
  // draw line if mouse intersects a bubble.
                          for (j=0; j< bubbles.length; j++){
                             for (k=1; k < bubbles.length; k++){
  
                            if( (unicorn.intersects(bubbles[j]) && ( bubbles[j].intersects(bubbles[k]))  ) ) 
 

                                {fill(200, 0, 100);
                                  
                                 line((width/2),(height/2),4,5);    }
                               }// for k loop end bracket 
                             
  }//for j loop end bracket
  
  
  
  
  
} // draw function end bracket
  
 






class Bubble {
  constructor(x, y, r=50 ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }


  
  
  
  
  
  
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2,2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(200);
    strokeWeight(4);
    fill(this.brightness, 225);
    ellipse(this.x, this.y, this.r*2 );
  }
}

