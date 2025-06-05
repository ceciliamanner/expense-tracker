import { useEffect, useState } from "react"; 
import { collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

import styles from "./Main.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Filter from "../Filter/Filter";
import TotalExpense from "../TotalExpense/TotalExpense";
import Modal from "../Modal/Modal";
import ExpenseList from "../ExpenseList/ExpenseList";



const Main = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [selectedExpense, setSelectedExpense] = useState(null);


  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setModalMode("edit");
    setModalOpen(true);
  };
  

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setModalMode("delete");
    setModalOpen(true);
  };
  

  const handleEditSubmit = async (updatedExpense) => {
    const expenseRef = doc(database, "expense-collection", updatedExpense.id);

    try {
      await updateDoc(expenseRef, {
        title: updatedExpense.title,
        amount: Number(updatedExpense.amount),
        date: updatedExpense.date,
        category: updatedExpense.category
      });
      
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };


  const handleDeleteConfirm = async (id) => {
    try {
      await deleteDoc(doc(database, "expense-collection", id));
   
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };


  const handleMonthChange = (monthValue) => {
    setSelectedMonth(monthValue);
  };

  const filteredExpenses = selectedMonth
  ? expenses.filter((exp) => {
      const date = exp.date?.toDate?.();
      if (!date) return false;

      const formatted = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      return formatted === selectedMonth;
    })
  : expenses;

// Realtime listener for expense collection
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

  return (
    <>
     <main className={styles.main}>

        <div className={styles.formSection}>
          <ExpenseForm />
        </div>

        <div className={styles.summarySection}>
          <Filter
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />
        </div>

        <div className={styles.expenseListSection}>
          <ExpenseList 
            expenses={filteredExpenses}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>

        {modalOpen && selectedExpense && (
          <Modal
            mode={modalMode}
            expense={selectedExpense}
            onClose={() => setModalOpen(false)}
            onEditSubmit={handleEditSubmit}
            onDeleteConfirm={handleDeleteConfirm}
          />
          
        )}

<       div className={styles.totalSummary}>
          <TotalExpense expenses={filteredExpenses} />
        </div>
     </main>
    </>
  );
};

export default Main