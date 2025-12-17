import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { FaUserEdit, FaTrashAlt, FaUserPlus, FaFilter } from "react-icons/fa";

const roles = ["Student", "Moderator", "Admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "Student", photoURL: "",
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const openEditModal = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, photoURL: user.photoURL || "https://i.ibb.co/2kR1Y5C/avatar.png" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axiosInstance.patch(`/admin/users/update-user/${selectedUser._id}`, form);
        Swal.fire("Success", "User updated!", "success");
      } else {
        await axiosInstance.post("/admin/create-user", form);
        Swal.fire("Success", "User created!", "success");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Permanent delete from DB & Firebase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/admin/users/delete-user/${id}`);
          fetchUsers();
          Swal.fire("Deleted!", "User removed.", "success");
        } catch (err) { console.error(err); }
      }
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
            <p className="text-gray-500">Manage, edit and monitor platform users</p>
          </div>
          <button onClick={() => { setIsEdit(false); setForm({ name: "", email: "", password: "", role: "Student", photoURL: "" }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
            <FaUserPlus /> Add New User
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
          <FaFilter className="text-[#154E81]" />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-transparent outline-none text-gray-600 font-medium cursor-pointer">
            <option value="">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Table Area */}
        {loading ? (
          <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154E81]"></div></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">UserInfo</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.filter(u => !filterRole || u.role === filterRole).map((user) => (
                  <tr key={user._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.photoURL || "https://i.ibb.co/2kR1Y5C/avatar.png"} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" />
                        <span className="font-semibold text-gray-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === 'Admin' ? 'bg-red-100 text-red-600' : 
                        user.role === 'Moderator' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => openEditModal(user)} className="p-2 text-[#154E81] hover:bg-indigo-100 rounded-lg transition-colors"><FaUserEdit size={18} /></button>
                        <button onClick={() => handleDelete(user._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><FaTrashAlt size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Same as logic, but styled */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden scale-in">
            <div className="bg-[#154E81] p-4 text-white font-bold text-lg">{isEdit ? "Update User" : "Create New User"}</div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#154E81]" />
              <input type="email" placeholder="Email" value={form.email} disabled={isEdit} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#154E81] disabled:bg-gray-50" />
              <input type="url" placeholder="Photo URL (Optional)" value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })}  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#154E81]" 
/>
              {!isEdit && <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#154E81]" />}
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#154E81] bg-white">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-[#154E81] text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;