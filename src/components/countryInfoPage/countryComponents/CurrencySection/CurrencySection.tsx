import { useGetCurrencyQuery } from "../../../../services/api/currencyApi";
import styles from "./CurrencySection.module.css"
 

type Props = {
  currency: string;
};

function CurrencySection({ currency }: Props) {
const { data: value, isLoading } = useGetCurrencyQuery(currency);

  if (currency === "EUR") {
    return (
      <div className={styles.card}>
        <p className={styles.title}>Currency</p>
        <p className={styles.text}>Euro (EUR)</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className={styles.card}>Loading...</div>;
  }

  if (value === undefined) {
    return <div className={styles.card}>No data</div>;
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Currency</p>
      <p className={styles.text}>1 EUR = {value} {currency}</p>
    </div>
  );
}
export default CurrencySection;