'''
- sprinkle button in manual mode
- video feed from esp32
- dht11 - temperature/humidity sensor
- ir sensor
'''


import tkinter as tk
from tkinter import messagebox
import serial
import time

# ----- Setup Serial Connection -----
arduino_port = 'COM32'  # <-- Change this to your Arduino port (e.g., 'COM3' or '/dev/ttyUSB0')
baud_rate = 9600

try:
    arduino = serial.Serial(arduino_port, baud_rate, timeout=1)
    time.sleep(2)  # Allow Arduino to initialize
except Exception as e:
    messagebox.showerror("Connection Error", f"Could not connect to Arduino on port {arduino_port}\n{str(e)}")
    arduino = None

# ----- Command Sending Function -----
def send_command(command):
    if arduino:
        arduino.write(command.encode())
        print(f"Sent: {command}")

# ----- Movement Command Functions -----
def forward():
    send_command('F')

def backward():
    send_command('B')

def left():
    send_command('L')

def right():
    send_command('R')

def stop():
    send_command('S')

def toggle_mode():
    send_command('Z')

def exit_app():
    root.destroy()

# ----- Tkinter App Setup -----
root = tk.Tk()
root.title("Arduino RC Controller")
root.geometry("500x450")
root.configure(bg="#caf0f8")  # Dark background for a modern look

# Title Label
title_label = tk.Label(root, text="Arduino RC Controller", font=("Helvetica", 22, "bold"),
                        fg="#023e8a", bg="#caf0f8")
title_label.pack(pady=20)

# Frame for Movement Buttons
btn_frame = tk.Frame(root, bg="#caf0f8")
btn_frame.pack(pady=10)

# Forward Button
forward_btn = tk.Button(btn_frame, text="Forward (W)", command=forward,
                        font=("Helvetica", 14), bg="#233a6a", fg="white", width=12, height=2,
                        bd=0, activebackground="#0096c7")
forward_btn.grid(row=0, column=1, padx=10, pady=10)

# Left Button
left_btn = tk.Button(btn_frame, text="Left (A)", command=left,
                     font=("Helvetica", 14), bg="#14213d", fg="white", width=12, height=2,
                     bd=0, activebackground="#0096c7")
left_btn.grid(row=1, column=0, padx=10, pady=10)

# Stop Button
stop_btn = tk.Button(btn_frame, text="Stop (Q)", command=stop,
                     font=("Helvetica", 14), bg="#fca311", fg="black", width=12, height=2,
                     bd=0, activebackground="#dc7b0e")
stop_btn.grid(row=1, column=1, padx=10, pady=10)

# Right Button
right_btn = tk.Button(btn_frame, text="Right (D)", command=right,
                      font=("Helvetica", 14), bg="#14213d", fg="white", width=12, height=2,
                      bd=0, activebackground="#0096c7")
right_btn.grid(row=1, column=2, padx=10, pady=10)

# Backward Button
backward_btn = tk.Button(btn_frame, text="Backward (S)", command=backward,
                         font=("Helvetica", 14), bg="#233a6a", fg="white", width=12, height=2,
                         bd=0, activebackground="#0096c7")
backward_btn.grid(row=2, column=1, padx=10, pady=10)

# Toggle Auto/Manual Mode Button
toggle_btn = tk.Button(root, text="Toggle Auto/Manual (Z)", command=toggle_mode,
                       font=("Helvetica", 14), bg="#23566a", fg="white", width=25, height=2,
                       bd=0, activebackground="#236a87")
toggle_btn.pack(pady=10)

# Exit Button
exit_btn = tk.Button(root, text="Exit", command=exit_app,
                     font=("Helvetica", 14), bg="#de2828", fg="black", width=25, height=2,
                     bd=0, activebackground="#f10b0b")
exit_btn.pack(pady=10)

root.mainloop()
