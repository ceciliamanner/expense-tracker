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
        <TotalExpense expenses={expenses}/>
        <Filter />
        <ExpenseList expenses={expenses}/>
        <EditModal /> 
     </main>
    </>
  )
}

export default Main