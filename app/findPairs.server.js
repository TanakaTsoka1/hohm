import rates from "~/rates.json";
import currencies from "~/currencies.json";

export default function findPairs(currency) {
  if (!rates.USD) return;
  const trades = [];
  const addTrade = ([a, b]) => {
    if (b < 1) return;
    if (!isNaN(b) && b.toFixed(4) > 1)
      trades.push([a, ((b - 1) * 100).toFixed(2)]);
  };

  for (let i = 0; i < currencies.length; i++) {
    const c1 = currencies[i];
    for (let j = 0; j < currencies.length; j++) {
      const c2 = currencies[j];
      if (c1 == c2) continue;
      addTrade([
        [c1, c2],
        rates[currency][c1] * rates[c1][c2] * rates[c2][currency],
      ]);
      for (let k = 0; k < currencies.length; k++) {
        const c3 = currencies[k];
        if (c2 == c3 || c1 == c3) continue;
        addTrade([
          [c1, c2, c3],
          rates[currency][c1] *
            rates[c1][c2] *
            rates[c2][c3] *
            rates[c3][currency],
        ]);
      }
    }
  }

  trades.sort((a, b) => b[1] - a[1]);
  return trades;
}
