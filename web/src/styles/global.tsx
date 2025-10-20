import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export default createGlobalStyle<{theme: Theme}>`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    background: transparent;
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.fontSize.base};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    color: ${props => props.theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden;
    scroll-behavior: smooth;
  }

  button {
    cursor: pointer;
    outline: 0;
    border: none;
    background: none;
    font-family: inherit;
    transition: all ${props => props.theme.animation.duration.normal} ${props => props.theme.animation.easing.smooth};
  }

  input, select, textarea {
    font-family: inherit;
    outline: 0;
    transition: all ${props => props.theme.animation.duration.normal} ${props => props.theme.animation.easing.smooth};
  }
  
  /* Custom scrollbar - Red glass theme */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(220, 38, 38, 0.1);
    border-radius: ${props => props.theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      rgba(220, 38, 38, 0.6) 0%,
      rgba(185, 28, 28, 0.8) 100%
    );
    border-radius: ${props => props.theme.borderRadius.full};
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &:hover {
      background: linear-gradient(
        180deg,
        rgba(220, 38, 38, 0.8) 0%,
        rgba(185, 28, 28, 1) 100%
      );
      box-shadow: 0 0 12px rgba(220, 38, 38, 0.5);
    }
  }

  /* Selection - Red theme */
  ::selection {
    background: rgba(220, 38, 38, 0.4);
    color: #fef2f2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;
