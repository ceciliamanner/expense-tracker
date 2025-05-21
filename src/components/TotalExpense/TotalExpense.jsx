import styles from "./TotalExpense.module.css";

const TotalExpense = ({ expenses }) => { // ✅ ADDED prop
  const total = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0); // ✅ ADDED

  return (
    <div className={styles.totalContainer}>
    <span className={styles.totalLabel}>Total Spent:</span>
    <span className={styles.totalAmount}>{total} kr</span>
  </div>
  );
};

export default TotalExpense;