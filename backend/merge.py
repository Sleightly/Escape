from pydub import AudioSegment
import os

help1 = AudioSegment.from_file("./help.wav")
cough1 = AudioSegment.from_file("./cough.wav")
help_size = os.path.getsize("./help.wav")
cough_size = os.path.getsize("./cough.wav")
print(help_size)
print(cough_size)

count = 0
path = 'D:/VOiCES/distant-16k/distractors/rm1'
for filename in os.listdir(path):
	size = os.path.getsize(path+'/'+filename)
	if size < cough_size:
		continue
	else:
		print(count)
		noise = AudioSegment.from_file(path+'/'+filename)
		noise = noise[:23000]
		noise = noise + 25
		noise.export("./merge_noise/merge_"+str(count)+'.wav', format='wav')
		count += 1
