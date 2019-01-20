import mraa
import time
print (mraa.getVersion())

red = mraa.Gpio(30)
red.dir(mraa.DIR_OUT)
red.write(0)

green = mraa.Gpio(32)
green.dir(mraa.DIR_OUT)
green.write(0)

blue = mraa.Gpio(34)
blue.dir(mraa.DIR_OUT)
blue.write(0)

#Changes to each color every 5 seconds
while True:
    red.write(1)
    time.sleep(5)
    red.write(0)
    green.write(1)
    time.sleep(5)
    green.write(0)
    blue.write(1)
    time.sleep(5)
    blue.write(0)

#Microphone. LED turns red when something is detected
'''
mic = mraa.Gpio()
mic.dir(mraa.DIR_IN)

while True:
    if int(mic.read()):
        red.write(1)
    else
        red.write(0)
'''
