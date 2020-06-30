import random
import numpy as np
import matplotlib.pyplot as plt
import math

no_stocks = 50

days = 365

day_list = []

all_stocks = []

for x in range(days):
    day_list.append(x)

for stock in range(no_stocks):
    count = 0
    avg_daily_return = random.uniform(-0.002, 0.005)
    daily_vol = random.uniform(0.010, 0.02)
    stock_prices = []
    current_price = round(random.uniform(20, 250), 2)
    stock_prices.append(current_price)
    day = 0
    for day in range(days):
        if count == days - 1:
            break
        price = round(stock_prices[count] * (1 + np.random.normal(avg_daily_return, daily_vol)), 2)
        stock_prices.append(price)

        count += 1

    all_stocks.append(stock_prices)

all_stocks = np.asarray(all_stocks)

np.savetxt(r"C:\Users\Sebastian\Desktop\StockPrices.csv", all_stocks, delimiter=",")
