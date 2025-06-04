import ExpenseRow from "../ExpenseRow/ExpenseRow";
import styles from "./ExpenseList.module.css";


const ExpenseList = ({ expenses, onEditClick, onDeleteClick }) => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <div className={styles.tableLike}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onEdit={() => onEditClick(expense)}
              onDelete={() => onDeleteClick(expense)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;