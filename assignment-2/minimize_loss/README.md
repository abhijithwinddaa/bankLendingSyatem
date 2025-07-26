# Minimizing Loss Problem

## Problem Description
Find the minimum loss when buying and selling a house. Given a list of house prices over several years, determine the optimal buy and sell years to minimize financial loss.

## Constraints
- Must buy before selling (buy_year < sell_year)
- Transaction must result in a loss (buy_price > sell_price)
- Find the minimum possible loss

## Solution Features
- **Brute force approach**: Guaranteed optimal solution
- **Optimized version**: O(n log n) using sorting and binary search
- **Analysis tools**: Shows all possible buy-sell combinations
- **Edge case handling**: Detects when no loss is possible

## Usage
```python
from minimize_loss import minimize_loss, minimize_loss_optimized

prices = [20, 15, 7, 2, 13]
buy_year, sell_year, loss = minimize_loss(prices)

print(f"Buy in year {buy_year}, sell in year {sell_year}")
print(f"Minimum loss: {loss}")
```

## Example
```
Prices: [20, 15, 7, 2, 13]
Years:  [1,  2,  3, 4, 5]

Optimal: Buy in year 2 (price 15), sell in year 5 (price 13)
Minimum loss: 2
```

## Algorithm Complexity
- **Brute Force**: O(n²) time, O(1) space
- **Optimized**: O(n log n) time, O(n) space

## Features
- Returns 1-indexed year numbers
- Handles edge cases (no loss possible)
- Provides detailed analysis of all combinations