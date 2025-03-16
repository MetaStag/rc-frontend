import serial
import time

# Replace 'COMX' with the correct port (Windows: 'COM3', Linux/Mac: '/dev/ttyUSB0')
arduino = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # Allow time for Arduino to initialize

def send_command(command):
    arduino.write(command.encode())  # Send command
    print(f"Sent: {command}")

print("Controls: W = Forward, S = Backward, A = Left, D = Right, Q = Stop, M = Switch Mode, X = Exit")

while True:
    key = input("Enter command: ")
    key = key.upper();

    if key == "W":
        send_command('W')  # Forward
    elif key == "S":
        send_command('S')  # Backward
    elif key == "A":
        send_command('A')  # Turn Left
    elif key == "D":
        send_command('D')  # Turn Right
    elif key == "Q":
        send_command('Q')  # Stop
    elif key == "M":
      send_command('M') # Switch Mode
    elif key == "X":
        print("Exiting...")
        break
    else:
      print("Invalid command...")