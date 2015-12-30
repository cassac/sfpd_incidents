from flask import Flask, render_template, request, jsonify 
import json

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('map.html')

@app.route('/incidents')
def incidents():
	if request.method == 'GET':
		amount = request.args.get('amount', 10)
		incident_data = open('data.json', 'r').read().split('\n')
		incidents = [json.loads(incident) for incident in incident_data[:int(amount)]]
		return jsonify(incidents=incidents)

if __name__ == '__main__':
	app.run()