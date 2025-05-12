import styles from "./Main.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Filter from "../Filter/Filter";
import TotalExpense from "../TotalExpense/TotalExpense";
import ExpenseList from "../ExpenseList/ExpenseList";
import EditModal from "../EditModal/EditModal";


const Main = () => {
  return (
    <>
     <main className={styles.main}>
        <ExpenseForm />
        <Filter />
        <TotalExpense />
        <ExpenseList /> 
        <EditModal /> 
     </main>
    </>
  )
}

export default Main