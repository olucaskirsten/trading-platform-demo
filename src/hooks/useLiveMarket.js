import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";

export function useLiveMarket(selectedAsset) {
  const [market, setMarket] = useState({ assets: [], pairs: [], series: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadMarket() {
      try {
        const data = await api.getMarket(selectedAsset);
        if (!active) return;

        setMarket((previous) => {
          const previousLast = previous.series.at(-1)?.value;
          const incomingLast = data.series.at(-1)?.value;

          return {
            ...data,
            direction: !previousLast || incomingLast >= previousLast ? "up" : "down"
          };
        });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMarket();
    const interval = setInterval(loadMarket, 2500);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [selectedAsset]);

  const selectedAssetData = useMemo(
    () => market.assets.find((asset) => asset.id === selectedAsset) || market.assets[0],
    [market.assets, selectedAsset]
  );

  return {
    ...market,
    selectedAssetData,
    loading
  };
}
