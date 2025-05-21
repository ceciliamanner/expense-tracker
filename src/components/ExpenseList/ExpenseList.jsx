import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import ExpenseRow from "../ExpenseRow/ExpenseRow";
import styles from "./ExpenseList.module.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const expenseQuery = query(
      collection(database, "expense-collection"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {
      const expenseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expenseData);
    });

    return () => unsubscribe();
  }, []);

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