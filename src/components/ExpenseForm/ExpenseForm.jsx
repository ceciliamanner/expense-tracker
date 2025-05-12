
import { useState } from "react";
import styles from "./ExpenseForm.module.css"; 
import Button from "../Button/Button";


const ExpenseForm = () => {
    const [expenseInput, setExpenseInput] = useState({
        title: "", 
        amount: "", 
        date: "", 
        category: "",
    }); 


  return (
    <form className={styles.form}>
        <h2 className={styles.formTitle}>Add New Expense</h2>
        <div className={styles.formWrap}>
            <div className={styles.formGroup}>
                <label htmlFor="category"></label>
                <select
                    type="text"
                    name="category"
                    id="category"
                >
                    <option value="">Select Category</option>
                    <option value="housing">Housing</option>
                    <option value="utilities">Utilities</option>
                    <option value="grocery">Grocery</option>
                    <option value="transportation">Transportation</option>
                    <option value="clothing">Clothing</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title"></label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="amount"></label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="date"></label>
                <input
                    type="date"
                    name="date"
                    id="date"
                />
            </div> 
        </div>
        <Button className={styles.addButton}>Add Expense</Button>


    </form>
  )
}

export default ExpenseForm