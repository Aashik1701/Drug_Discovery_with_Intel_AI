import React, { useState, useEffect } from "react";
import { useMolecule, useApi } from "../hooks";
import { useDrugForge } from "../context/DrugForgeContext";
import ErrorBoundary from "./ErrorBoundary";
import { AlertCircle, CheckCircle, Loader2, Info, DownloadCloud } from "lucide-react";

const VirtualScreening = () => {
  // Use custom hooks
  const { smiles, setSmiles, isValidSmiles, submitSmiles } = useMolecule();
  const { get, loading } = useApi();
  const { state, addFavorite } = useDrugForge();
  
  // Component state
  const [targetProtein, setTargetProtein] = useState("");
  const [screeningResults, setScreeningResults] = useState(null);
  const [availableTargets, setAvailableTargets] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileSmiles, setFileSmiles] = useState([]);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("single");

  // Fetch available target proteins when component mounts
  useEffect(() => {
    const fetchTargets = async () => {
      try {
        // In a real app, this would come from an API endpoint
        // For now, we'll hardcode some common drug targets
        setAvailableTargets([
          { id: "ace2", name: "ACE2", description: "Angiotensin-Converting Enzyme 2" },
          { id: "cox2", name: "COX-2", description: "Cyclooxygenase-2" },
          { id: "drd2", name: "DRD2", description: "Dopamine Receptor D2" },
          { id: "cyp3a4", name: "CYP3A4", description: "Cytochrome P450 3A4" },
          { id: "hepg2", name: "HEPG2", description: "Human Liver Cancer Cell Line" },
        ]);
      } catch (error) {
        console.error("Failed to load target proteins:", error);
      }
    };

    fetchTargets();
  }, [get]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!targetProtein) {
      return;
    }

    try {
      // In a real app, this would submit to a real endpoint
      const results = await submitSmiles("/virtual-screening", {
        target: targetProtein,
        exhaustiveness: state.apiSettings.exhaustiveness || 8,
        useFastMode: state.apiSettings.useFastMode || false,
      });
      
      // Simulate results for demo purposes
      if (results) {
        setScreeningResults({
          target: targetProtein,
          compounds: [
            { 
              smiles: smiles,
              bindingAffinity: -9.3 + Math.random() * 2,
              interactionSites: ["GLU166", "HIS41", "CYS145"],
              probability: 0.87 + Math.random() * 0.1,
            }
          ],
          date: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Virtual screening error:", error);
    }
  };

  const handleBatchUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    
    // Read file with SMILES strings (one per line)
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split("\n").filter(line => line.trim());
      setFileSmiles(lines);
      setUploadingFile(false);
    };
    
    reader.onerror = () => {
      setUploadingFile(false);
    };
    
    reader.readAsText(file);
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    
    if (!targetProtein || fileSmiles.length === 0) {
      return;
    }

    try {
      // Simulate batch processing
      // In a real app, this would submit to a batch endpoint
      setScreeningResults({
        target: targetProtein,
        compounds: fileSmiles.slice(0, 5).map(smile => ({
          smiles: smile,
          bindingAffinity: -8 - Math.random() * 3,
          interactionSites: ["GLU166", "HIS41", "CYS145", "PHE140"].slice(0, Math.floor(Math.random() * 3) + 1),
          probability: 0.7 + Math.random() * 0.25,
        })),
        date: new Date().toISOString(),
        batchSize: fileSmiles.length
      });
    } catch (error) {
      console.error("Batch virtual screening error:", error);
    }
  };

  const handleFavorite = (compound) => {
    addFavorite({
      id: Date.now(),
      type: "virtualScreening",
      target: targetProtein,
      smiles: compound.smiles,
      bindingAffinity: compound.bindingAffinity,
      date: new Date().toISOString()
    });
  };

  return (
    <ErrorBoundary>
      <div className="max-w-6xl mx-auto mt-16 mb-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Virtual Screening
                </h1>
                <p className="mt-1 text-blue-100">
                  Predict binding affinity of compounds to target proteins
                </p>
              </div>
              <button 
                onClick={() => setInfoPanelOpen(!infoPanelOpen)}
                className="mt-4 md:mt-0 inline-flex items-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Info className="mr-2 h-4 w-4" />
                How it works
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  selectedTab === "single"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTab("single")}
              >
                Single Molecule
              </button>
              <button
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  selectedTab === "batch"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTab("batch")}
              >
                Batch Processing
              </button>
            </nav>
          </div>

          {/* Info Panel */}
          {infoPanelOpen && (
            <div className="bg-blue-50 p-4 border-b border-blue-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">How Virtual Screening Works</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Virtual screening uses computational methods to identify potentially bioactive compounds against specific target proteins:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Enter a SMILES string or upload a file with multiple compounds</li>
                      <li>Select a target protein of interest</li>
                      <li>Our AI models predict binding affinity and interaction sites</li>
                      <li>Results can be saved or downloaded for further analysis</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-white hover:bg-blue-50 focus:outline-none"
                      onClick={() => setInfoPanelOpen(false)}
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {/* Single Molecule Form */}
            {selectedTab === "single" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="smiles" className="block text-sm font-medium text-gray-700">
                    SMILES String
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="smiles"
                      value={smiles}
                      onChange={(e) => setSmiles(e.target.value)}
                      className={`block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md ${
                        !isValidSmiles && smiles ? "border-red-300" : ""
                      }`}
                      placeholder="Example: CC(=O)OC1=CC=CC=C1C(=O)O"
                    />
                    {!isValidSmiles && smiles && (
                      <p className="mt-1 text-sm text-red-600">
                        Invalid SMILES string format
                      </p>
                    )}
                  </div>
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">
                      Enter the SMILES notation of the compound you want to screen
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                    Target Protein
                  </label>
                  <select
                    id="target"
                    value={targetProtein}
                    onChange={(e) => setTargetProtein(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a target protein</option>
                    {availableTargets.map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.name}: {target.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading || !isValidSmiles || !smiles || !targetProtein}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      loading || !isValidSmiles || !smiles || !targetProtein
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      "Screen Compound"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Batch Processing Form */}
            {selectedTab === "batch" && (
              <form onSubmit={handleBatchSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload SMILES File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <DownloadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".txt,.csv"
                            className="sr-only"
                            onChange={handleBatchUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        .txt or .csv with one SMILES per line
                      </p>
                    </div>
                  </div>
                  {fileSmiles.length > 0 && (
                    <div className="mt-2 text-sm text-gray-700">
                      {fileSmiles.length} compounds loaded
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="target-batch" className="block text-sm font-medium text-gray-700">
                    Target Protein
                  </label>
                  <select
                    id="target-batch"
                    value={targetProtein}
                    onChange={(e) => setTargetProtein(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a target protein</option>
                    {availableTargets.map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.name}: {target.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading || uploadingFile || fileSmiles.length === 0 || !targetProtein}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      loading || uploadingFile || fileSmiles.length === 0 || !targetProtein
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Processing Batch...
                      </>
                    ) : uploadingFile ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Uploading...
                      </>
                    ) : (
                      "Run Batch Screening"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Results Section */}
            {screeningResults && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Screening Results
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Target: {availableTargets.find(t => t.id === screeningResults.target)?.name || screeningResults.target}
                </p>
                
                <div className="mt-5 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    {screeningResults.compounds.map((compound, index) => (
                      <div key={index} className="py-4 space-y-1 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Compound {index + 1}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex flex-wrap gap-y-2 gap-x-4">
                              <div className="flex-1 min-w-[200px]">
                                <p className="text-xs font-medium text-gray-500">SMILES</p>
                                <p className="font-mono text-xs">{compound.smiles}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Binding Affinity</p>
                                <p className={`font-medium ${compound.bindingAffinity < -8.5 ? 'text-green-600' : compound.bindingAffinity < -7 ? 'text-blue-600' : 'text-yellow-600'}`}>
                                  {compound.bindingAffinity.toFixed(1)} kcal/mol
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Probability</p>
                                <p className="font-medium">{(compound.probability * 100).toFixed(1)}%</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500">Interaction Sites</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {compound.interactionSites.map((site) => (
                                  <span
                                    key={site}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {site}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button
                                onClick={() => handleFavorite(compound)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save to Favorites
                              </button>
                            </div>
                          </div>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default VirtualScreening;