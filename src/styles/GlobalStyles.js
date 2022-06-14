import { createGlobalStyle } from "styled-components";
import { GlobalClasses } from "./GlobalClasses";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Poppins:wght@100;200;300;400;500;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700&display=swap');
  body {
    font-family: 'Epilogue', sans-serif;
  }
  ${GlobalClasses}
`;

export default GlobalStyle;
