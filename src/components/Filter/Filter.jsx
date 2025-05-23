import styles from "./Filter.module.css";

const Filter = ({ selectedMonth, onMonthChange }) => {
  const handleChange = (e) => {
    onMonthChange(e.target.value); // 👈 skickar t.ex. "2025-02"
  };

  return (
    <input
      type="month"
      value={selectedMonth}
      onChange={handleChange}
      min="2024-06"
      max="2025-06"
      className={styles.filterSelect}
    />
  );
};

export default Filter;