import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, XCircle, Download, Trash2, RefreshCw } from 'lucide-react';
import { getTextClasses, getBackgroundClasses } from '../../utils/themeUtils';

/**
 * Analytics dashboard component for prediction insights
 * @param {Object} props - Component props
 * @param {Object} props.analytics - Analytics data
 * @param {Array} props.history - Prediction history
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {Function} props.onClearHistory - Clear history callback
 * @param {Function} props.onExportHistory - Export history callback
 * @returns {JSX.Element} Analytics dashboard component
 */
const AnalyticsDashboard = ({
  analytics,
  history,
  isDarkMode,
  onClearHistory,
  onExportHistory
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!analytics || !history) {
    return (
      <div className={`p-4 rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <p className={getTextClasses(isDarkMode, 'muted')}>
          No analytics data available yet. Make some predictions to see insights!
        </p>
      </div>
    );
  }

  const successRate = analytics.totalPredictions > 0 
    ? (analytics.successfulPredictions / analytics.totalPredictions * 100).toFixed(1)
    : 0;

  const recentHistory = history.slice(0, 5);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <div className={`p-4 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${getTextClasses(isDarkMode, 'muted')}`}>{title}</p>
          <p className={`text-2xl font-bold ${getTextClasses(isDarkMode, 'primary')}`}>{value}</p>
          {subtitle && (
            <p className={`text-xs ${getTextClasses(isDarkMode, 'muted')}`}>{subtitle}</p>
          )}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setSelectedTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        selectedTab === id
          ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </button>
  );

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BarChart3}
          title="Total Predictions"
          value={analytics.totalPredictions}
          color="blue"
        />
        <StatCard
          icon={CheckCircle}
          title="Success Rate"
          value={`${successRate}%`}
          subtitle={`${analytics.successfulPredictions} successful`}
          color="green"
        />
        <StatCard
          icon={Clock}
          title="Avg Response Time"
          value={`${Math.round(analytics.averageResponseTime)}ms`}
          color="orange"
        />
        <StatCard
          icon={XCircle}
          title="Failed Predictions"
          value={analytics.failedPredictions}
          color="red"
        />
      </div>

      {analytics.lastPredictionTime && (
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <p className={`text-sm ${getTextClasses(isDarkMode, 'muted')}`}>
            Last prediction: {formatTimestamp(analytics.lastPredictionTime)}
          </p>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
          Recent Predictions
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onExportHistory('csv')}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </button>
          <button
            onClick={() => onExportHistory('json')}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Download className="h-4 w-4 mr-1" />
            Export JSON
          </button>
          <button
            onClick={onClearHistory}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {recentHistory.length > 0 ? (
          recentHistory.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } ${item.success ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {item.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${getTextClasses(isDarkMode, 'primary')}`}>
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className={`text-xs ${getTextClasses(isDarkMode, 'muted')}`}>
                      Input: {JSON.stringify(item.input).slice(0, 100)}...
                    </p>
                    {item.error && (
                      <p className="text-xs text-red-500 mt-1">
                        Error: {item.error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-center py-8 ${getTextClasses(isDarkMode, 'muted')}`}>
            No prediction history available yet.
          </p>
        )}
      </div>

      {history.length > 5 && (
        <p className={`text-sm text-center ${getTextClasses(isDarkMode, 'muted')}`}>
          Showing 5 of {history.length} predictions
        </p>
      )}
    </div>
  );

  return (
    <div className={`p-6 rounded-lg border ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${getTextClasses(isDarkMode, 'primary')}`}>
          Prediction Analytics
        </h2>
        <div className="flex space-x-2">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="history" label="History" icon={Clock} />
        </div>
      </div>

      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'history' && renderHistory()}
    </div>
  );
};

export default AnalyticsDashboard;
