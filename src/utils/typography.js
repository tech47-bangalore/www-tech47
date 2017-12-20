import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';
// http://kyleamathews.github.io/typography.js/

fairyGatesTheme.overrideStyles = () => ({
  a: {
    textShadow: 'none'
  }
});
// We delete the google fonts property as it inserts a async call in the head of index.html
// We have type face which installs google fonts for us.
delete fairyGatesTheme.googleFonts;

const typography = new Typography(fairyGatesTheme);

if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
