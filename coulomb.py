# -*- coding: utf-8 -*-
"""
Created on Mon Aug 10 22:16:21 2020

@author: Cian
"""
from numpy import *
k = 9#8.9876 * 10**9
class charge:
    def __init__(self,q,x,y):
        self.q = q
        self.x = x
        self.y = y
    
def coulomb(q,r):
    return -k * q / r**2

def components(E,angle):
    x = E*cos(angle)
    y = E*sin(angle)
    return [x,y]

def electric_field(charges,x,y):
    field_components = zeros((len(charges),2))
    i=0
    while i < len(charges):
        field = coulomb(charges[i].q,math.hypot(charges[i].x-x,charges[i].y-y))
        field_dir = arctan2(charges[i].y-y,charges[i].x-x)
        field_components[i] = components(field,field_dir)
        i+=1
    x = sum(field_components[:,0])
    y = sum(field_components[:,1])
    angle = arctan2(y,x)*180/pi
    print("="*80)
    print("The electric field strength is "+str(round(math.hypot(x,y),2))+" N/C, at an angle of "+str(round(angle,2))+" degrees.")
    print("="*80)

#electric_field([charge(3,0.07,0.07), charge(-3,0.07,-0.07)],0,0)

user_input = int(input("How many charges do you have: "))
charges = zeros((user_input,3),dtype='object')

i=0
while i<user_input:
    charges[i] = asarray(list(map(float,input("Please input the charge (nC), x position (m) and y position (m) in that order separated by a single space (eg. 1 2 3). For charge "+str(i)+": ").split())))
    charges[i] = charge(charges[i][0],charges[i][1],charges[i][2])
    i+=1
field_values_desired = True
while field_values_desired:
    coords = asarray(str(input("\nGreat! Now what x and y (in m) do you want the electric field at (space separated): ")).split(" "),dtype='f')
    electric_field(charges[:,0],coords[0],coords[1])
    field_values_desired = True if(str(input('Type anything to get the field somewhere else. Press enter to exit.'))) else False
