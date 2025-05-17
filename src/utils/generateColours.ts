import { hslToHex } from "./hsltohex";

export const generateContrastingColours = ():string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30;
    const lightness = 40 + Math.random() * 20;
    return hslToHex(hue, saturation, lightness);
}

export const generatePlayerColours = (numPlayers: number): string[] => {
    const colours:string[] = []
    for(let i = 0 ; i < numPlayers ; i++)
        colours.push(generateContrastingColours())
    return colours;
}