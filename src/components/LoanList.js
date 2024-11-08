import React from "react";
import { approveLoan } from "../api";

const LoanList = ({ loans, isAdmin, refreshLoans }) => {
  const handleApprove = async (loanId) => {
    try {
      await approveLoan(loanId);
      alert("Loan approved successfully");
      refreshLoans();  
    } catch (error) {
      console.error("Error approving loan:", error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-8">
      {loans.map((loan) => (
        <div 
          key={loan._id} 
          className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-800 mb-2">
            <span className="text-blue-700">Loan Amount:</span> <span className="text-blue-900">${loan.amount}</span>
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-2">
            <span className="text-blue-700">Term:</span> <span className="text-blue-900">{loan.term} weeks</span>
          </p>
          <p className={`text-xl font-semibold mb-3 ${loan.status === "PENDING" ? "text-yellow-600" : "text-green-700"}`}>
            <span className="text-blue-700">Status:</span> {loan.status}
          </p>
          {isAdmin && loan.status === "PENDING" && (
            <button
              onClick={() => handleApprove(loan._id)}
              className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-transform duration-300"
            >
              Approve Loan
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoanList;
