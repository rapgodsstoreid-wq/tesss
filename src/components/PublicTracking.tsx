import React, { useState } from 'react';
import { Layout } from './Layout';
import { Search, Calendar, User, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const PublicTracking: React.FC = () => {
  const [letterNumber, setLetterNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sample tracking data for demonstration
  const sampleTrackingData = {
    letter_number: 'RPT001',
    subject: 'Budget Approval Request',
    status: 'in_progress',
    timeline: [
      {
        date: '2024-01-15T08:00:00Z',
        status: 'Created by TU',
        user: 'John Doe (TU)',
        description: 'Report created and initial documents uploaded'
      },
      {
        date: '2024-01-15T10:30:00Z',
        status: 'Forwarded to Coordinator',
        user: 'John Doe (TU)',
        description: 'Report forwarded to Suwarti, S.h for review'
      },
      {
        date: '2024-01-16T09:15:00Z',
        status: 'In Document Verification',
        user: 'Suwarti, S.h (Coordinator)',
        description: 'Document verification in progress'
      },
      {
        date: '2024-01-16T14:20:00Z',
        status: 'Assigned to Staff',
        user: 'Suwarti, S.h (Coordinator)',
        description: 'Task assigned to Maria Santos and David Kim'
      },
      {
        date: '2024-01-17T11:45:00Z',
        status: 'In Progress',
        user: 'Maria Santos (Staff)',
        description: 'Task completion in progress - 60% completed'
      }
    ]
  };

  const handleSearch = async () => {
    if (!letterNumber.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (letterNumber === 'RPT001') {
        setTrackingData(sampleTrackingData);
      } else {
        setTrackingData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout title="Public Report Tracking">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Report</h1>
            <p className="text-gray-600">Enter your letter number to view the current status and progress timeline</p>
          </div>

          <div className="flex space-x-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                value={letterNumber}
                onChange={(e) => setLetterNumber(e.target.value)}
                placeholder="Enter Letter Number (e.g., RPT001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !letterNumber.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>{loading ? 'Searching...' : 'Track'}</span>
            </button>
          </div>

          {trackingData && (
            <div className="space-y-6">
              {/* Report Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{trackingData.letter_number}</h2>
                    <p className="text-gray-600">{trackingData.subject}</p>
                  </div>
                  <StatusBadge status={trackingData.status} />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                <div className="relative">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className="relative pb-8">
                      {index !== trackingData.timeline.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-300"></div>
                      )}
                      <div className="relative flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-900">{event.status}</h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(event.date)}
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{event.user}</span>
                          </div>
                          <p className="text-sm text-gray-700">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {letterNumber && !trackingData && !loading && (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">
                <FileText className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="text-lg">No report found with letter number: <strong>{letterNumber}</strong></p>
                <p className="text-sm">Please check the letter number and try again.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};