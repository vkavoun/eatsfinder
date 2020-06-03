import css from 'styled-jsx/css';

export default css.global`
  html {
    font-size: 10px;
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    font-feature-settings: 'kern';
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    line-height: 1.65;
    margin: 0;
    padding: 0;
    -webkit-scroll-behavior: smooth;
    -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    height: inherit;
    display: block;
    overflow: hidden;
    position: relative;
  }

  h1 {
    font-weight: 700;
  }

  a .basic {
    text-decoration: none;
  }

  #__next {
    height: 100%;
    display: block;
    position: relative;
  }

  .page-layout {
    height: 100%;
    overflow-y: scroll;
    position: relative;
    display: block;
    overscroll-behavior-y: auto;
  }

  .main-nav {
    -webkit-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    padding: 0 3rem;
    width: 100%;
    line-height: 3rem;
    background: none;
    display: grid;
    grid-template-columns: 10rem auto 20rem;
    height: 6.4rem;
    max-height: 6.4rem;
  }

  .nav-search {
    grid-column: 2;
  }

  dt {
    visibility: hidden;
  }
  dd {
    visibility: hidden;
  }

  .feed-item {
  }

  .item-image {
    width: 120px;
    margin: 0;
    margin-top: 20px;
    padding: 0;
    display: inline-block;
  }

  .item-description {
    margin-right: 0;
    display: inline-block;
    float: right;
    width: 80%;
  }
`;
