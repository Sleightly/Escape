import librosa
import os
import numpy as np
from sklearn.preprocessing import LabelEncoder
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras.optimizers import Adam
from keras.utils import np_utils
from sklearn import metrics

help_path = './help_merge_noise'
cough_path = './cough_merge_noise'
noise_path = './noise_merge_noise'
val_path = './validate'

train = []
val = []

def parser(filename, label):
    print(filename)
    # handle exception to check if there isn't a file which is corrupted
    try:
        # here kaiser_fast is a technique used for faster extraction
        X, sample_rate = librosa.load(filename, res_type='kaiser_fast')
        # we extract mfcc feature from data
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T,axis=0)
    except Exception as e:
        print("Error encountered while parsing file: ", filename)
        return None, None

    feature = mfccs

    return [feature, label]

for filename in os.listdir(help_path):
	train.append(parser(help_path+'/'+filename, 0))
print()
for filename in os.listdir(cough_path):
	train.append(parser(cough_path+'/'+filename, 1))
print()
for filename in os.listdir(noise_path):
	train.append(parser(noise_path+'/'+filename, 2))
print()
for filename in os.listdir(val_path):
	label = 0
	if "cough" in filename:
		label = 1
	if "noise" in filename:
		label = 2
	val.append(parser(val_path+'/'+filename, label))
print()

features = [l[0] for l in train]
labels = [l[1] for l in train]

val_x = np.array([l[0] for l in val])
val_y = np.array([l[1] for l in val])

X = np.array(features)
y = np.array(labels)

lb = LabelEncoder()

y = np_utils.to_categorical(lb.fit_transform(y))
val_y = np_utils.to_categorical(lb.fit_transform(val_y))

num_labels = y.shape[1]
filter_size = 2

# build model
model = Sequential()

model.add(Dense(256, input_shape=(40,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(256))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(num_labels))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer='adam')

model.fit(X, y, batch_size=32, epochs=100, validation_data=(val_x, val_y))
