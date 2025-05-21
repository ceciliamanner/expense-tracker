import styles from "./Main.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Filter from "../Filter/Filter";
import TotalExpense from "../TotalExpense/TotalExpense";
import EditModal from "../EditModal/EditModal";
import ExpenseList from "../ExpenseList/ExpenseList";



const Main = () => {
  return (
    <>
     <main className={styles.main}>
        <ExpenseForm />
        <Filter />
        <ExpenseList/>
        <TotalExpense />
        <EditModal /> 
     </main>
    </>
  )
}

export default Main