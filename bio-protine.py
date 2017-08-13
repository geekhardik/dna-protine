import mmap, os
from flask import Flask
from flask import request
app = Flask(__name__)
path = "./protein-codes"
library = os.listdir(path)
dna_seq = "gg"
for protein in library:
	file = os.path.join(path,protein)
	f = open(file)
	s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
	if s.find(dna_seq) != -1:
		print str(s.find(dna_seq)+1)
	else:
		print "No matching protein subsequence found!"







# @app.route('/', methods=['GET', 'POST'])
# def get_ans():
# 	if request.method == "POST":
# 		obj = request.get_json()
# 		dna_seq = obj['dna_seq'];
# 		f = open("NC_000852.txt")
# 		s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
# 		if s.find(dna_seq) != -1:
# 			return str(s.find(dna_seq)+1)
# 		else:
# 			return "No matching protein subsequence found!"
		


# if __name__ == '__main__':
# 	app.run()

