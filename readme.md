SFPD Incidents' locations mapped with icons

Built with Flask, Google Maps and Javascript

Data from https://data.sfgov.org/Public-Safety/SFPD-Incidents-from-1-January-2003/tmnf-yvry

Make sure Flask is installed in your virtual environment ```pip install Flask```

1) Convert CSV file to JSON file via ```csv_to_json.py``` (A JSON formatted file can be downloaded from above website. I chose to download the CSV version and write this script to convert to JSON format).

2) Run ```python map.py```. To display all incidents or to limit the number of incidents displayed either leave the ```readlines()``` method blank or insert the number of lines to be read from file, ie. ```readlines(50)```. If too many incidents are mapped in one location the icons are replaced by Maps' default color coded circles.


*Disclaimer: Some of the icons used are a little distasteful.

