"""
Indian Currency Format Converter
=================================

In Indian numbering system, terms like Lakh (one hundred thousand) and 
Crore (10 Million) are used. The comma placement follows a specific pattern:
- First group of 3 digits from right
- Then groups of 2 digits

Example: 123456.7891 should return 1,23,456.7891
"""

def indian_currency_format(number):
    """
    Convert a number to Indian currency format with proper comma placement.
    
    Args:
        number (float): The number to format
    
    Returns:
        str: Indian formatted number string
    """
    # Handle negative numbers
    is_negative = number < 0
    number = abs(number)
    
    # Split into integer and decimal parts
    parts = str(number).split('.')
    integer_part = parts[0]
    decimal_part = parts[1] if len(parts) > 1 else ""
    
    # Format integer part
    if len(integer_part) <= 3:
        formatted_integer = integer_part
    else:
        # First group of 3 digits from right
        formatted_integer = integer_part[-3:]
        remaining = integer_part[:-3]
        
        # Add groups of 2 digits
        while len(remaining) > 2:
            formatted_integer = remaining[-2:] + "," + formatted_integer
            remaining = remaining[:-2]
        
        # Add remaining digits
        if remaining:
            formatted_integer = remaining + "," + formatted_integer
    
    # Combine with decimal part
    result = formatted_integer
    if decimal_part:
        result += "." + decimal_part
    
    # Add negative sign if needed
    if is_negative:
        result = "-" + result
    
    return result

# Test the implementation
if __name__ == "__main__":
    print("=== Indian Currency Format Converter ===")
    
    # Test cases
    test_numbers = [
        123456.7891,
        1234567,
        12345,
        123,
        1234567890.123,
        -123456.78,
        1000000,
        10000000,
        100000000,
        1.23
    ]
    
    print("Number\t\t\t-> Indian Format")
    print("-" * 50)
    
    for num in test_numbers:
        formatted = indian_currency_format(num)
        print(f"{num}\t\t-> {formatted}")
    
    # Demonstrate the pattern
    print("\n=== Pattern Explanation ===")
    print("Western: 1,234,567,890.123")
    print("Indian:  1,23,45,67,890.123")
    print("         ^  ^  ^  ^")
    print("         |  |  |  |")
    print("         |  |  |  +-- First group: 3 digits")
    print("         |  |  +----- Second group: 2 digits")
    print("         |  +-------- Third group: 2 digits")
    print("         +----------- Fourth group: 2 digits")