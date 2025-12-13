import { useEffect, useState } from "react";
import styles from "./CurrencySection.module.css";

type Props = {
  currency: string;
};

function CurrencySection({ currency }: Props) {
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`https://api.frankfurter.app/latest?from=EUR&to=${currency}`)
    .then((res) => res.json())
    .then((data) => {
      setValue(data.rates[currency]);
      setLoading(false);
    });
}, [currency]);

  if (loading) {
    return <div className={styles.card}>Loading...</div>;
  }

  if (!value) {
    return <div className={styles.card}>No data</div>;
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Currency</p>
      <p className={styles.text}>
        1 EUR = {value.toFixed(2)} {currency}
      </p>
    </div>
  );
}

export default CurrencySection;
