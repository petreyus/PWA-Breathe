// to do: 
        
        // seperate button functions/ css / into seperate files as app grows will be too cumbersome in 1 file.
        // styling and offline resource caching for PWA.
        // keyboard covering input

import { StatusBar } from 'expo-status-bar';

// this canvas is not working on IOS (no expo support)
import { Stage, Layer, Rect, Circle } from 'react-konva';

import {render} from 'react-dom';
import ReactDOM from 'react-dom'


// these animations not working on IOS
import Animista, { AnimistaTypes } from "react-animista";


import React, {useState} from 'react';

import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

// I have to use image background to work on IOS regular style prop with backgroundImage will not work on ios
import { ImageBackground } from 'react-native';

//relative file path 2 clicks (..) from root
import relax1 from '../reactapp/public/breath1.jpeg';
import relax2 from '../reactapp/public/breath2.jpeg';

import bubbles from '../reactapp/public/bubbleSketch.js';
import {button} from '../reactapp/public/button.tsx';
import { Renderer } from 'p5';

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);


function buttonComp(){

 console.log("function ran");
 const element = (
 <View> 
 <TouchableOpacity
            
  style={styles.centerButton}
 // onPress={testbuttonPressed} 
>
  
<Animista type={AnimistaTypes.SCALE_UP_TOP}>Benchmark</Animista>
    

</TouchableOpacity>

</View>
 );
 ReactDOM.render(element, document.getElementById('root'));
}






export default function App() {

// buttonComp()



  let tKeep1:number=0;
let tKeep2:number=0;
let currentTime:number=0;
let show:boolean=false;

//     get \/       set \/                   default val \/ hook
const [visible,  setVisible]=            useState('flex');

const [currentBackground,  changeBackground]= useState(relax1);

const [button,  setButton]=                   useState();  

const [growX,  setX]=                 useState(0);  
const [growY,  setY]=                 useState(0);  
const [timer,  setTime]=                      useState( 0 );  


function testbuttonPressed(){
   // function is after press: updates states and uses date.now to record time in mili second to calc bench mark time.
    let show=true;
    changeBackground(relax2);
    setButton("Hold me & your Breath");                
    setTime(Date.now());
    tKeep1=Date.now();
    setX(100);
    setY(100);
    // setInterval did not work well because of the latency issues.
        
     }
      function testbuttonUnpressed(){
        
        tKeep2=Date.now();
        currentTime=tKeep2-timer;
      
        console.log(currentTime)
        
    // had to add this if check because it kept alerting me with current time before calculating it
    // latency issue I assume?
        if(tKeep2!==0 && currentTime<100000){
          alert("You held your breath for "+ currentTime/1000 +" seconds!");
          setTime(0);
                    }
      
      }

  

    return( 

 

<SafeAreaView style={{ flex: 1 }}>
  <View style={styles.container}>

  <ImageBackground
      source={currentBackground}
      style={{width: '100%', height: '100%'}}
   > 

              {/* I had to nest this view inside the image background to center the button on top of the background */}
            <View style={styles.centerButton}>
              
                
                   <TouchableOpacity 
                    activeOpacity={.7}
                     style= {styles.button3}
                   //   style={show? [styles.button2,{ display:'flex'}]: styles.button2}
                    onPress={testbuttonPressed}
                    onPressOut={testbuttonUnpressed}
                   >
                  
                        <Text > {button} </Text>
            
                   </TouchableOpacity>


         
            </View>


   </ImageBackground>



          <TouchableOpacity
            
            style={styles.button2}
            onPress={testbuttonPressed} 
          >
            
          <Animista type={AnimistaTypes.SCALE_UP_TOP}>Benchmark</Animista>
              
    
          </TouchableOpacity>

            <Stage width={growX} height={growY} opacity={1}>
               <Layer>
                  <Rect width={5} height={5} fill="red" />
                  <Circle x={200} y={200} stroke="red" radius={50} opacity={0} />
               
               
                </Layer>
            </Stage>
      


    
      
     
  </View>
 </SafeAreaView>
        );
            }

// just css javascript'ed
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",

    
    alignItems: 'center',
    justifyContent: 'center',
  },
     
  
          button2: {
              position: 'absolute',
              bottom:0,
              backgroundColor: "red",
              padding: 10, 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: "#cc33ff",
              opacity:.5,
              padding: 15,
              borderRadius:20,
              display:'flex',
              
                },
                  
          button3: {
                alignItems: "center",
                justifyContent: 'center',
                opacity:.25,
                backgroundColor: "clear",
                padding: 10,
                backgroundColor: "#cc33ff",   
                
              },
                // hold me and your breath button
          centerButton: {
                position: 'absolute', 
                top: 0, left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
               
              },
            



              });


              