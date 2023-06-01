import Color from "../types/Color";
import { localStorageColors } from "./constant";

export function getColorsFromLocalStorage():Color[] {
    const storedColors = localStorage.getItem(localStorageColors);
    if (storedColors) {
      return JSON.parse(storedColors)
    }
    return []
}

export function setColorsToLocalStorage(colors:Color[]) {
    localStorage.setItem(localStorageColors, JSON.stringify(colors));
}

export function isValidHexColor(color:string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}