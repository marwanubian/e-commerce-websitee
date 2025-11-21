"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState} from "react";
import { 
  User, Mail, Edit, X, Save, LogOut, Loader, CheckCircle, MapPin, Plus, Trash,
  Phone, Home, AlertCircle
} from "lucide-react";
import { addAddress, deleteAddress, getAddresses, updateProfile } from "-/actions/profile.action";
import { useProfile } from "../context/ProfileContext";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const user = session?.user;
const { profile, refreshProfile } = useProfile();

const [name, setName] = useState(profile?.name || "");
const [email, setEmail] = useState(profile?.email || "");
const [originalName, setOriginalName] = useState(profile?.name || "");
const [originalEmail, setOriginalEmail] = useState(profile?.email || "");


  // const [name, setName] = useState(user?.name || "");
  // const [email, setEmail] = useState(user?.email || "");
  // const [originalName, setOriginalName] = useState(user?.name || "");
  // const [originalEmail, setOriginalEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, "_id">>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Initialize form & fetch addresses when session is ready
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setOriginalName(user.name || "");
      setOriginalEmail(user.email || "");
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setMessage("❌ Failed to load addresses");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);

    try {
      const updatedUser = await updateProfile({ name, email });

// 1️⃣ Update local state
setOriginalName(updatedUser.name || name);
setOriginalEmail(updatedUser.email || email);
setIsEditing(false);
setMessage("✅ Profile updated successfully!");

// 2️⃣ Refresh profile context so all components see updated data
await refreshProfile();

// 3️⃣ Update session if needed
await update({ ...session, user: { ...user, name: updatedUser.name, email: updatedUser.email } });

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error("Profile update failed:", err);
      setMessage("❌ " + (err.message || "Failed to update profile"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setName(originalName);
    setEmail(originalEmail);
    setIsEditing(false);
    setMessage(null);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressLoading(true);
    
    try {
      const added = await addAddress(newAddress);
      setAddresses([...addresses, added]);
      setNewAddress({ name: "", details: "", phone: "", city: "" });
      setShowAddAddress(false);
      setMessage("✅ Address added successfully!");
    } catch (err: any) {
      console.error("Failed to add address:", err);
      setMessage("❌ " + (err.message || "Failed to add address"));
    } finally {
      setAddressLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter(a => a._id !== id));
      setMessage("✅ Address deleted successfully!");
    } catch (err: any) {
      console.error("Failed to delete address:", err);
      setMessage("❌ " + (err.message || "Failed to delete address"));
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Loader className="animate-spin h-8 w-8 text-indigo-600 mb-4" />
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view this page</p>
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
            <p className="text-indigo-100 mt-2">Manage your account information and preferences</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200">
              <div className="relative">
                {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt="Profile" 
                    width={96} 
                    height={96} 
                    className="rounded-full border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center">
                    <User className="h-12 w-12 text-indigo-500" />
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{profile?.name || "No Name"}</h2>
<p className="text-gray-600 mt-1">{profile?.email || "No Email"}</p>

                <div className="flex items-center mt-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified Account
                </div>
              </div>
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
                {!isEditing ? (
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(true)} 
                    className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit} 
                    className="flex items-center text-gray-600 hover:text-gray-700 font-medium"
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 w-full border rounded-lg py-2.5 ${isEditing ? "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500" : "bg-gray-50 border-gray-200"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 w-full border rounded-lg py-2.5 ${isEditing ? "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500" : "bg-gray-50 border-gray-200"}`}
                    />
                  </div>
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-lg ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {message}
                </div>
              )}

              {isEditing && (
                <button 
                  type="submit" 
                  disabled={loading || (name === originalName && email === originalEmail)}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              My Addresses
            </h3>
            <button
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              {showAddAddress ? "Cancel" : "Add Address"}
            </button>
          </div>

          {showAddAddress && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Add New Address
              </h4>
              <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
                  <textarea
                    value={newAddress.details}
                    onChange={(e) => setNewAddress({...newAddress, details: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addressLoading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                  >
                    {addressLoading ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-1" />
                        Saving...
                      </>
                    ) : (
                      "Save Address"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No addresses found. Add your first address to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map(addr => (
                <div key={addr._id} className="p-4 border border-gray-200 rounded-lg relative hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">{addr.name}</h4>
                  <p className="text-gray-600 mb-2">{addr.details}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{addr.city}</span>
                    <span>{addr.phone}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteAddress(addr._id)} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center w-full md:w-auto mx-auto bg-red-50 text-red-700 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}