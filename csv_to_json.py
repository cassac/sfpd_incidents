"""
Converts CSV file into JSON file. Assumes first row are
headers and subsequent rows contain corresponding data.

Run in terminal:
python csv_to_json.py [existing filename].csv [new filename].json
"""

import csv
import json
import sys

def convert_csv(csv_file, json_filename):
	fieldnames = tuple([name.rstrip() for name in csv_file.readline().split(',')])
	jsonfile = open(json_filename, 'w')
	reader = csv.DictReader(csv_file, fieldnames)
	for row in reader:
	    json.dump(row, jsonfile)
	    jsonfile.write('\n')

def main():
	print 'Program started...'
	csv_file = open(sys.argv[1])
	json_filename = sys.argv[2]
	convert_csv(csv_file, json_filename)
	print 'Program finished.'

if __name__ == '__main__':	
	main()