/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import axios from 'axios';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import VimeoPlayer from './VimeoPlayer'
import DocumentPicker, { types } from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'




const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () =>{

  const [fileResponse, setFileResponse] = useState('');
  const [fileSelected, setFileSelected] = useState();
  
  const handleDocumentSelection = useCallback(async () => {
    try {
      await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
      }).then((res)=>{
        // RNFetchBlob.fs.stat(res[0].uri).then((stats) => {
        //   console.log("res",stats);
        // })
          setFileResponse(res[0]);
        })
      setFileSelected(true)
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const submitHandler = useCallback(async() =>{
    let data = new FormData();
    data.append("filename", text)
    data.append("videoFile", fileResponse);
    
    try {

      const response = await fetch('http://10.0.2.2:3000/post', {
        method: 'post',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data
      }).then(res => {
        console.log(res.status)
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
      // return await response.json();
    }
    catch (error) {
        console.log('error : ' + error);
        return error;
    }
  })


  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [isLive, setIsLive] = useState(); 
  const [text, setText] = useState(); 

  return (
    
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section>
            <TouchableOpacity onPress={()=>setIsLive(true)}>
              <Text style={{fontSize:20, color: "black",textAlign: "right"}}>
                Live Session
              </Text>  
            </TouchableOpacity>
          </Section>
          <Section>
          <TouchableOpacity onPress={()=>setIsLive(false)}>
              <Text style={{fontSize:20, color: "black"}}>
                Upload Session
              </Text>  
            </TouchableOpacity>
          </Section>
          
            <View>
              <TextInput
                style={styles.input}
                onChangeText={newText => setText(newText)}
                value={text}
                placeholder={"Enter Title Here..."}
              />
              
              {!fileSelected?
              <Button title="Select Video" onPress={handleDocumentSelection} />            
              :
              <>
              <Button title="Post Video" onPress={submitHandler} />  
              </>          
              }       
              
            </View>
       
          
          
   
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    width:'90%',
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
