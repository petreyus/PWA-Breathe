// to do: 
        // keyboard covering input
        // seperate button functions/ css / into seperate files as app grows will be too cumbersome in 1 file.
        // styling and offline resource cacheing (pwa')


import { StatusBar } from 'expo-status-bar';

import { KeyboardAwareScrollView,  } from 'react-native-keyboard-aware-scroll-view'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

import Animista, { AnimistaTypes } from "react-animista";
import React, {useState} from 'react';

import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

// I have to use image background to work on IOS regular style prop with backgroundImage will not work on ios
import { ImageBackground } from 'react-native';

//relative file path 2 clicks (..) from root
import relax1 from '../reactapp/public/breath1.jpeg';
import relax2 from '../reactapp/public/breath2.jpeg';


export default function App() {
let tKeep1:number=0;
let tKeep2:number=0;
let currentTime:number=0;
let show:boolean=false;
//     get \/       set \/                   default val \/ hook
const [outputText,  onChangeText]=            useState('Enter data');

const [currentBackground,  changeBackground]= useState(relax1);

const [button,  setButton]=                   useState();  

const [opacity,  setOpacity]=                 useState(0);  

const [timer,  setTime]=                      useState( 0 );  


function testbuttonPressed(){
   // function is after press: updates states and uses date.now to record time in mili second to calc bench mark time.
  
   
    changeBackground(relax2);
    setButton("Hold me & your Breath");                
    setOpacity(1);
   
    setTime(Date.now());
    tKeep1=Date.now();
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

  

  return (

 

<SafeAreaView style={{ flex: 1 }}>
  <View style={styles.container}>
 
  <TouchableOpacity> 
    <Animista type={AnimistaTypes.SCALE_UP_TOP}>Basic animation</Animista>
  </TouchableOpacity>



      <ImageBackground
      source={currentBackground}
      style={{width: '100%', height: '100%'}}
       > 
  
              {/* I had to nest this view inside the image background to center the button on top of the background */}
            <View style={styles.centerButton}>
            
                    {/* this touchable opacity causes the PC version to fire the onpress function on hover. 
                    It works perfect on the app though. */}
                   <TouchableOpacity 
                    activeOpacity={.7}
                    style= {styles.button3}
                    onPress={testbuttonPressed}
                    onPressOut={testbuttonUnpressed}
                   >
                   
                        <Text> {button} </Text>
            
                   </TouchableOpacity>


         
            </View>


      </ImageBackground>



      <TouchableOpacity
        
        style={styles.button2}
        onPress={testbuttonPressed} 
      >
      <Animista type={AnimistaTypes.SCALE_UP_TOP}>Benchmark</Animista>
           <Text></Text>
 
      </TouchableOpacity>

<View style={styles.button}> 
    <Button 
     
     title="Click me to send data!" 
     onPress={ async function Anon(req,res){ 
               console.log(outputText);
       

            const settings={  
                    method:'POST',
                    body: JSON.stringify({
                                            outputText
                                          }),
                  // no-cors as a mode was giving me trouble: unexpected end of input errors.
                  
                     headers: {
                    
                          Accept: 'application/json',
                         'Content-Type': 'application/json',} 
                      }
                                                // Must put IP instead of LocalHost because when the iphone connects it needs an address instead of "refer to myself"
                              const getRes= await fetch('http://192.168.1.2:4000',settings)
              try{
                // check this block for errors(try)
                  const outputText = await getRes.json();
                  outputText;
                  console.log(outputText);
              
                  

                  
                }
                // if error is found in try block execute below code (catch)
             catch(error)  {
                  console.log(error);
                  alert(error);
                  }
        
          
          }
          
      
      } />  
  </View>  
      

  {/* <KeyboardAwareScrollView  style={styles.text}> */}
     
     <TextInput
        style={styles.text}
//set default place holder value
        value={outputText}
//on input change default text into user input
      onChangeText={text => onChangeText(text)}

// when user clicks box (on focus) delete default text
      onFocus = {text => onChangeText("")}
      //

      /> 
            
  {/* </KeyboardAwareScrollView> */}
    
      
     
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

// text box
  text:{
  color:"red", 
  height: 40, 
   borderColor: 'red', 
   borderWidth: 1, 
   textAlign: 'center',
   position: 'absolute',
   bottom:0,


},
         // click me button
          button: {
            position: 'absolute',
            justifyContent: 'center',
            margin: 16,
            backgroundColor: "red",
            bottom: 30,
          },
            
          button2: {
              position: 'absolute',
              bottom:0,
              left:0,
              backgroundColor: "red",
              padding: 10,   transform: (1, 1, 1),
              transform:  (0.75, 1.25, 1),
            transform: (1.25, 0.75, 1),
          transform: (0.85, 1.15, 1),
        transform: (1.05, 0.95, 1),
            transform:(0.95, 1.05, 1),

                    transform: (1, 1, 1),
            
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
              jelloVertical: {
                
                      transform: (1, 1, 1),
                transform:  (0.75, 1.25, 1),
              transform: (1.25, 0.75, 1),
            transform: (0.85, 1.15, 1),
          transform: (1.05, 0.95, 1),
              transform:(0.95, 1.05, 1),

                      transform: (1, 1, 1),
                    
                     },



              });


