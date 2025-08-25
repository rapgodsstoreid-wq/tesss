import React, { useState } from 'react';
import { User } from '../../types';
import { Save, X } from 'lucide-react';

interface UserFormProps {
  user: User | null;
  onSave: (userData: any) => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    user_id: user?.user_id || '',
    password: '',
    role: user?.role || 'staff'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.user_id.trim()) {
      newErrors.user_id = 'User ID is required';
    }
    
    if (!user && !formData.password.trim()) {
      newErrors.password = 'Password is required for new users';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user ? 'Edit User' : 'Create New User'}
          </h2>
          <p className="text-gray-600">
            {user ? 'Update user information and role' : 'Add a new user to the system'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-2">
              User ID *
            </label>
            <input
              type="text"
              id="user_id"
              value={formData.user_id}
              onChange={(e) => handleChange('user_id', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.user_id ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter unique user ID"
            />
            {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password {!user && '*'}
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={user ? "Leave blank to keep current password" : "Enter password"}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="tu">TU</option>
              <option value="coordinator">Coordinator</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{user ? 'Update User' : 'Create User'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};