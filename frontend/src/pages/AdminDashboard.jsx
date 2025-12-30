import { useState, useEffect } from 'react';
import { getAllUsers, activateUser, deactivateUser } from '../services/api';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null, userId: null });

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await getAllUsers(page);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, action) => {
    try {
      if (action === 'activate') {
        await activateUser(userId);
        toast.success('User activated successfully');
      } else {
        await deactivateUser(userId);
        toast.success('User deactivated successfully');
      }
      fetchUsers(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setConfirmDialog({ isOpen: false, action: null, userId: null });
    }
  };

  const openConfirmDialog = (action, userId) => {
    setConfirmDialog({ isOpen: true, action, userId });
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>User Management Dashboard</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td><span className="badge">{user.role}</span></td>
                <td>
                  <span className={`status ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.role !== 'admin' && (
                    <>
                      {user.status === 'inactive' ? (
                        <button
                          onClick={() => openConfirmDialog('activate', user._id)}
                          className="btn-success"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => openConfirmDialog('deactivate', user._id)}
                          className="btn-danger"
                        >
                          Deactivate
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {pagination.totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
          disabled={currentPage === pagination.totalPages}
        >
          Next
        </button>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={`${confirmDialog.action === 'activate' ? 'Activate' : 'Deactivate'} User`}
        message={`Are you sure you want to ${confirmDialog.action} this user?`}
        onConfirm={() => handleStatusChange(confirmDialog.userId, confirmDialog.action)}
        onCancel={() => setConfirmDialog({ isOpen: false, action: null, userId: null })}
      />
    </div>
  );
};

export default AdminDashboard;
