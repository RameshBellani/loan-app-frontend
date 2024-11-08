// src/components/RepaymentForm.js
import React, { useState } from 'react';
import { submitRepayment } from '../api';

const RepaymentForm = ({ loanId, scheduledAmount, onSuccess }) => {
  const [repaymentAmount, setRepaymentAmount] = useState(scheduledAmount);

  const handleRepayment = async (e) => {
    e.preventDefault();
    try {
      await submitRepayment({ loanId, amount: repaymentAmount });
      alert('Repayment successful');
      onSuccess();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleRepayment} className="space-y-4">
      <input
        type="number"
        placeholder="Repayment Amount"
        className="input"
        value={repaymentAmount}
        onChange={(e) => setRepaymentAmount(e.target.value)}
      />
      <button type="submit" className="btn w-full">Submit Repayment</button>
    </form>
  );
};

export default RepaymentForm;
