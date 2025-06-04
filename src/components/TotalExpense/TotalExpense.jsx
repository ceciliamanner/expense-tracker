import styles from "./TotalExpense.module.css";

const TotalExpense = ({ expenses }) => { 
  const total = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0); 
  
  return (
    <div className={styles.totalContainer}>
    <span className={styles.totalLabel}>Total Spent:</span>
    <span className={styles.totalAmount}>{total} kr</span>
  </div>
  );
};

export default TotalExpense;