import styles from "./Modal.module.css";
import Button from "../Button/Button";
import { useState } from "react";

const Modal = ({ mode = "edit", expense, onClose, onEditSubmit, onDeleteConfirm }) => {
  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [date, setDate] = useState(
    expense?.date?.toDate?.().toISOString().split("T")[0] || ""
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>

        {mode === "delete" ? (
          <>
            <h2>Are you sure you want to delete {expense.title}?</h2>
            <div className={styles.buttonGroup}>
              <Button
                onClick={() => {
                  onDeleteConfirm(expense.id);
                  onClose();
                }}
              >
                Confirm
              </Button>
              <Button onClick={onClose}>Cancel</Button> 
            </div>
          </>
        ) : (
          <>
            <h2>Edit Expense</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedExpense = { 
                  ...expense, 
                  title, 
                  amount: parseFloat(amount),
                  category,
                  date: new Date(date),
                 };
                onEditSubmit(updatedExpense);
                onClose();
              }}
            >
               <label>Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Button type="submit" className="button--edit">Confirm Edit</Button> {/* ✅ 🟢 använder din grå stil */}
              <Button onClick={onClose}>Cancel</Button> 
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;