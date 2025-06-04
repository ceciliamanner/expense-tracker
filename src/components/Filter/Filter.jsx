import styles from "./Filter.module.css";

const Filter = ({ selectedMonth, onMonthChange }) => {
  const handleChange = (e) => {
    onMonthChange(e.target.value);
  };

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="month" className={styles.filterLabel}>Filter by month:</label>
      <input
        type="month"
        value={selectedMonth}
        onChange={handleChange}
        min="2024-06"
        max="2025-06"
        className={styles.filterSelect}
      />
    </div>
  );
};

export default Filter;