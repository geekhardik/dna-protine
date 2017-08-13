import mmap, os, json
from flask import Flask,jsonify
from flask import request
app = Flask(__name__)
path = "./protein-codes"
library = os.listdir(path)


# dna_seq = "gg"
# res = ""
# result = {}
# for protein in library:
# 	file = os.path.join(path,protein)
# 	f = open(file)
# 	s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
# 	if s.find(dna_seq) != -1:
# 		# print protein, str(s.find(dna_seq)+1)
# 		res += "Found in "+protein+" at position -> "+str(s.find(dna_seq)+1)+"\n"
# 		# result	= {
# 		# 	'protein' : protein,
# 		# 	'index' : s.find(dna_seq)+1
# 		# }
# 		result[protein] = s.find(dna_seq)+1
# 		results = json.dumps(result)

# 	# else:
# 	# 	print "No matching protein subsequence found!"

# # print res
# print results






@app.route('/', methods=['GET', 'POST'])
def get_ans():
	if request.method == "POST":
		obj = request.get_json()
		dna_seq = obj['dna_seq'];
		result = {}
		for protein in library:
			file = os.path.join(path,protein)
			f = open(file)
			s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
			if s.find(dna_seq) != -1:
				# res += "\nFound in "+protein+" at position -> "+str(s.find(dna_seq)+1)+"\n"
				result[protein] = s.find(dna_seq)+1
				results = json.dumps(result)

		if(results == {}):
			result['none'] = "No matching protein subsequence found!"
			results = json.dumps(result)
		
		return jsonify({'result': results})

if __name__ == '__main__':
	app.run()

