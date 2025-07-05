import React, { useState } from 'react';
import styles from './PwnedChecker.module.css';
import ResultModal from './ResultModal';

const PwnedChecker = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkPwned = async () => {
    if (!email) {
      setError('الرجاء إدخال بريد إلكتروني.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/check-pwned', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`خطأ في الخادم: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(data);

    } catch (err) {
      setError(err.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className={styles.checkerContainer}>
      <p className={styles.description}>
        أدخل بريدك الإلكتروني لمعرفة ما إذا كان قد ظهر في أي خرق للبيانات.
      </p>
      <div className={styles.inputGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className={styles.emailInput}
          disabled={isLoading}
        />
        <button onClick={checkPwned} className={styles.checkButton} disabled={isLoading}>
          {isLoading ? 'يتم التحقق...' : 'تحقق الآن'}
        </button>
      </div>

      {(result || error) && (
        <ResultModal
          result={result}
          error={error}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PwnedChecker;