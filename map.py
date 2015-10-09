from flask import Flask, render_template, request, jsonify 
import json

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('map.html')

@app.route('/incidents')
def incidents():
	if request.method == 'GET':
		incident_data = open('data.json', 'r').readlines(50)
		incidents = [json.loads(incident) for incident in incident_data]
		return jsonify(incidents=incidents)

if __name__ == '__main__':
	app.run(debug=True)