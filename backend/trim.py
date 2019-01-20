from pydub import AudioSegment
import os

help1 = AudioSegment.from_file("./help.wav")
cough1 = AudioSegment.from_file("./cough.wav")
help_size = os.path.getsize("./help.wav")
cough_size = os.path.getsize("./cough.wav")
print(help_size)
print(cough_size)

count = 0
path = './merge_cough'
for filename in os.listdir(path):
	noise = AudioSegment.from_file(path+'/'+filename)
	noise = noise[:23000]
	noise.export(path+"/merge_"+str(count)+'.wav', format='wav')
	count += 1