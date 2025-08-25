import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-800', text: 'Completed' };
      case 'in_progress':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'In Progress' };
      case 'revision':
        return { color: 'bg-red-100 text-red-800', text: 'Revision' };
      case 'forwarded':
        return { color: 'bg-blue-100 text-blue-800', text: 'Forwarded' };
      case 'in_verification':
        return { color: 'bg-purple-100 text-purple-800', text: 'In Verification' };
      case 'created':
        return { color: 'bg-gray-100 text-gray-800', text: 'Created' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};