import React, { useEffect, useState } from "react";
import { getAdminLoans, setAuthToken, approveLoan as approveLoanAPI } from "../api";
import LoanList from "../components/LoanList";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);

      const res = await getAdminLoans(); // Make the request after setting the token
      setLoans(res.data);
    } catch (error) {
      console.error(
        "Error fetching loans:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Approve loan handler
  const handleApproveLoan = async (loanId) => {
    try {
      await approveLoanAPI(loanId); // Call the API to approve the loan
      fetchLoans(); // Refresh loans after approval
    } catch (error) {
      console.error(
        "Error approving loan:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Manage loan approvals and review pending applications.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <LoanList
            loans={loans}
            isAdmin={true}
            refreshLoans={fetchLoans}
            approveLoan={handleApproveLoan} // Pass the approve loan function
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
