function plusMinus(arr) {
  let positives = 0;
  let negatives = 0;
  let neutrals = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      positives++;
    } else if (arr[i] < 0) {
      negatives++;
    } else {
      neutrals++;
    }
  }

  const positivesRatio = positives / arr.length;
  const negativesRatio = negatives / arr.length;
  const neutralsRatio = neutrals / arr.length;

  console.log(`${positivesRatio.toFixed(6)} ${negativesRatio.toFixed(6)} ${neutralsRatio.toFixed(6)}`)
}

plusMinus([1, 2, 1, 0, -1])