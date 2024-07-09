import { StyleSheet } from 'react-native';

export const colors = {
    bgInput: 'white',
    bgOutput: 'ghostwhite',
    bgBox: {
        r: 213,
        g: 232,
        b: 255,
        a: 0.7
    },
    bgBoxBestDeal: {
        r: 255,
        g: 215,
        b: 0,
        a: 0.7
    },
    bgButton: 'lightsteelblue',
    bgButtonPressed: 'steelblue',
    bgButtonLocked: 'ghostwhite',
    text: 'white',
    bdr: 'black'
}

export const allFonts = {
    fontMain: require('../assets/fonts/Lato-Regular.ttf')
}

export const allStyles = StyleSheet.create ({
    backgroundImg: {
    },
    mainContainer: {
        height: 800,
        width: '100%',
    },
    calcBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 50,
        paddingHorizontal: 10,
        height: 520,
    },
    calcBox: {
        flex: 0.45,
        justifyContent: 'space-evenly',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        height: '100%',
        backgroundColor: `'rgba(${colors.bgBox.r},${colors.bgBox.g},${colors.bgBox.b},${colors.bgBox.a})'`
    },
    calcInputContainer: {
        height: '25%',
    },
    calcOutputContainer: {
        height: '25%',
    },
    priceTitle: {
        fontFamily: 'fontMain',
        fontSize: 18,
        paddingTop: 4,
        paddingBottom: 4
    },
    quantityTitle: {
        fontFamily: 'fontMain',
        fontSize: 18,
        paddingBottom: 4
    },
    perUnitTitle: {
        fontFamily: 'fontMain',
        fontSize: 18,
        paddingBottom: 4
    },
    calcBoxInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    calcBoxInput: {
        flex: 0.95,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.bgInput,
        fontSize: 20,
    },
    calcImageContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: -10,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: colors.bgOutput,
    },
    calcImageAnim: {
        height: '100%',
    },
    calcQuantityImage: {
        marginTop: -6,
        alignSelf: 'center',
    },
    calcBoxOutput: {
        flex: 0.95,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: colors.bgOutput,
    },
    calcBoxOutputText: {
        padding: 5,
        fontSize: 20,
        textAlign: 'center'
    },
    clearButton: {
        justifyContent: 'center', 
        width: '12%',
        borderWidth: 0.5,
        borderColor: colors.bdr,
        borderRadius: 5,
        backgroundColor: colors.bgButton
    },
    clearButtonPressed: {
        justifyContent: 'center', 
        width: '12%',
        height: '',
        borderWidth: 1.5,
        borderColor: colors.bdr,
        borderRadius: 5,
        backgroundColor: colors.bgButton
    },
    clearButtonImage: {
        height: 8,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    verticalCenterView: {
        flex: 1,
        justifyContent: 'center'
    },
    compareButtonContainer: {
        justifyContent: 'center',
        height: 80,
    },
    compareButton: {
        alignSelf: 'center',
        height: 46,
        width: '35%',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: colors.bgButton
    },
    compareButtonPressed: {
        alignSelf: 'center',
        height: 44,
        width: '33%',
        borderWidth: 0.7,
        borderRadius: 5,
        backgroundColor: colors.bgButton
    },
    compareButtonLocked: {
        alignSelf: 'center',
        height: 46,
        width: '35%',
        borderWidth: 1,
        borderRadius: 5,
        opacity: 0.3,
        backgroundColor: colors.bgButton,
    },
    compareButtonText: {
        fontSize: 17,
        fontFamily: 'fontMain',
        textAlign: 'center',
    },
    compareButtonTextPressed: {
        fontSize: 16,
        fontFamily: 'fontMain',
        textAlign: 'center',
    },
    compareButtonTextLocked: {
        fontSize: 17,
        fontFamily: 'fontMain',
        textAlign: 'center',
    },

});


