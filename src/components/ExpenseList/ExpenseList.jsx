import { doc, deleteDoc } from "firebase/firestore"; // ✅ Bara det du behöver
import { database } from "../../firebaseConfig";
import ExpenseRow from "../ExpenseRow/ExpenseRow";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ expenses }) => {
  const handleEdit = (expense) => {
    console.log("Edit clicked:", expense);
    // TODO: Öppna modal eller inline-edit
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteDoc(doc(database, "expense-collection", expenseId));
      console.log("Deleted:", expenseId);
    } catch (error) {
      console.error("Failed to delete:", error.message);
    }
  };

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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;