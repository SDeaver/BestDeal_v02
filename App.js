import React, { useState, useRef, useEffect } from 'react';
import { Text, Image, ImageBackground, Pressable, View, Keyboard, Animated} from 'react-native';
import { formatCurrency } from 'react-native-format-currency';
import LottieView from 'lottie-react-native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import InputRow from './components/InputRow';
import CompareButton from './components/CompareButton';

import { allStyles, allFonts, colors } from './styles/AllStyles';
import { animTiming } from './styles/AnimTiming';
import { imageList } from './styles/ImageList'
import { text } from './styles/Text';





SplashScreen.preventAutoHideAsync();

export default function App() {

  const [leftPrice, setLeftPrice] = useState('0');
  const [rightPrice, setRightPrice] = useState('0');
  const [leftQuantity, setLeftQuantity] = useState('');
  const [rightQuantity, setRightQuantity] = useState('');
  const [leftPricePerUnit, setLeftPricePerUnit] = useState('');
  const [rightPricePerUnit, setRightPricePerUnit] = useState('');
  const [leftDisplayedPricePerUnit, setLeftDisplayedPricePerUnit] = useState('');
  const [rightDisplayedPricePerUnit, setRightDisplayedPricePerUnit] = useState('');
  const [leftIsBestDeal, setLeftIsBestDeal] = useState(false);
  const [rightIsBestDeal, setRightIsBestDeal] = useState(false);
  const [bestDealStyle, setBestDealStyle] = useState(allStyles.calcBox);
  const [fadedOut, setFadedOut] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const fadeBoxAnim = useRef(new Animated.Value(0)).current;

  function pricePerUnitFadeIn(leftVal, rightVal) {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animTiming.fadeInTime,
      useNativeDriver: true,
    }).start(() => {
      bestDealBoxFadeIn();
      fadeAnim.removeAllListeners();
    });

    const listenerId = fadeAnim.addListener((newFadeVal) => {
        let lPricePerUnit = (newFadeVal.value * leftVal);
        let rPricePerUnit = (newFadeVal.value * rightVal);
        const [lPricePerUnitOutput, lValueFormattedWithoutSymbol, lSymbol] = formatCurrency({ amount: Number(lPricePerUnit).toFixed(2), code: text.currencyCode });
        const [rPricePerUnitOutput, rValueFormattedWithoutSymbol, rSymbol] = formatCurrency({ amount: Number(rPricePerUnit).toFixed(2), code: text.currencyCode });

        setLeftDisplayedPricePerUnit(lPricePerUnitOutput);
        setRightDisplayedPricePerUnit(rPricePerUnitOutput);
    })

  }

  function pricePerUnitFadeOut() {

     Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animTiming.fadeOutTime,
        useNativeDriver: true,
      }).start(() => {
        setFadedOut(true);
        fadeAnim.removeAllListeners();
     });

  }

  function bestDealBoxFadeIn() {

    Animated.timing(fadeBoxAnim, {
      toValue: 1,
      duration: animTiming.fadeInBoxTime,
      useNativeDriver: true,
    }).start(() => {
      fadeBoxAnim.removeAllListeners();
    });

    const listenerId = fadeBoxAnim.addListener((newFadeVal) => {

      const colorChange = {
        r: (colors.bgBox.r + ((colors.bgBoxBestDeal.r - colors.bgBox.r) * newFadeVal.value)),
        g: (colors.bgBox.g + ((colors.bgBoxBestDeal.g - colors.bgBox.g) * newFadeVal.value)),
        b: (colors.bgBox.b + ((colors.bgBoxBestDeal.b - colors.bgBox.b) * newFadeVal.value)),
        a: (colors.bgBox.a + ((colors.bgBoxBestDeal.a - colors.bgBox.a) * newFadeVal.value))
      }
      const newColor = `rgba(${colorChange.r},${colorChange.g},${colorChange.b},${colorChange.a})`;
      setBestDealStyle([allStyles.calcBox, {backgroundColor: newColor}]);

    })
  
  }

  function bestDealBoxFadeOut() {

    Animated.timing(fadeBoxAnim, {
      toValue: 0,
      duration: animTiming.fadeOutBoxTime,
      useNativeDriver: true,
    }).start(() => {
      setLeftIsBestDeal(false);
      setRightIsBestDeal(false);
      fadeBoxAnim.removeAllListeners();
    });

    const listenerId = fadeBoxAnim.addListener((newFadeVal) => {

      const colorChange = {
        r: (colors.bgBox.r + ((colors.bgBoxBestDeal.r - colors.bgBox.r) * newFadeVal.value)),
        g: (colors.bgBox.g + ((colors.bgBoxBestDeal.g - colors.bgBox.g) * newFadeVal.value)),
        b: (colors.bgBox.b + ((colors.bgBoxBestDeal.b - colors.bgBox.b) * newFadeVal.value)),
        a: (colors.bgBox.a + ((colors.bgBoxBestDeal.a - colors.bgBox.a) * newFadeVal.value))
      }
      const newColor = `rgba(${colorChange.r},${colorChange.g},${colorChange.b},${colorChange.a})`;
      setBestDealStyle([allStyles.calcBox, {backgroundColor: newColor}]);

    })
  
  }

  function chooseQuantityImage(side) {
    
    let lQuantity = Number(leftQuantity);
    let rQuantity = Number(rightQuantity);


    if (leftQuantity === '' || rightQuantity == '') {
      return imageList.empty;
    }
    else if (isNaN(leftQuantity) || isNaN(rightQuantity)) {
      return imageList.empty;
    }
   
    if (side === 'left') {
      if (lQuantity > rQuantity) {
        return imageList.pileLarge;
      } 
      else {
        return imageList.pileSmall;
      }
    }
    else if (side === 'right') {
      if (rQuantity > lQuantity) {
        return imageList.pileLarge;
      } 
      else {
        return imageList.pileSmall;
      }
    }
  }

  function chooseBoxStyle(isBestDeal) {

    if (isBestDeal) {
      return (bestDealStyle);
    }
    else {
      return (allStyles.calcBox);
    }

  }

  function updateLeftPrice(newVal) {
    resetOutput();
    setLeftPrice(newVal);
  }

  function updateRightPrice(newVal) {
    resetOutput();
    setRightPrice(newVal);
  }

  function updatetLeftQuantity(newVal) {
    resetOutput();
    setLeftQuantity(newVal);
  }

  function updateRightQuantity(newVal) {
    resetOutput();
    setRightQuantity(newVal);
  }

  function resetOutput() {

    if (fadedOut) {
      return;
    }
    
    pricePerUnitFadeOut();
    bestDealBoxFadeOut();

  }

  function checkBadInput()
  {
    if (leftPrice == 0) {
      return true;
    }
    else if (rightPrice == 0) {
      return true;
    }
    else if (leftQuantity <= 0)
    {
      return true;
    }
    else if (rightQuantity <= 0)
    {
      return true;
    }
    else if (isNaN(leftQuantity))
    {
      return true;
    }
    else if (isNaN(rightQuantity))
    {
      return true;
    }
    else {
      return false;
    }
  }

  function outputCompare() {

    const lPricePerUnit = Number( leftPrice / leftQuantity );
    const rPricePerUnit = Number( rightPrice / rightQuantity);

    // if ((lPricePerUnit === leftPricePerUnit) && (rPricePerUnit === rightPricePerUnit)) {
    //   return;
    // }

    setLeftPricePerUnit(lPricePerUnit); 
    setRightPricePerUnit(rPricePerUnit); 

    setLeftIsBestDeal(!(lPricePerUnit > rPricePerUnit));
    setRightIsBestDeal(!(lPricePerUnit < rPricePerUnit));

    pricePerUnitFadeIn(lPricePerUnit, rPricePerUnit); 
    setFadedOut(false);
  }  


  // font loading

  const [fontsLoaded, fontError] = useFonts({
    'fontMain': allFonts.fontMain,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }



  // main code

  return (

    <ImageBackground source={imageList.background} style='allStyles.backgroundImg' imageStyle={{opacity:0.15}}>
      <Pressable style={allStyles.mainContainer} onPress={Keyboard.dismiss}>

        <View style={allStyles.calcBoxContainer}>

          {/* left box */}
          <Animated.View style={chooseBoxStyle(leftIsBestDeal)}>

            <View style={allStyles.calcInputContainer}>
              <Text style={allStyles.priceTitle}>{text.price}</Text>
              <InputRow type={'price'} defaultValue={'0'} updateValue={updateLeftPrice}/>
            </View>

            <View style={allStyles.calcInputContainer}>
              <Text style={allStyles.quantityTitle}>{text.quantity}</Text>
              <InputRow type={'quantity'} defaultValue={''} updateValue={updatetLeftQuantity}/>
            </View>

            <View style={allStyles.calcImageContainer}>
              <Image style={allStyles.calcQuantityImage} source={chooseQuantityImage('left')}></Image>
            </View>
            
            <View style={allStyles.calcOutputContainer}>
              <Text style={allStyles.perUnitTitle}>{text.pricePerUnit}</Text>
              <View style={allStyles.calcBoxInputRow}>
                  <View style={allStyles.calcBoxOutput}>
                    <Animated.Text style={[allStyles.calcBoxOutputText, {opacity: fadeAnim}]}>{leftDisplayedPricePerUnit}</Animated.Text>
                  </View>
              </View>
            </View>

          </Animated.View>

          {/* right box */}
          <Animated.View style={chooseBoxStyle(rightIsBestDeal)}>

            <View style={allStyles.calcInputContainer}>
              <Text style={allStyles.priceTitle}>{text.price}</Text>
              <InputRow type={'price'} defaultValue={'0'} updateValue={updateRightPrice}/>
            </View>

            <View style={allStyles.calcInputContainer}>
              <Text style={allStyles.quantityTitle}>{text.quantity}</Text>
              <InputRow type={'quantity'} defaultValue={''} updateValue={updateRightQuantity}/>
            </View>

            <View style={allStyles.calcImageContainer}>
              <Image style={allStyles.calcQuantityImage} source={chooseQuantityImage('right')}></Image>
            </View>

            <View style={allStyles.calcOutputContainer}>
              <Text style={allStyles.perUnitTitle}>{text.pricePerUnit}</Text>
              <View style={allStyles.calcBoxInputRow}>
                  <View style={allStyles.calcBoxOutput}>
                    <Animated.Text style={[allStyles.calcBoxOutputText, {opacity: fadeAnim}]}>{rightDisplayedPricePerUnit}</Animated.Text>
                  </View>
              </View>
            </View>

          </Animated.View>

        </View>

        <View style={allStyles.compareButtonContainer}>
          <CompareButton pressFunction={outputCompare} buttonIsLocked={checkBadInput()}/>
        </View>

        {/* <LottieView style= {allStyles.test} source={imageList.animTest} autoPlay loop>
        </LottieView> */}

      </Pressable>
    </ImageBackground>
  );
  

}   