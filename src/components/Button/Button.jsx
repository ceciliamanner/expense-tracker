import styles from "./Button.module.css";

const Button = ({children="click", className, onClick, disabled=false, ariaLabel}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>{children}</button>
  )
}

export default Button;
