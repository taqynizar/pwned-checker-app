import React from 'react';
import styles from './ResultModal.module.css';

const ResultModal = ({ result, error, onClose }) => {
  if (!result && !error) return null;

  const isPwned = result?.isPwned;

  return (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modalContent} ${isPwned ? styles.pwned : styles.safe}`}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        
        {error && (
          <>
            <h2 className={styles.titleError}>خطأ</h2>
            <p>{error}</p>
          </>
        )}

        {result && (
          isPwned ? (
            <>
              <h2 className={styles.titlePwned}>للأسف! تم اختراق الحساب</h2>
              <p>تم العثور على هذا البريد الإلكتروني في <strong>{result.data.length}</strong> من عمليات خرق البيانات:</p>
              <ul className={styles.breachList}>
                {result.data.map((breach) => (
                  <li key={breach.Name}>{breach.Name}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className={styles.titleSafe}>أخبار جيدة! لم يتم العثور على أي اختراق</h2>
              <p>هذا البريد الإلكتروني آمن ولم يظهر في أي من عمليات خرق البيانات المعروفة.</p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ResultModal;