import React, {useState} from 'react';
import { Text, TextInput, View, Pressable, Image } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { allStyles } from '../styles/AllStyles';
import { imageList } from '../styles/ImageList';
import { text } from '../styles/Text';

export default function InputRow({type, defaultValue, updateValue}) {

   const [buttonIsPressed, setButtonIsPressed] = useState(false);
   const [inputValue, setInputValue] = useState(defaultValue);

   function changeValue(newVal){
      setInputValue(newVal);
      updateValue(newVal);
   }

   function clearInput(){
      changeValue(defaultValue);
   }

   function changeButtonStyle(isPressed) {

      if (isPressed) {
         return (allStyles.clearButtonPressed);
      }
      else {
         return (allStyles.clearButton);
      }
    
    }

   if(type === 'price'){
      return(
         <View style={allStyles.calcBoxInputRow}>
            <CurrencyInput
               style={allStyles.calcBoxInput}
               inputMode='numeric'
               returnKeyType='done'
               textAlign='center'
               prefix={text.prefix} 
               delimiter={text.delimiter}
               separator={text.seperator}
               precision={2}
               minValue={0}
               value={inputValue}
               onChangeValue={changeValue}
            />
            <Pressable
               onPressIn={() => {
                  setButtonIsPressed(true);
               }}
               onPressOut={() => {
                  clearInput();
                  setButtonIsPressed(false);
               }}

               style={changeButtonStyle(buttonIsPressed)}
            >
                  <Image style={allStyles.clearButtonImage} source={imageList.iconClear} />
            </Pressable>
         </View>
      );
   }
   else {
      return(
         <View style={allStyles.calcBoxInputRow}>
            <TextInput
               style={allStyles.calcBoxInput}
               inputMode='numeric'
               returnKeyType='done'
               textAlign='center'
               value={inputValue}
               onChangeText={changeValue}
            />
            <Pressable
               onPressIn={() => {
                  setButtonIsPressed(true);
               }}
               onPressOut={() => {
                  clearInput();
                  setButtonIsPressed(false);
               }}
               style={changeButtonStyle(buttonIsPressed)}
            >
                  <Image style={allStyles.clearButtonImage} source={imageList.iconClear} />
            </Pressable>
         </View>
      );
   }


}