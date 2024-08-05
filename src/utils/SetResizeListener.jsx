let resizeCallback = null;

const setResizeListener = (callback) => {
  resizeCallback = callback;

  const handleResize = () => {
    if (resizeCallback) {
      resizeCallback(window.innerWidth);
    }
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
};

export default setResizeListener;
