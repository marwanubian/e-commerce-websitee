"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMapMarkerAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Address, addUserAddress, deleteUserAddress, getUserAddresses } from "-/actions/address.action";

export default function ProfileAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({ name: "", details: "", phone: "", city: "" });

  // Fetch addresses
  useEffect(() => {
    async function fetch() {
      const data = await getUserAddresses();
      if (data) setAddresses(data);
      setLoading(false);
    }
    fetch();
  }, []);

  // Add new address
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addUserAddress(newAddress);
    if ("success" in res && res.success === false) {
      alert(res.message);
      return;
    }
    setAddresses([...addresses, res as Address]);
    setNewAddress({ name: "", details: "", phone: "", city: "" });
  };

  // Delete address
  const handleDelete = async (id: string) => {
    const res = await deleteUserAddress(id);
    if (res.success) {
      setAddresses(addresses.filter(a => a._id !== id));
    } else {
      alert(res.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-indigo-600" />
        <p className="ml-3 text-gray-600">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600" />
        My Addresses
      </h1>

      {/* Address List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {addresses.map(addr => (
          <div key={addr._id} className="p-4 border rounded-lg shadow-sm bg-white relative">
            <h2 className="font-semibold text-lg text-gray-800">{addr.name}</h2>
            <p className="text-gray-600">{addr.details}</p>
            <p className="text-gray-600">📍 {addr.city}</p>
            <p className="text-gray-600">📞 {addr.phone}</p>
            <button
              onClick={() => handleDelete(addr._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Address Form */}
      <form onSubmit={handleAdd} className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faPlus} className="text-indigo-600" />
          Add New Address
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newAddress.name}
            onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newAddress.phone}
            onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Details"
            value={newAddress.details}
            onChange={e => setNewAddress({ ...newAddress, details: e.target.value })}
            className="border p-2 rounded w-full sm:col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
