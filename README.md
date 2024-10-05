# DrugForge: AI-Driven Drug Discovery Platform

DrugForge is an AI-powered platform designed to revolutionize drug discovery by leveraging machine learning models and computational simulations. The platform accelerates the identification of potential drug candidates, predicting key properties and ensuring safety, efficacy, and rapid development.

## Table of Contents:

Features

Installation

Usage

Contributing

License

### Features;


1]CYP P450 3A4 Inhibition Prediction: Evaluates drug-drug interaction risks by predicting how compounds affect the CYP3A4 enzyme.

2]Half-Life Prediction: Predicts the excretion rate of a compound, informing dosing regimens.

3]hERG Toxicity Prediction: Screens compounds for potential cardiotoxicity by predicting their interaction with hERG potassium ion channels.

4]Solubility Prediction: Determines the solubility of compounds, which is crucial for bioavailability.

5]Blood-Brain Barrier (BBB) Permeability Prediction: Assesses whether a compound can cross the BBB, critical for drugs targeting the central nervous system.

6]Target Activity Prediction: Provides insights into how compounds interact with biological targets like enzymes or receptors.

7]Molecular Docking: Simulates drug-target interactions, predicting binding affinity and optimizing molecular structures.

8]Polypharmacology Prediction: Identifies multi-target interactions and repurposing potential of drug candidates.


![WhatsApp Image 2024-10-05 at 10 29 59_83fa4f78](https://github.com/user-attachments/assets/0554fe80-10da-4b63-91f1-e257b9a96885)

### Installation;

Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/DrugForge.git
cd DrugForge
Create Virtual Environment (Optional):

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Application:

bash
Copy code
python app.py


### Usage
Upload Molecular Data: Users can upload molecular structures in SMILES or PDB format.

Select a Feature: Choose from various prediction features like CYP3A4 Inhibition, Solubility, or hERG Toxicity.

Visualize Results: The results, such as drug-target interaction scores and toxicity predictions, are displayed in an easy-to-understand interface.
Contributing


We welcome contributions to DrugForge! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Make changes and commit them (git commit -m 'Add new feature').

Push to your branch (git push origin feature-branch).

Open a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for more information.
