import React, { useState, useCallback } from 'react';
import { Plus, Play, Save, Trash2, Settings, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';
import MolecularVisualization from './MolecularVisualization';

/**
 * Advanced Workflow Builder for creating prediction pipelines
 * Allows users to chain multiple predictions and create custom workflows
 */
const WorkflowBuilder = () => {
  const { isDarkMode } = useDrugForge();
  
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [testSmiles, setTestSmiles] = useState('CC(=O)OC1=CC=CC=C1C(=O)O');
  const [executionResults, setExecutionResults] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const availableSteps = [
    { 
      id: 'bbbp', 
      name: 'BBBP Prediction', 
      description: 'Blood-brain barrier permeability',
      category: 'ADMET',
      requiredInputs: ['smiles'],
      outputs: ['bbbp_class', 'bbbp_probability']
    },
    { 
      id: 'cyp3a4', 
      name: 'CYP3A4 Inhibition', 
      description: 'Cytochrome P450 3A4 inhibition',
      category: 'ADMET',
      requiredInputs: ['smiles'],
      outputs: ['cyp3a4_class', 'cyp3a4_probability']
    },
    { 
      id: 'toxicity', 
      name: 'Toxicity Assessment', 
      description: 'General toxicity prediction',
      category: 'Safety',
      requiredInputs: ['smiles'],
      outputs: ['toxicity_score', 'toxicity_class']
    },
    { 
      id: 'binding-score', 
      name: 'Binding Score', 
      description: 'Protein-ligand binding affinity',
      category: 'Efficacy',
      requiredInputs: ['smiles', 'target'],
      outputs: ['binding_score', 'affinity']
    },
    { 
      id: 'lipinski', 
      name: 'Lipinski Analysis', 
      description: 'Drug-likeness assessment',
      category: 'Properties',
      requiredInputs: ['smiles'],
      outputs: ['mw', 'logp', 'hbd', 'hba', 'lipinski_violations']
    },
    { 
      id: 'qed', 
      name: 'QED Score', 
      description: 'Quantitative Estimate of Drug-likeness',
      category: 'Properties',
      requiredInputs: ['smiles'],
      outputs: ['qed_score']
    }
  ];

  const createNewWorkflow = () => {
    if (!newWorkflowName.trim()) return;

    const newWorkflow = {
      id: Date.now(),
      name: newWorkflowName,
      description: '',
      steps: [],
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
    setNewWorkflowName('');
    setIsCreating(false);
  };

  const addStepToWorkflow = (stepType) => {
    if (!selectedWorkflow) return;

    const stepTemplate = availableSteps.find(s => s.id === stepType);
    const newStep = {
      id: Date.now(),
      type: stepType,
      name: stepTemplate.name,
      description: stepTemplate.description,
      category: stepTemplate.category,
      config: {},
      conditions: [],
      isExpanded: true
    };

    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: [...selectedWorkflow.steps, newStep],
      lastModified: new Date().toISOString()
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w));
  };

  const removeStep = (stepId) => {
    if (!selectedWorkflow) return;

    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: selectedWorkflow.steps.filter(s => s.id !== stepId),
      lastModified: new Date().toISOString()
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w));
  };

  const toggleStepExpansion = (stepId) => {
    if (!selectedWorkflow) return;

    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: selectedWorkflow.steps.map(step => 
        step.id === stepId ? { ...step, isExpanded: !step.isExpanded } : step
      ),
      lastModified: new Date().toISOString()
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w));
  };

  const executeWorkflow = async () => {
    if (!selectedWorkflow || !testSmiles) return;

    setIsExecuting(true);
    setExecutionResults(null);

    const results = {
      workflowId: selectedWorkflow.id,
      input: { smiles: testSmiles },
      steps: [],
      startTime: new Date().toISOString(),
      status: 'running'
    };

    try {
      for (const step of selectedWorkflow.steps) {
        const stepResult = {
          stepId: step.id,
          stepName: step.name,
          startTime: new Date().toISOString(),
          status: 'running'
        };

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate prediction result
        const mockResult = generateMockPrediction(step.type);
        
        stepResult.endTime = new Date().toISOString();
        stepResult.status = 'completed';
        stepResult.result = mockResult;
        stepResult.duration = Math.random() * 2000 + 500;

        results.steps.push(stepResult);
        setExecutionResults({ ...results });
      }

      results.endTime = new Date().toISOString();
      results.status = 'completed';
      results.totalDuration = results.steps.reduce((sum, step) => sum + step.duration, 0);

    } catch (error) {
      results.status = 'failed';
      results.error = error.message;
    } finally {
      setIsExecuting(false);
      setExecutionResults(results);
    }
  };

  const generateMockPrediction = (stepType) => {
    switch (stepType) {
      case 'bbbp':
        return {
          prediction: Math.random() > 0.5 ? 1 : 0,
          probability: Math.random(),
          confidence: Math.random()
        };
      case 'cyp3a4':
        return {
          prediction: Math.random() > 0.6 ? 1 : 0,
          probability: Math.random(),
          confidence: Math.random()
        };
      case 'toxicity':
        return {
          toxicity_score: Math.random(),
          prediction: Math.random() > 0.7 ? 1 : 0,
          confidence: Math.random()
        };
      case 'binding-score':
        return {
          binding_score: 5 + Math.random() * 5,
          affinity: Math.random() * 100,
          confidence: Math.random()
        };
      case 'lipinski':
        return {
          molecular_weight: 180 + Math.random() * 320,
          logp: Math.random() * 6 - 1,
          hbd: Math.floor(Math.random() * 6),
          hba: Math.floor(Math.random() * 11),
          violations: Math.floor(Math.random() * 3)
        };
      case 'qed':
        return {
          qed_score: Math.random(),
          weighted_score: Math.random()
        };
      default:
        return { prediction: Math.random() };
    }
  };

  const exportWorkflow = () => {
    if (!selectedWorkflow) return;

    const exportData = {
      ...selectedWorkflow,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `workflow_${selectedWorkflow.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StepCard = ({ step, index }) => (
    <div className={`border rounded-lg ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
            step.category === 'ADMET' ? 'bg-blue-500' :
            step.category === 'Safety' ? 'bg-red-500' :
            step.category === 'Efficacy' ? 'bg-green-500' :
            'bg-purple-500'
          }`}>
            {index + 1}
          </div>
          <div className="ml-3">
            <h4 className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
              {step.name}
            </h4>
            <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
              {step.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleStepExpansion(step.id)}
            className={`p-1 rounded transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {step.isExpanded ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </button>
          <button
            onClick={() => removeStep(step.id)}
            className={`p-1 rounded transition-colors text-red-500 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {step.isExpanded && (
        <div className={`px-4 pb-4 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="mt-3">
            <p className={`text-sm mb-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
              Category: <span className="font-medium">{step.category}</span>
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`font-medium mb-1 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Required Inputs:
                </p>
                <ul className={`list-disc list-inside ${getTextClasses(isDarkMode, 'secondary')}`}>
                  {availableSteps.find(s => s.id === step.type)?.requiredInputs.map(input => (
                    <li key={input}>{input}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className={`font-medium mb-1 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Outputs:
                </p>
                <ul className={`list-disc list-inside ${getTextClasses(isDarkMode, 'secondary')}`}>
                  {availableSteps.find(s => s.id === step.type)?.outputs.map(output => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
            Workflow Builder
          </h1>
          <p className={`text-lg ${getTextClasses(isDarkMode, 'secondary')}`}>
            Create custom prediction pipelines by chaining multiple analysis steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Workflow List */}
          <div className={`lg:col-span-1 p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                Workflows
              </h2>
              <button
                onClick={() => setIsCreating(true)}
                className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                title="Create new workflow"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {isCreating && (
              <div className="mb-4 p-3 border rounded-md border-blue-300 bg-blue-50 dark:bg-blue-900/20">
                <input
                  type="text"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                  placeholder="Workflow name"
                  className={`w-full p-2 border rounded mb-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && createNewWorkflow()}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createNewWorkflow}
                    className="flex-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {workflows.map(workflow => (
                <button
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedWorkflow?.id === workflow.id
                      ? isDarkMode ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-50 border-blue-300'
                      : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } border`}
                >
                  <div className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                    {workflow.name}
                  </div>
                  <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                    {workflow.steps.length} steps
                  </div>
                </button>
              ))}
              
              {workflows.length === 0 && (
                <p className={`text-center text-sm py-4 ${getTextClasses(isDarkMode, 'muted')}`}>
                  No workflows created yet
                </p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {selectedWorkflow ? (
              <>
                {/* Workflow Header */}
                <div className={`p-6 rounded-lg border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold ${getTextClasses(isDarkMode, 'primary')}`}>
                        {selectedWorkflow.name}
                      </h2>
                      <p className={`${getTextClasses(isDarkMode, 'secondary')}`}>
                        {selectedWorkflow.steps.length} steps configured
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={exportWorkflow}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Export
                      </button>
                    </div>
                  </div>

                  {/* Test Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                        Test SMILES
                      </label>
                      <input
                        type="text"
                        value={testSmiles}
                        onChange={(e) => setTestSmiles(e.target.value)}
                        placeholder="Enter SMILES for testing"
                        className={`w-full p-2 border rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        onClick={executeWorkflow}
                        disabled={isExecuting || !testSmiles || selectedWorkflow.steps.length === 0}
                        className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-semibold transition-colors ${
                          isExecuting || !testSmiles || selectedWorkflow.steps.length === 0
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {isExecuting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Execute Workflow
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add Steps */}
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Add Steps
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableSteps.map(step => (
                      <button
                        key={step.id}
                        onClick={() => addStepToWorkflow(step.id)}
                        className={`p-3 text-left border rounded-md transition-colors ${
                          isDarkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`font-medium text-sm ${getTextClasses(isDarkMode, 'primary')}`}>
                          {step.name}
                        </div>
                        <div className={`text-xs ${getTextClasses(isDarkMode, 'secondary')}`}>
                          {step.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workflow Steps */}
                {selectedWorkflow.steps.length > 0 && (
                  <div className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                      Workflow Steps
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedWorkflow.steps.map((step, index) => (
                        <StepCard key={step.id} step={step} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Execution Results */}
                {executionResults && (
                  <div className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                      Execution Results
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-3">
                          {executionResults.steps.map((stepResult, index) => (
                            <div
                              key={stepResult.stepId}
                              className={`p-3 rounded border ${
                                stepResult.status === 'completed' 
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                  : stepResult.status === 'failed'
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                  : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{stepResult.stepName}</span>
                                <span className={`text-sm px-2 py-1 rounded ${
                                  stepResult.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  stepResult.status === 'failed' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {stepResult.status}
                                </span>
                              </div>
                              
                              {stepResult.result && (
                                <div className="text-sm">
                                  <pre className="whitespace-pre-wrap">
                                    {JSON.stringify(stepResult.result, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <MolecularVisualization
                          smiles={testSmiles}
                          title="Test Molecule"
                          showControls={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className={`p-12 text-center rounded-lg border-2 border-dashed ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <Settings className={`h-16 w-16 mx-auto mb-4 ${getTextClasses(isDarkMode, 'muted')}`} />
                <h3 className={`text-xl font-semibold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  No Workflow Selected
                </h3>
                <p className={`mb-6 ${getTextClasses(isDarkMode, 'secondary')}`}>
                  Create a new workflow or select an existing one from the sidebar to get started
                </p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Your First Workflow
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
