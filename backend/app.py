import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from color_analysis import analyze_colors, process_analysis_results

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return "Color Analysis Backend is running!"

@app.route('/analyze', methods=['POST'])
def analyze():
    print("Analyze endpoint hit")
    if 'images' not in request.files:
        print("No images provided")
        return jsonify({"error": "No images provided"}), 400

    images = request.files.getlist('images')
    print(f"Received {len(images)} images")
    image_data = [img.read() for img in images]

    print("Analyzing images")
    try:
        raw_results = analyze_colors(image_data)
        print("Raw results:", raw_results)
        # We're not processing the results anymore, just returning the raw string
        return jsonify({"results": raw_results})
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/test_analyze', methods=['GET'])
def test_analyze():
    image_folder = os.path.join(app.root_path, 'test_images')
    if not os.path.exists(image_folder):
        return jsonify({"error": f"Test images folder not found: {image_folder}"}), 404
    
    image_files = [f for f in os.listdir(image_folder) if f.endswith('.jpg')]
    if not image_files:
        return jsonify({"error": "No .jpg images found in the test images folder"}), 404
    
    image_data = []
    for image_file in image_files:
        with open(os.path.join(image_folder, image_file), 'rb') as img_file:
            image_data.append(img_file.read())

    raw_results = analyze_colors(image_data)
    processed_results = process_analysis_results(raw_results)

    return jsonify(processed_results)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting application on port {port}")
    print(f"OPENAI_API_KEY: {'Set' if os.getenv('OPENAI_API_KEY') else 'Not set'}")
    app.run(debug=True, host='0.0.0.0', port=port)