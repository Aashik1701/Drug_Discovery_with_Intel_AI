import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Activity, Zap, TrendingUp, Beaker, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard, { GlassPanel, GlassButton, GlassInput, GlassBadge } from './ui/GlassCard';
import { useDrugForge } from '../context/DrugForgeContext';

const GlassDashboard = () => {
  const { isDarkMode } = useDrugForge();
  const [quickPredictSmiles, setQuickPredictSmiles] = useState('');

  // Mock data
  const systemStatus = {
    apiHealth: 98,
    modelsOnline: 7,
    totalModels: 9,
    avgResponseTime: 42,
  };

  const recentActivity = [
    { id: 1, type: 'Solubility', smiles: 'CC(=O)Oc1ccccc1C(=O)O', result: -2.45, time: '2 min ago' },
    { id: 2, type: 'BBBP', smiles: 'CCO', result: 0.82, time: '5 min ago' },
    { id: 3, type: 'Toxicity', smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', result: 0.15, time: '12 min ago' },
  ];

  const quickActions = [
    { name: 'Solubility', path: '/solubility-checker', icon: Beaker, color: 'cyan' },
    { name: 'BBBP', path: '/bbbp', icon: Activity, color: 'violet' },
    { name: 'Toxicity', path: '/toxicity', icon: AlertCircle, color: 'rose' },
    { name: 'Virtual Screening', path: '/virtual-screening', icon: TrendingUp, color: 'emerald' },
  ];

  const handleQuickPredict = (e) => {
    e.preventDefault();
    if (quickPredictSmiles.trim()) {
      // Navigate to first prediction tool with SMILES pre-filled
      window.location.href = `/solubility-checker?smiles=${encodeURIComponent(quickPredictSmiles)}`;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-thin tracking-tight bg-gradient-to-r from-cyan-500 via-violet-500 to-teal-500 bg-clip-text text-transparent mb-4">
            Glass Laboratory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            AI-Powered Drug Discovery Platform
          </p>
        </motion.div>

        {/* Quick Predict - Hero Card */}
        <GlassPanel className="p-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Search className="w-12 h-12 mx-auto mb-6 text-cyan-500" />
            <h2 className="text-2xl font-light mb-8 text-gray-800 dark:text-gray-200">
              Quick Molecular Prediction
            </h2>
            <form onSubmit={handleQuickPredict} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={quickPredictSmiles}
                  onChange={(e) => setQuickPredictSmiles(e.target.value)}
                  placeholder="Enter SMILES notation (e.g., CC(=O)Oc1ccccc1C(=O)O)"
                  className="w-full h-16 px-8 rounded-full
                    bg-white/30 dark:bg-black/30
                    backdrop-blur-md
                    border border-white/30 dark:border-gray-700/30
                    text-gray-900 dark:text-gray-100 text-center
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                    transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    h-12 px-8 rounded-full
                    bg-gradient-to-r from-cyan-500 to-violet-500
                    text-white font-medium
                    hover:shadow-glow-cyan
                    transition-all duration-200"
                >
                  Predict
                </button>
              </div>
            </form>
          </motion.div>
        </GlassPanel>

        {/* System Status & Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Health - Circular Gauges */}
          <GlassCard className="p-6 col-span-1">
            <h3 className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              System Status
            </h3>
            <div className="space-y-6">
              {/* API Health Gauge */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Health</span>
                  <span className="text-lg font-semibold text-emerald-500">{systemStatus.apiHealth}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${systemStatus.apiHealth}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* Models Online */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Models Online</span>
                  <span className="text-lg font-semibold text-cyan-500">
                    {systemStatus.modelsOnline}/{systemStatus.totalModels}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(systemStatus.modelsOnline / systemStatus.totalModels) * 100}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 dark:bg-black/10">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response</span>
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {systemStatus.avgResponseTime}ms
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-6 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.name} to={action.path}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`
                      p-6 rounded-xl
                      bg-gradient-to-br from-${action.color}-500/10 to-${action.color}-500/5
                      border border-${action.color}-500/20
                      backdrop-blur-md
                      cursor-pointer
                      transition-all duration-200
                      hover:shadow-glow-${action.color === 'cyan' ? 'cyan' : 'violet'}
                    `}
                  >
                    <action.icon className={`w-8 h-8 mb-3 text-${action.color}-500`} />
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      {action.name}
                    </h4>
                  </motion.div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity - Masonry Style */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-500" />
              Recent Activity
            </h3>
            <GlassBadge variant="primary">
              {recentActivity.length} predictions
            </GlassBadge>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm
                  border border-white/10 dark:border-gray-700/10
                  hover:bg-white/20 dark:hover:bg-black/20
                  transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <GlassBadge variant="primary">{activity.type}</GlassBadge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                    <code className="text-sm text-gray-700 dark:text-gray-300 font-mono break-all">
                      {activity.smiles}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {activity.result.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Model Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard className="p-6" hoverable>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                ADMET Properties
              </h4>
              <GlassBadge variant="success">Active</GlassBadge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Predict absorption, distribution, metabolism, excretion, and toxicity properties.
            </p>
            <div className="flex gap-2">
              <Link to="/solubility-checker" className="flex-1">
                <GlassButton variant="primary" className="w-full">
                  Solubility
                </GlassButton>
              </Link>
              <Link to="/toxicity" className="flex-1">
                <GlassButton variant="secondary" className="w-full">
                  Toxicity
                </GlassButton>
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="p-6" hoverable>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Drug Interactions
              </h4>
              <GlassBadge variant="success">Active</GlassBadge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Analyze potential drug-drug interactions and enzyme inhibition.
            </p>
            <Link to="/cyp3a4-predictor">
              <GlassButton variant="primary" className="w-full">
                CYP3A4 Prediction
              </GlassButton>
            </Link>
          </GlassCard>

          <GlassCard className="p-6" hoverable>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Target Binding
              </h4>
              <GlassBadge variant="warning">2 Simulated</GlassBadge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Predict binding affinity to specific protein targets.
            </p>
            <div className="flex gap-2">
              <Link to="/ace2" className="flex-1">
                <GlassButton variant="primary" className="w-full">
                  ACE2
                </GlassButton>
              </Link>
              <Link to="/cox2" className="flex-1">
                <GlassButton variant="secondary" className="w-full">
                  COX-2
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default GlassDashboard;
