import { useEffect, useState } from "react"; 
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../firebaseConfig";

import styles from "./Main.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Filter from "../Filter/Filter";
import TotalExpense from "../TotalExpense/TotalExpense";
import EditModal from "../EditModal/EditModal";
import ExpenseList from "../ExpenseList/ExpenseList";



const Main = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

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
      setExpenses(expenseData); // ✅ ADDED
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
     <main className={styles.main}>
        <ExpenseForm />
        <TotalExpense expenses={filteredExpenses}/>
        <Filter
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <ExpenseList expenses={filteredExpenses}/>
        <EditModal /> 
     </main>
    </>
  )
}

export default Main