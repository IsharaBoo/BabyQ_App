import numpy as np
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS


# Flask API setup
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

# Load the trained model
model = joblib.load(r"C:\Users\pc\Desktop\New folder\allergy_model.pkl")
@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Allergy Prediction API!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()  # Get data from the request body
        symptoms = [data["sneezing"], data["runny_nose"], data["itchy_eyes"], data["skin_rash"]]
        symptoms_array = np.array([symptoms])  # Convert to numpy array for prediction
        prediction = model.predict(symptoms_array)[0]  # Predict using the model
        result = "Allergy Detected" if prediction == 1 else "No Allergy"
        return jsonify({"prediction": result})  # Return the prediction as a JSON response
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)



















# from flask import Flask, request, jsonify
# import pandas as pd
# import pickle
# from flask_cors import CORS

# # Load the trained model and preprocessing tools once at the start
# with open("allergy_model.pkl", "rb") as model_file:
#     model = pickle.load(model_file)

# with open("encoders.pkl", "rb") as encoder_file:
#     label_encoders = pickle.load(encoder_file)

# with open("imputer.pkl", "rb") as imputer_file:
#     imputer = pickle.load(imputer_file)

# # Flask App
# app = Flask(__name__)
# CORS(app)  # Enable CORS for React Native communication

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json  # Get input from React Native app

#         # Expected column names
#         columns = ["GENDER_FACTOR", "RACE_FACTOR", "ETHNICITY_FACTOR", "ATOPIC_MARCH_COHORT",
#                    "ATOPIC_DERM_START", "ALLERGIC_RHINITIS_START", "ASTHMA_START"]

#         # Convert input into DataFrame
#         input_data = pd.DataFrame([data], columns=columns)

#         # Encode categorical values
#         for col in ['GENDER_FACTOR', 'RACE_FACTOR', 'ETHNICITY_FACTOR']:
#             input_data[col] = label_encoders[col].transform([data[col]])

#         # Handle missing values
#         input_data = imputer.transform(input_data)
#         input_data_df = pd.DataFrame(input_data, columns=columns)

#         # Make predictions
#         prediction = model.predict(input_data_df)

#         # Convert prediction results to allergy names
#         target_labels = ['SHELLFISH_ALG_START', 'FISH_ALG_START', 'MILK_ALG_START', 'SOY_ALG_START',
#                          'EGG_ALG_START', 'WHEAT_ALG_START', 'PEANUT_ALG_START', 'SESAME_ALG_START']
#         predicted_allergies = [target_labels[i] for i, val in enumerate(prediction[0]) if val == 1]

#         return jsonify({"predictions": predicted_allergies})

#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == "__main__":
#     app.run(debug=True)































# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import pandas as pd

# app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests

# # Load the trained model and label encoders
# try:
#     model = joblib.load("allergy_model.pkl")
#     label_encoders = joblib.load("label_encoders.pkl")
# except FileNotFoundError as e:
#     print(f"Error loading model files: {e}")
#     exit(1)

# # Optional: Mapping for user-friendly input
# # Update these mappings based on your actual label_encoders.classes_ values
# INPUT_MAPPINGS = {
#     "GENDER_FACTOR": {"Male": "S0 - Male", "Female": "S1 - Female"},
#     "RACE_FACTOR": {"White": "White", "Black": "Black"},  # Replace with actual encoded values
#     "ETHNICITY_FACTOR": {"Non-Hispanic": "Non-Hispanic", "Hispanic": "Hispanic"},  # Replace
#     "PAYER_FACTOR": {"Private": "Private", "Public": "Public"}  # Replace
# }

# # Root endpoint for basic connectivity test
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "Welcome to the Allergy Prediction API!"})

# # Prediction endpoint
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         if not data:
#             return jsonify({"error": "No input data provided"}), 400

#         # Required features
#         required_features = ["BIRTH_YEAR", "GENDER_FACTOR", "RACE_FACTOR", 
#                            "ETHNICITY_FACTOR", "PAYER_FACTOR"]
        
#         # Check for missing features
#         missing_features = [feat for feat in required_features if feat not in data or data[feat] is None]
#         if missing_features:
#             return jsonify({"error": f"Missing required features: {missing_features}"}), 400

#         # Validate BIRTH_YEAR
#         try:
#             birth_year = int(data["BIRTH_YEAR"])
#             if birth_year < 1900 or birth_year > 2025:
#                 return jsonify({"error": "BIRTH_YEAR must be between 1900 and 2025"}), 400
#             data["BIRTH_YEAR"] = birth_year
#         except (ValueError, TypeError):
#             return jsonify({"error": "BIRTH_YEAR must be a number"}), 400

#         # Process categorical inputs
#         processed_data = data.copy()
#         for col in label_encoders:
#             if col in processed_data:
#                 # Apply user-friendly mapping if available
#                 if col in INPUT_MAPPINGS and processed_data[col] in INPUT_MAPPINGS[col]:
#                     processed_data[col] = INPUT_MAPPINGS[col][processed_data[col]]
                
#                 # Encode the value
#                 try:
#                     if processed_data[col] not in label_encoders[col].classes_:
#                         valid_values = list(label_encoders[col].classes_)
#                         return jsonify({"error": f"Invalid value for {col}. Must be one of: {valid_values}"}), 400
#                     processed_data[col] = label_encoders[col].transform([processed_data[col]])[0]
#                 except Exception as e:
#                     valid_values = list(label_encoders[col].classes_)
#                     return jsonify({"error": f"Error encoding {col}: {str(e)}. Must be one of: {valid_values}"}), 400

#         # Convert input into a DataFrame
#         X_new = pd.DataFrame([processed_data], columns=required_features)

#         # Make predictions
#         prediction = model.predict(X_new)[0]

#         # Allergy labels
#         allergy_labels = ["Shellfish Allergy", "Fish Allergy", "Milk Allergy", "Soy Allergy",
#                          "Egg Allergy", "Wheat Allergy", "Peanut Allergy", "Sesame Allergy"]

#         result = {allergy: bool(pred) for allergy, pred in zip(allergy_labels, prediction)}

#         return jsonify(result)

#     except Exception as e:
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# # Debug endpoint to list valid categories
# @app.route("/categories", methods=["GET"])
# def get_categories():
#     categories = {col: list(enc.classes_) for col, enc in label_encoders.items()}
#     return jsonify(categories)

# if __name__ == "__main__":
#     # Run on port 5000, or change to 5001 if 5000 is in use
#     app.run(host="0.0.0.0", port=5000, debug=True)