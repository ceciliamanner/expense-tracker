import styles from "./ExpenseRow.module.css";
import Button from "../Button/Button";

const ExpenseRow = ({ expense, onEdit, onDelete }) => {
  const { title, category, amount, date } = expense;

  const formattedDate = date?.toDate
    ? date.toDate().toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className={styles.row}>
      <div className={styles.cell}>{title}</div>
      <div className={styles.cell}>{category}</div>
      <div className={styles.cell}>{amount} kr</div>
      <div className={styles.cell}>{formattedDate}</div>
      <div className={styles.actions}>
      
      <Button className="button--edit" onClick={() => onEdit(expense)} ariaLabel="Edit expense">
          Edit
      </Button>
      <Button className="button--delete" onClick={() => onDelete(expense.id)} ariaLabel="Delete expense">
          Delete
      </Button>
    </div>
    </div>
  );
};

export default ExpenseRow;