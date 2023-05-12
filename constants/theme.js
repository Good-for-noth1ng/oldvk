import { Dimensions } from "react-native";
export const COLORS = {
    primary: 'rgba(81, 129, 184, 1)',
    primary_light: '#447bba',
    white: 'rgb(255,255,255)',
    secondary: 'hsl(213, 11%, 55%)',
    black: 'rgb(0, 0, 0)',
    smoke: '#aeb7c2',
    light_smoke: '#dbdcdd',
    very_dark_gray: '#303342',
    primary_blue_dark: '#2a5885',
    very_light_gray: 'hsla(240,7%,70%,.22)',

    light_black: '#202021c9',   
    primary_dark: '#272727', //    primary_dark: '#272727', background_post: '#222222' rgba(255, 255, 255, 0.08) 
    background_dark: '#141414',
    primary_text: '#e1e3e6'

}

export const postWidth = Dimensions.get('window').width - 30

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
  };