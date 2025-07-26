"""
Minimizing Loss Problem
=======================

Rajeev has a chart of distinct projected prices for a house over the next several years.
He must buy the house in one year and sell it in another, and he must do so at a loss.
He wants to minimize his financial loss.

Example:
price = [20, 15, 7, 2, 13]
Minimum loss is incurred by purchasing in year 2 at price[1] = 15 
and selling in year 5 at price[4] = 13, resulting in a loss of 2.
"""

def minimize_loss(prices):
    """
    Find the minimum loss when buying and selling a house.
    
    Args:
        prices (list): List of house prices over years
    
    Returns:
        tuple: (buy_year, sell_year, loss_value) - 1-indexed years
    """
    n = len(prices)
    min_loss = float('inf')
    buy_year = 0
    sell_year = 0
    
    # Try all possible buy-sell combinations where buy_year < sell_year
    for i in range(n):
        for j in range(i + 1, n):
            if prices[i] > prices[j]:  # Ensure it's a loss
                loss = prices[i] - prices[j]
                if loss < min_loss:
                    min_loss = loss
                    buy_year = i + 1  # 1-indexed
                    sell_year = j + 1  # 1-indexed
    
    return buy_year, sell_year, min_loss

def minimize_loss_optimized(prices):
    """
    Optimized version using sorting and binary search approach.
    Time complexity: O(n log n)
    
    Args:
        prices (list): List of house prices over years
    
    Returns:
        tuple: (buy_year, sell_year, loss_value) - 1-indexed years
    """
    n = len(prices)
    min_loss = float('inf')
    buy_year = 0
    sell_year = 0
    
    # Create list of (price, year) pairs for future prices
    future_prices = []
    
    for i in range(n - 1, -1, -1):  # Process from right to left
        # For current price, find the largest price in future_prices that is smaller
        current_price = prices[i]
        
        # Binary search for the best selling price
        left, right = 0, len(future_prices) - 1
        best_sell_idx = -1
        
        while left <= right:
            mid = (left + right) // 2
            if future_prices[mid][0] < current_price:
                best_sell_idx = mid
                left = mid + 1
            else:
                right = mid - 1
        
        # Check if we found a valid selling price
        if best_sell_idx != -1:
            sell_price, sell_year_idx = future_prices[best_sell_idx]
            loss = current_price - sell_price
            if loss < min_loss:
                min_loss = loss
                buy_year = i + 1  # 1-indexed
                sell_year = sell_year_idx + 1  # 1-indexed
        
        # Add current price to future_prices (keep sorted)
        # Insert in sorted order
        insert_pos = 0
        while insert_pos < len(future_prices) and future_prices[insert_pos][0] < current_price:
            insert_pos += 1
        future_prices.insert(insert_pos, (current_price, i))
    
    return buy_year, sell_year, min_loss

def analyze_all_losses(prices):
    """
    Analyze all possible buy-sell combinations and their losses.
    
    Args:
        prices (list): List of house prices over years
    
    Returns:
        list: List of all valid (buy_year, sell_year, loss) combinations sorted by loss
    """
    n = len(prices)
    all_losses = []
    
    for i in range(n):
        for j in range(i + 1, n):
            if prices[i] > prices[j]:  # Ensure it's a loss
                loss = prices[i] - prices[j]
                all_losses.append((i + 1, j + 1, loss))  # 1-indexed
    
    # Sort by loss (ascending)
    all_losses.sort(key=lambda x: x[2])
    return all_losses

# Test the implementation
if __name__ == "__main__":
    print("=== Minimizing Loss Implementation ===")
    
    # Test case 1: Given example
    print("\n--- Test Case 1: Given Example ---")
    prices1 = [20, 15, 7, 2, 13]
    buy_year, sell_year, loss = minimize_loss(prices1)
    
    print(f"Prices: {prices1}")
    print(f"Years:  {list(range(1, len(prices1) + 1))}")
    print(f"Optimal: Buy in year {buy_year} (price {prices1[buy_year-1]}), sell in year {sell_year} (price {prices1[sell_year-1]})")
    print(f"Minimum loss: {loss}")
    
    # Verify with optimized version
    buy_year_opt, sell_year_opt, loss_opt = minimize_loss_optimized(prices1)
    print(f"Optimized result: Buy year {buy_year_opt}, sell year {sell_year_opt}, loss {loss_opt}")
    
    # Show all possible losses
    print("\nAll possible buy-sell combinations:")
    all_losses = analyze_all_losses(prices1)
    for i, (buy, sell, loss_val) in enumerate(all_losses[:5]):  # Show top 5
        print(f"  {i+1}. Buy year {buy} (${prices1[buy-1]}), sell year {sell} (${prices1[sell-1]}) -> Loss: ${loss_val}")
    
    # Test case 2: Different scenario
    print("\n--- Test Case 2: Different Scenario ---")
    prices2 = [100, 80, 60, 40, 20]
    buy_year2, sell_year2, loss2 = minimize_loss(prices2)
    
    print(f"Prices: {prices2}")
    print(f"Optimal: Buy in year {buy_year2}, sell in year {sell_year2}")
    print(f"Minimum loss: {loss2}")
    
    # Test case 3: No loss possible (increasing prices)
    print("\n--- Test Case 3: Increasing Prices ---")
    prices3 = [10, 20, 30, 40, 50]
    result3 = minimize_loss(prices3)
    
    print(f"Prices: {prices3}")
    if result3[2] == float('inf'):
        print("No loss possible - prices are always increasing!")
    else:
        print(f"Optimal: Buy in year {result3[0]}, sell in year {result3[1]}")
        print(f"Minimum loss: {result3[2]}")