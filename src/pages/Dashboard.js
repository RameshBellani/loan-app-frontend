import React, { useEffect, useState } from "react";
import { getLoans, applyLoan, submitRepaymentForLoan, setAuthToken } from "../api"; // updated import

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");

  const token = localStorage.getItem("token");
  if (token) setAuthToken(token);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getLoans();
        setLoans(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchLoans();
  }, []);

  const handleApplyLoan = async (e) => {
    e.preventDefault();
    try {
      await applyLoan({ amount, term });
      alert("Loan applied successfully!");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleRepayment = async (loanId, repaymentIndex, amount) => {
    try {
      await submitRepaymentForLoan({ loanId, repaymentIndex, amount });
      // Mark the repayment as paid by updating the state
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId
            ? {
                ...loan,
                repayments: loan.repayments.map((repayment, index) =>
                  index === repaymentIndex ? { ...repayment, paid: true } : repayment
                ),
              }
            : loan
        )
      );
      alert("Repayment successful!");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>

      <form
        onSubmit={handleApplyLoan}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">Apply for Loan</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Loan Amount
            </label>
            <input
              type="number"
              id="amount"
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label htmlFor="term" className="block text-sm font-medium text-gray-600">
              Term (in weeks)
            </label>
            <input
              type="number"
              id="term"
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter term in weeks"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Apply for Loan
          </button>
        </div>
      </form>

      {/* Loan List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Loans</h3>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-lg font-medium text-gray-800">Loan Amount: ${loan.amount}</p>
              <p className="text-sm text-gray-600">Status: {loan.status}</p>
              
              
              <div className="mt-4 space-y-2">
                {/* Show repayments if the loan is approved */}
                {loan.status === "APPROVED" && loan.repayments.map((repayment, index) => (
                  <div key={repayment._id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Repayment {index + 1}: ${repayment.amount}
                    </span>
                    {/* Only show the pay button if the repayment is unpaid */}
                    {!repayment.paid ? (
                      <button
                        onClick={() =>
                          handleRepayment(loan._id, index, repayment.amount)
                        }
                        className="py-1 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                      >
                        Pay ${repayment.amount}
                      </button>
                    ) : (
                      <span className="text-sm text-green-600">Paid</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
