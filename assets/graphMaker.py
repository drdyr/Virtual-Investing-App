import random
import numpy as np
import matplotlib.pyplot as plt
import math
from sympy import *

x = Symbol('x')
init_printing(use_unicode=False, wrap_line=False)
print(integrate(x**2+x+1, x))


startVal = 50
endVal = 100
xToFit = []
yToFit = []
numPoints = random.randint(4, 7)
xToFit.append(0)
yToFit.append(startVal)
xToFit.append(509)
yToFit.append(endVal)
for i in range(numPoints-2):
    xToFit.append(random.uniform(1, 508))
    yToFit.append(random.uniform(startVal, endVal))








def apoly(lst, x):
    total = 0
    for a in (lst):
        total = total*x+a
    return total


minutelyValues = []

def generateMinutelyValuesFor():
    startVal = 50
    endVal = 100
    xToFit = []
    yToFit = []
    numPoints = random.randint(4, 7)
    xToFit.append(0)
    yToFit.append(startVal)
    xToFit.append(509)
    yToFit.append(endVal)
    for i in range(numPoints-2):
        xToFit.append(random.uniform(1, 508))
        yToFit.append(random.uniform(startVal, endVal))
    print(yToFit)
    poly = np.polyfit(xToFit, yToFit, numPoints)
    minutelyValues.append(startVal)
    for minute in range(1, 509):
        minutelyValues.append(apoly(poly, minute))
    minutelyValues.append(endVal)

# generateMinutelyValuesFor()

# minute_list = []

# for x in range(510):
#     minute_list.append(x)

# plt.plot(minute_list, minutelyValues)

# plt.show()
