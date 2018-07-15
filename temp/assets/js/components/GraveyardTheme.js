import {
    deepOrange800,
    blueGrey50, blueGrey400, blueGrey500, blueGrey600, blueGrey700, grey300,
    white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blueGrey400,
        primary2Color: blueGrey500,
        primary3Color: blueGrey600,
        accent1Color: deepOrange800,
        accent2Color: blueGrey50,
        accent3Color:  blueGrey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: blueGrey400,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};

