'use client';
import { ardesiaThemeFactory } from '@ardesia/ardesia-ui-platform';
import { grey } from "@mui/material/colors"

export const pecofficeLightTheme = ardesiaThemeFactory({
  themeMode: "light",
  colorOptions: { primaryColor: "#02A17C", secondaryColor: grey[300] },
})

export const pecofficeDarkTheme = ardesiaThemeFactory({
  themeMode: "dark",
  colorOptions: { primaryColor: "#1ED760", secondaryColor: grey[300] },
})

export default pecofficeLightTheme;
