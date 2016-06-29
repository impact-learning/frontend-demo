// Get the current client size
export const getScreenSize = () =>
  ({
    width: window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth,
    height: window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight,
  });

export const appBarHeight = 64;
