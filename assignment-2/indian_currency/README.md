# Indian Currency Format Converter

## Problem Description
Convert floating point numbers to Indian currency format with proper comma placement. In the Indian numbering system, commas are placed differently than the Western system.

## Format Rules
- **First group**: 3 digits from the right
- **Subsequent groups**: 2 digits each
- **Example**: 123456.7891 → 1,23,456.7891

## Solution Features
- **Handles**: Negative numbers
- **Preserves**: Decimal places
- **Correct formatting**: Follows Indian numbering conventions
- **Edge cases**: Numbers with fewer than 4 digits

## Usage
```python
from indian_currency import indian_currency_format

# Format numbers
print(indian_currency_format(123456.7891))  # Output: "1,23,456.7891"
print(indian_currency_format(1234567))      # Output: "12,34,567"
print(indian_currency_format(-123456.78))   # Output: "-1,23,456.78"
```

## Comparison
| Western Format | Indian Format |
|----------------|---------------|
| 1,234,567,890.123 | 1,23,45,67,890.123 |

## Time Complexity
- O(n) where n is the number of digits

## Space Complexity
- O(n) for storing the formatted string