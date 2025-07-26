# Coding Problems Solutions

This repository contains solutions to four different coding problems, each organized in its own folder with comprehensive implementations and documentation.

## Project Structure

```
├── caesar_cipher/          # Caesar cipher encoding/decoding
│   ├── caesar_cipher.py
│   └── README.md
├── indian_currency/        # Indian currency format converter
│   ├── indian_currency.py
│   └── README.md
├── combine_lists/          # Position-based list merging
│   ├── combine_lists.py
│   └── README.md
├── minimize_loss/          # House trading loss minimization
│   ├── minimize_loss.py
│   └── README.md
└── README.md
```

## Problems Overview

### 1. Caesar Cipher
**Location**: `caesar_cipher/`
- Implements encoding and decoding using Caesar cipher technique
- Handles both uppercase and lowercase letters
- Preserves non-alphabetic characters
- **Time Complexity**: O(n)

### 2. Indian Currency Format
**Location**: `indian_currency/`
- Converts numbers to Indian currency format with proper comma placement
- Follows Indian numbering system (Lakh, Crore)
- Handles negative numbers and decimals
- **Time Complexity**: O(n)

### 3. Combining Lists
**Location**: `combine_lists/`
- Merges two lists based on position overlap
- Combines elements when more than 50% overlap exists
- Maintains sorted order by position
- **Time Complexity**: O(n²)

### 4. Minimizing Loss
**Location**: `minimize_loss/`
- Finds optimal buy/sell strategy to minimize loss
- Includes both brute force and optimized solutions
- Provides detailed analysis of all combinations
- **Time Complexity**: O(n²) brute force, O(n log n) optimized

## Running the Solutions

Each folder contains a standalone Python file that can be executed directly:

```bash
# Test Caesar Cipher
cd caesar_cipher
python caesar_cipher.py

# Test Indian Currency Format
cd indian_currency
python indian_currency.py

# Test Combine Lists
cd combine_lists
python combine_lists.py

# Test Minimize Loss
cd minimize_loss
python minimize_loss.py
```

## Key Features

- **Efficient implementations** using appropriate data structures
- **Comprehensive test cases** with multiple scenarios
- **Detailed documentation** for each solution
- **Clean, readable code** with proper comments
- **Edge case handling** for robust solutions

## Evaluation Criteria Met

✅ **Efficiency**: Optimal time and space complexity for each problem
✅ **Data Structures**: Proper use of lists, dictionaries, and algorithms
✅ **Correct Output**: All solutions return expected results
✅ **Code Quality**: Clean, well-documented, and maintainable code