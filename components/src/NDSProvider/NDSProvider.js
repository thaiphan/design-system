import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import defaultTheme from "../theme";
import i18n from "../i18n";
import { LocaleContext } from "./LocaleContext";

const Reset = createGlobalStyle(() => {
  return {
    body: {
      margin: 0
    }
  };
});

const ModalStyleOverride = createGlobalStyle(({ theme, locale }) => {
  const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
  return {
    ".ReactModal__Content": {
      fontFamily,
      button: {
        fontFamily
      },
      input: {
        fontFamily
      },
      textarea: {
        fontFamily
      }
    }
  };
});

const GlobalStyles = styled.div(({ theme, locale }) => {
  const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
  return {
    color: theme.colors.black,
    fontFamily,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "*": {
      boxSizing: "border-box"
    },
    img: {
      maxWidth: "100%",
      height: "auto"
    },
    button: {
      fontFamily
    },
    input: {
      fontFamily
    },
    textarea: {
      fontFamily
    }
  };
});

const NDSProvider = ({ theme, children, locale }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  return (
    <LocaleContext.Provider value={{ locale }}>
      <Reset theme={theme} locale={locale} />
      <ModalStyleOverride theme={theme} locale={locale} />
      <GlobalStyles theme={theme} locale={locale}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </I18nextProvider>
      </GlobalStyles>
    </LocaleContext.Provider>
  );
};

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  locale: PropTypes.string
};

NDSProvider.defaultProps = {
  theme: defaultTheme,
  locale: "en_US"
};

export default NDSProvider;
