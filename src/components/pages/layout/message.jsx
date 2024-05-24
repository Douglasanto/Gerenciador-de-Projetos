import { useState, useEffect } from "react";
import "../../../index.css";
import styles from "./message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <div className={`${styles.mensagem} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
