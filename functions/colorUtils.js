exports.combineColors = (colors) => {
  if (!colors || !colors.length) {
    return '#000000';
  }
  const reds = [];
  const greens = [];
  const blues = [];
  for (let i = 0; i < colors.length; i++) {
    reds.push(parseInt(colors[i].substring(1, 3), 16));
    greens.push(parseInt(colors[i].substring(3, 5), 16));
    blues.push(parseInt(colors[i].substring(5, 7), 16));
  }
  const finalRed = Math.round((reds.length) ? reds.reduce((a, b) => a + b, 0) / reds.length : 0);
  const finalGreen = Math.round((greens.length) ? greens.reduce((a, b) => a + b, 0) / greens.length : 0);
  const finalBlue = Math.round((blues.length) ? blues.reduce((a, b) => a + b, 0) / blues.length : 0);
  let redStr = finalRed.toString(16);
  if (redStr.length === 1) {
    redStr = `0${redStr}`;
  }
  let greenStr = finalGreen.toString(16);
  if (greenStr.length === 1) {
    greenStr = `0${greenStr}`;
  }
  let blueStr = finalBlue.toString(16);
  if (blueStr.length === 1) {
    blueStr = `0${blueStr}`;
  }
  const finalColor = `#${redStr}${greenStr}${blueStr}`;
  console.log(`combineColors - ${finalRed}, ${finalGreen}, ${finalBlue}, ${finalColor}, ${JSON.stringify(reds)}, ${JSON.stringify(greens)}, ${JSON.stringify(blues)}, ${JSON.stringify(colors)}`)
  return finalColor;
};
