import PropTypes from 'prop-types';

const primaryShape = PropTypes.shape({
  main: PropTypes.string.isRequired,
  light: PropTypes.string.isRequired,
  dark: PropTypes.string.isRequired,
  contrastText: PropTypes.string.isRequired,
});

const overridesShape = PropTypes.shape({});

const greyShape = PropTypes.shape({
  50: PropTypes.string.isRequired,
  100: PropTypes.string.isRequired,
  200: PropTypes.string.isRequired,
  300: PropTypes.string.isRequired,
  400: PropTypes.string.isRequired,
  500: PropTypes.string.isRequired,
  600: PropTypes.string.isRequired,
  700: PropTypes.string.isRequired,
  800: PropTypes.string.isRequired,
  900: PropTypes.string.isRequired,
  A100: PropTypes.string.isRequired,
  A200: PropTypes.string.isRequired,
  A400: PropTypes.string.isRequired,
  A700: PropTypes.string.isRequired,
});

const h1Shape = PropTypes.shape({
  fontFamily: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  fontSize: PropTypes.string.isRequired,
  lineHeight: PropTypes.number.isRequired,
  letterSpacing: PropTypes.string.isRequired,
});

const buttonShape = PropTypes.shape({
  fontFamily: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  fontSize: PropTypes.string.isRequired,
  lineHeight: PropTypes.number.isRequired,
  letterSpacing: PropTypes.string.isRequired,
  textTransform: PropTypes.string.isRequired,
});

const themeType = PropTypes.shape({
  breakpoints: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    values: PropTypes.shape({
      xs: PropTypes.number.isRequired,
      sm: PropTypes.number.isRequired,
      md: PropTypes.number.isRequired,
      lg: PropTypes.number.isRequired,
      xl: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  direction: PropTypes.string.isRequired,
  mixins: PropTypes.shape({
    toolbar: PropTypes.shape({
      minHeight: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  overrides: overridesShape.isRequired,
  palette: PropTypes.shape({
    common: PropTypes.shape({
      black: PropTypes.string.isRequired,
      white: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    primary: primaryShape.isRequired,
    secondary: PropTypes.shape({
      50: PropTypes.string.isRequired,
      100: PropTypes.string.isRequired,
      200: PropTypes.string.isRequired,
      300: PropTypes.string.isRequired,
      400: PropTypes.string.isRequired,
      500: PropTypes.string.isRequired,
      600: PropTypes.string.isRequired,
      700: PropTypes.string.isRequired,
      800: PropTypes.string.isRequired,
      900: PropTypes.string.isRequired,
      A100: PropTypes.string.isRequired,
      A200: PropTypes.string.isRequired,
      A400: PropTypes.string.isRequired,
      A700: PropTypes.string.isRequired,
      main: PropTypes.string.isRequired,
      light: PropTypes.string.isRequired,
      dark: PropTypes.string.isRequired,
      contrastText: PropTypes.string.isRequired,
    }).isRequired,
    error: primaryShape.isRequired,
    warning: primaryShape.isRequired,
    info: primaryShape.isRequired,
    success: primaryShape.isRequired,
    grey: greyShape.isRequired,
    contrastThreshold: PropTypes.number.isRequired,
    tonalOffset: PropTypes.number.isRequired,
    text: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
    }).isRequired,
    divider: PropTypes.string.isRequired,
    background: PropTypes.shape({
      paper: PropTypes.string.isRequired,
      default: PropTypes.string.isRequired,
    }).isRequired,
    action: PropTypes.shape({
      active: PropTypes.string.isRequired,
      hover: PropTypes.string.isRequired,
      hoverOpacity: PropTypes.number.isRequired,
      selected: PropTypes.string.isRequired,
      selectedOpacity: PropTypes.number.isRequired,
      disabled: PropTypes.string.isRequired,
      disabledBackground: PropTypes.string.isRequired,
      disabledOpacity: PropTypes.number.isRequired,
      focus: PropTypes.string.isRequired,
      focusOpacity: PropTypes.number.isRequired,
      activatedOpacity: PropTypes.number.isRequired,
    }).isRequired,
    default: greyShape.isRequired,
  }).isRequired,
  props: overridesShape.isRequired,
  shadows: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  typography: PropTypes.shape({
    htmlFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontWeightLight: PropTypes.number.isRequired,
    fontWeightRegular: PropTypes.number.isRequired,
    fontWeightMedium: PropTypes.number.isRequired,
    fontWeightBold: PropTypes.number.isRequired,
    h1: h1Shape.isRequired,
    h2: h1Shape.isRequired,
    h3: h1Shape.isRequired,
    h4: h1Shape.isRequired,
    h5: h1Shape.isRequired,
    h6: h1Shape.isRequired,
    subtitle1: h1Shape.isRequired,
    subtitle2: h1Shape.isRequired,
    body1: h1Shape.isRequired,
    body2: h1Shape.isRequired,
    button: buttonShape.isRequired,
    caption: h1Shape.isRequired,
    overline: buttonShape.isRequired,
    useNextconstiants: PropTypes.bool,
  }).isRequired,
  shape: PropTypes.shape({
    borderRadius: PropTypes.number.isRequired,
  }).isRequired,
  transitions: PropTypes.shape({
    easing: PropTypes.shape({
      easeInOut: PropTypes.string.isRequired,
      easeOut: PropTypes.string.isRequired,
      easeIn: PropTypes.string.isRequired,
      sharp: PropTypes.string.isRequired,
    }).isRequired,
    duration: PropTypes.shape({
      shortest: PropTypes.number.isRequired,
      shorter: PropTypes.number.isRequired,
      short: PropTypes.number.isRequired,
      standard: PropTypes.number.isRequired,
      complex: PropTypes.number.isRequired,
      enteringScreen: PropTypes.number.isRequired,
      leavingScreen: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  zIndex: PropTypes.shape({
    mobileStepper: PropTypes.number.isRequired,
    speedDial: PropTypes.number.isRequired,
    appBar: PropTypes.number.isRequired,
    drawer: PropTypes.number.isRequired,
    modal: PropTypes.number.isRequired,
    snackbar: PropTypes.number.isRequired,
    tooltip: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.shape({
    danger: PropTypes.shape({
      background: greyShape.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}).isRequired;

// eslint-disable-next-line import/prefer-default-export
export const MATERIAL_UI_THEME_TYPE = themeType;
