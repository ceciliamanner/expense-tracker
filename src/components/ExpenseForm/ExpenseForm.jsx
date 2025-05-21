
import { useState } from "react";
import styles from "./ExpenseForm.module.css"; 
import Button from "../Button/Button";
import { database } from "../../firebaseConfig";
import {addDoc, setDoc, collection, doc} from "firebase/firestore"


const ExpenseForm = () => {
    const [expenseInput, setExpenseInput] = useState({
        category: "",
        title: "", 
        amount: "", 
        date: "", 
    }); 

    const [error, setError] = useState(null);
    const [formValidated, setFormValidated] = useState(null)


    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpenseInput((prevData) => ({ ...prevData, [name]: value }));
        setError((prevError) => ({ ...prevError, [name]: "" }));
    };

    const saveDatatoFirebase = async (expense) => {
        try {
            const docRef = await addDoc(
                collection(database, "expense-collection"),
                expense
            );
            await setDoc(doc(database, "expense-collection", docRef.id), {
                ...expense,
                id: docRef.id,
              });
            console.log("expense has been added with the id", docRef.id);
            
        } catch (error) {
            console.log(error.message, "failed to store the expense");
            
        }
    };


    const validateInput = () => {
        const errorObj = {...error};
        let isValid = true; 

        if(!expenseInput.category){
            errorObj.category = "Please select a category";
            isValid = false; 
        }else {
            errorObj.category = ""; 
        }

        if(!expenseInput.title.trim()){
            errorObj.title = "Title is required";
            isValid = false; 
        }else {
            errorObj.title = ""; 
        }

        if(!expenseInput.amount){
            errorObj.amount = "Please enter an amount ";
            isValid = false; 
        }else {
            errorObj.amount = ""; 
        }

        if(!expenseInput.date){
            errorObj.date = "Select date";
            isValid = false; 
        } else {
            const inputDate = new Date(expenseInput.date);
            const today = new Date(); 
            if(inputDate > today){
                errorObj.date = "Future dates are not allowed";
                isValid = false;
            } else {
                errorObj.date = "";
            }
        }

        setError(errorObj);

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formIsValid = validateInput();
            if(!formIsValid){
                return;
            }

            const expense = {
                ...expenseInput,
                amount: parseFloat(expenseInput.amount),
                date: new Date(expenseInput.date),
            };
        
            try {
                await saveDatatoFirebase(expense);
                console.log("Submitted:", expense);
                setExpenseInput({
                    category: "",
                    title: "",
                    amount: "",
                    date: "",
                });
                setFormValidated("Expense has been added");
            } catch (error) {
                console.log("Submission failed:", error.message);
            }

            setFormValidated("Expend has been added");
    };



  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Add New Expense</h2>
        <div className={styles.formWrap}>
            <div className={styles.formGroup}>
                <label htmlFor="category"></label>
                <select
                    type="text"
                    name="category"
                    id="category"
                    value={expenseInput.category}
                    onChange={handleChange}
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
                {error && (
                    <p className={styles.validationMessage}>{error.category}</p>
                 )}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title"></label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={expenseInput.title}
                    onChange={handleChange}
                />
                 {error && (
                    <p className={styles.validationMessage}>{error.title}</p>
                 )}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="amount"></label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    min="1"
                    max="999999"
                    value={expenseInput.amount}
                    onChange={handleChange}
                />
                {error && (
                    <p className={styles.validationMessage}>{error.amount}</p>
                 )}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="date"></label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={expenseInput.date}
                    onChange={handleChange}
                />
                {error && (
                    <p className={styles.validationMessage}>{error.date}</p>
                 )}
            </div> 
        </div>
        <Button type="submit" className={styles.addButton}>Add Expense</Button>


    </form>
  )
}

export default ExpenseForm