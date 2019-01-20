#coding: utf-8
#clock = GPIO 38
#latch = GPIO 40
#data = GPIO 36
import RPi.GPIO as IO         # calling for header file which helps us use GPIO’s of PI
import time                             # calling for time to provide delays in program
print("BEGINNING")            
IO.setmode(IO.BCM)        # programming the GPIO by BCM pin numbers. (like PIN29 as‘GPIO5’)
IO.setup(38,IO.OUT)       # clock # initialize GPIO Pins as an output.
IO.setup(40,IO.OUT)       # latch
IO.setup(36,IO.OUT)       # data
print("finished setup")
IO.output(36, 0)
IO.output(38, 0)
IO.output(40, 0)
print("about to start code")
time.sleep(1)
IO.output(36,1)  
print("data is high")
time.sleep(1)
IO.output(38, 1)
print("clock is high")
time.sleep(1)
IO.output(38, 0)
print("clock is low")
time.sleep(1)
IO.output(40, 1)
print("latch is high")
time.sleep(1)
IO.output(36, 0)
print("data is low")
time.sleep(1)
IO.output(40, 0)
print("latch is low")
time.sleep(1)



'''
while (i < 10):                             # execute loop forever
    for y in range(12):            # loop for counting up 8 times
        IO.output(36,1)            # pull up the data pin for every bit.
        time.sleep(1)            # wait for 100ms
        IO.output(38,1)            # pull CLOCK pin high
        time.sleep(1)
        IO.output(38,0)            # pull CLOCK pin down, to send a rising edge
        time.sleep(1)
        IO.output(36,0)            # clear the DATA pin
        time.sleep(1)
        IO.output(38,1)            # pull CLOCK pin high
        time.sleep(1)
        IO.output(38,0)   
        time.sleep(1)
        IO.output(40,1) 
        time.sleep(1)
        IO.output(40,1) 
        time.sleep(1)
    i = i + 1
    console.log(i)
    #IO.output(40,1)            # pull down the SHIFT pin

    for y in range(24):            # loop for counting up 8 times
        IO.output(4,0)            # clear the DATA pin, to send 0
        time.sleep(0.1)            # wait for 100ms
        IO.output(5,1)            # pull CLOCK pin high
        time.sleep(0.1)
        IO.output(5,0)            # pull CLOCK pin down, to send a rising edge
        IO.output(4,0)            # keep the DATA bit low to keep the countdown
        IO.output(6,1)            # pull the SHIFT pin high to put the 8 bit data out parallel
        time.sleep(0.1)
        IO.output(6,0)
'''

'''import mraa
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

mic = mraa.Gpio()
mic.dir(mraa.DIR_IN)

while True:
    if int(mic.read()):
        red.write(1)
    else
        red.write(0)
'''
