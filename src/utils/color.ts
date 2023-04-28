export const getRandomColorHex = () => {
  const rDec = Math.floor(Math.random() * 256);
  const gDec = Math.floor(Math.random() * 256);
  const bDec = Math.floor(Math.random() * 256);
  let rHexStr = rDec.toString(16);
  if (rHexStr.length === 1) {
    rHexStr = `0${rHexStr}`;
  }
  let gHexStr = gDec.toString(16);
  if (gHexStr.length === 1) {
    gHexStr = `0${gHexStr}`;
  }
  let bHexStr = bDec.toString(16);
  if (bHexStr.length === 1) {
    bHexStr = `0${bHexStr}`;
  }
  return `#${rHexStr}${gHexStr}${bHexStr}`;
};
