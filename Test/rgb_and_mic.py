#coding: utf-8
#clock = GPIO 20
#latch = GPIO 21
#data = GPIO 16
import RPi.GPIO as IO         # calling for header file which helps us use GPIO’s of PI
import time                   # calling for time to provide delays in program

def reset():
    i = 0
    while (i < 24):
        print("reset values")
        IO.output(16, 0)
        IO.output(20, 1)
        time.sleep(0.5)
        IO.output(20, 0)
        time.sleep(0.5)
        i = i + 1
    submit()
    IO.output(16, 0)
    IO.output(20, 0)
    IO.output(21, 0)
    time.sleep(0.5)

def add1():
    print("adding a one!")
    IO.output(16,1)  
    time.sleep(0.5)
    IO.output(20, 1)
    time.sleep(0.5)
    IO.output(20, 0)
    time.sleep(0.5)

def add0():
    print("adding a zero")
    IO.output(16,0)  
    time.sleep(0.5)
    IO.output(20, 1)
    time.sleep(0.5)
    IO.output(20, 0)
    time.sleep(0.5)

def submit();
    IO.output(21, 1)
    print("latch is high")
    time.sleep(0.5)
    IO.output(21, 0)
    print("latch is low")
    time.sleep(0.5)

def red():
    add0()
    add0()
    add1()

def green():
    add0()
    add1()
    add0()

def blue():
    add1()
    add0()
    add0()

def off():
    add0()
    add0()
    add0()

if __name__ == "__main__":
    print("BEGINNING")            
    IO.setmode(IO.BCM)          # programming the GPIO by BCM pin numbers.
    IO.setup(20,IO.OUT)         # clock
    IO.setup(21,IO.OUT)         # latch
    IO.setup(16,IO.OUT)         # data
    
    reset()                     # reset values

    print("about to start code")# putting in one set of 24 values
    off()
    off()
    red()
    off()
    green()
    off()
    green()
    red()
    submit()
