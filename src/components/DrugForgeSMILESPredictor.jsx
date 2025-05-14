import React, { useState } from "react";

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontSize: '2.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '2px solid #bdc3c7',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  predictionResult: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#ecf0f1',
    borderRadius: '5px',
    fontSize: '1.1rem',
    color: '#2c3e50',
    transition: 'opacity 0.3s ease',
  },
  infoTooltip: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: '0.5rem',
    cursor: 'pointer',
  },
  tooltipText: {
    visibility: 'hidden',
    width: '200px',
    backgroundColor: '#34495e',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '6px',
    padding: '0.5rem',
    position: 'absolute',
    zIndex: 1,
    bottom: '125%',
    left: '50%',
    marginLeft: '-100px',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  spinner: {
    display: 'inline-block',
    width: '2rem',
    height: '2rem',
    verticalAlign: 'text-bottom',
    border: '0.25em solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
  },
};

const SMILESPredictor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ smiles: "" });
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    if (!formData.smiles.trim()) {
      setError("Please enter a valid SMILES string");
      return;
    }
    setError("");
    setIsLoading(true);
    const url = "http://localhost:5000/predict";
    const jsonData = JSON.stringify(formData);

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Response from backend:", response);
        setResult(response.Prediction);
        setIsLoading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the prediction.");
        setIsLoading(false);
        setShowSpan(true);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Solubility Prediction</h1>
      <form style={styles.form}>
        <div>
          <label style={styles.label}>
            <b>Enter SMILES String:</b>
            <span style={styles.infoTooltip}>
              ℹ️
              <span style={styles.tooltipText}>
                SMILES (Simplified Molecular Input Line Entry System) is a specification for describing the structure of chemical molecules using short ASCII strings.
              </span>
            </span>
          </label>
          <br />
          <input
            type="text"
            style={styles.input}
            id="smiles"
            name="smiles"
            value={formData.smiles}
            onChange={handleChange}
            placeholder="Enter SMILES string"
          />
        </div>
        <div>
          <button
            style={{
              ...styles.button,
              ...(isHovered && !isLoading ? styles.buttonHover : {}),
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            disabled={isLoading}
            onClick={!isLoading ? handlePredictClick : null}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isLoading ? "Predicting..." : "Predict Solubility"}
          </button>
        </div>
      </form>
      <br />
      {isLoading && (
        <div style={styles.spinner} />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{
        ...styles.predictionResult,
        opacity: showSpan ? 1 : 0,
      }}>
        {result ? (
          <>
            <h4>Prediction Result:</h4>
            <p>The Predicted Solubility Value is <strong>{result}</strong></p>
          </>
        ) : (
          <p>Please enter a valid SMILES string and click "Predict Solubility"</p>
        )}
      </div>
    </div>
  );
};

export default SMILESPredictor;