import React, { useState } from 'react';
import { useDrugForge } from '../context/DrugForgeContext';
import { Sparkles, TrendingUp, BarChart3, Zap, Shield, Clock } from 'lucide-react';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';

const EnhancedFeaturesDemo = () => {
  const { isDarkMode } = useDrugForge();
  const [selectedDemo, setSelectedDemo] = useState('overview');

  const features = [
    {
      id: 'analytics',
      title: 'Prediction Analytics',
      icon: BarChart3,
      description: 'Track prediction history, success rates, and performance metrics',
      benefits: ['Success rate tracking', 'Response time analytics', 'Prediction history', 'Export capabilities']
    },
    {
      id: 'validation',
      title: 'Real-time Validation',
      icon: Shield,
      description: 'Enhanced input validation with immediate feedback and suggestions',
      benefits: ['SMILES validation', 'Auto-completion', 'Error prevention', 'User guidance']
    },
    {
      id: 'visualization',
      title: 'Enhanced Results',
      icon: TrendingUp,
      description: 'Rich result displays with progress bars and visual indicators',
      benefits: ['Progress visualization', 'Color-coded results', 'Export options', 'Detailed interpretations']
    },
    {
      id: 'reliability',
      title: 'Auto-retry System',
      icon: Zap,
      description: 'Automatic retry mechanism for failed predictions with exponential backoff',
      benefits: ['Network resilience', 'Automatic recovery', 'Retry indicators', 'Improved reliability']
    },
    {
      id: 'performance',
      title: 'Performance Tracking',
      icon: Clock,
      description: 'Monitor API response times and system performance',
      benefits: ['Response time tracking', 'Performance metrics', 'Trend analysis', 'Optimization insights']
    }
  ];

  const FeatureCard = ({ feature, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isActive
          ? isDarkMode ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-50 border-blue-300'
          : isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center mb-3">
        <feature.icon className={`h-6 w-6 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
        <h3 className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
          {feature.title}
        </h3>
      </div>
      <p className={`text-sm mb-3 ${getTextClasses(isDarkMode, 'secondary')}`}>
        {feature.description}
      </p>
      <ul className="space-y-1">
        {feature.benefits.map((benefit, index) => (
          <li key={index} className={`text-xs flex items-center ${getTextClasses(isDarkMode, 'muted')}`}>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className={`text-center py-8 px-4 rounded-lg ${
        isDarkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-500" />
        <h2 className={`text-2xl font-bold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
          Enhanced DrugForge Experience
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${getTextClasses(isDarkMode, 'secondary')}`}>
          Next-generation drug discovery platform with advanced analytics, real-time validation, 
          and intelligent user experience features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isActive={selectedDemo === feature.id}
            onClick={() => setSelectedDemo(feature.id)}
          />
        ))}
      </div>

      <div className={`p-6 rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
          What's New in This Release
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
              🚀 Enhanced Components
            </h4>
            <ul className={`space-y-1 text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
              <li>• Real-time SMILES validation</li>
              <li>• Auto-completion suggestions</li>
              <li>• Visual progress indicators</li>
              <li>• Enhanced error handling</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
              📊 Analytics & Insights
            </h4>
            <ul className={`space-y-1 text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
              <li>• Prediction history tracking</li>
              <li>• Success rate monitoring</li>
              <li>• Performance analytics</li>
              <li>• Data export capabilities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border-l-4 border-l-blue-500 ${
        isDarkMode ? 'bg-blue-900/10 border-r border-t border-b border-gray-700' : 'bg-blue-50 border-r border-t border-b border-blue-200'
      }`}>
        <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
          <strong>Try it out:</strong> Visit any prediction component to experience the enhanced features, 
          or use the new <strong>Enhanced BBBP</strong> component to see all features in action.
        </p>
      </div>
    </div>
  );

  const renderFeatureDetails = () => {
    const feature = features.find(f => f.id === selectedDemo);
    if (!feature) return renderOverview();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <feature.icon className="h-8 w-8 mr-3 text-blue-500" />
          <div>
            <h2 className={`text-2xl font-bold ${getTextClasses(isDarkMode, 'primary')}`}>
              {feature.title}
            </h2>
            <p className={`${getTextClasses(isDarkMode, 'secondary')}`}>
              {feature.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
              Key Benefits
            </h3>
            <ul className="space-y-2">
              {feature.benefits.map((benefit, index) => (
                <li key={index} className={`flex items-center ${getTextClasses(isDarkMode, 'secondary')}`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
              Implementation Details
            </h3>
            {selectedDemo === 'analytics' && (
              <div className={`text-sm space-y-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <p>• LocalStorage-based history persistence</p>
                <p>• Real-time success rate calculation</p>
                <p>• CSV/JSON export functionality</p>
                <p>• Configurable history size limits</p>
              </div>
            )}
            {selectedDemo === 'validation' && (
              <div className={`text-sm space-y-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <p>• Debounced validation (500ms delay)</p>
                <p>• SMILES structure validation</p>
                <p>• Auto-completion dropdown</p>
                <p>• Visual feedback indicators</p>
              </div>
            )}
            {selectedDemo === 'visualization' && (
              <div className={`text-sm space-y-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <p>• Animated progress bars</p>
                <p>• Color-coded result indicators</p>
                <p>• Copy-to-clipboard functionality</p>
                <p>• Customizable result formatting</p>
              </div>
            )}
            {selectedDemo === 'reliability' && (
              <div className={`text-sm space-y-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <p>• Exponential backoff strategy</p>
                <p>• Configurable retry attempts</p>
                <p>• Network error handling</p>
                <p>• User-friendly retry indicators</p>
              </div>
            )}
            {selectedDemo === 'performance' && (
              <div className={`text-sm space-y-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <p>• Response time measurement</p>
                <p>• Average performance calculation</p>
                <p>• Trend analysis capabilities</p>
                <p>• Performance optimization insights</p>
              </div>
            )}
          </div>
        </div>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-yellow-900/20 border border-yellow-600' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
            <strong>Next Steps:</strong> This feature is available across all prediction components. 
            Try it out in the Enhanced BBBP component or any other prediction tool to see it in action.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold ${getTextClasses(isDarkMode, 'primary')}`}>
              Enhanced Features Demo
            </h1>
            <button
              onClick={() => setSelectedDemo('overview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDemo === 'overview'
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Overview
            </button>
          </div>
        </div>

        {selectedDemo === 'overview' ? renderOverview() : renderFeatureDetails()}
      </div>
    </div>
  );
};

export default EnhancedFeaturesDemo;
