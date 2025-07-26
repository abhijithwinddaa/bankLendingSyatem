# Combining Lists with Position-Based Merging

## Problem Description
Combine two lists of elements with positions, merging elements when more than half of one element is contained within another. The position of the element that appears first is retained.

## Input Format
```python
[
    {
        "positions": [left_position, right_position],
        "values": [value1, value2, ...]
    },
    ...
]
```

## Solution Features
- **Overlap detection**: Calculates intersection ratios between elements
- **Merging logic**: Combines values when overlap > 50%
- **Position preservation**: Keeps the first element's position
- **Sorting**: Results sorted by left position

## Usage
```python
from combine_lists import combine_lists

list1 = [
    {"positions": [1, 5], "values": ["A", "B"]},
    {"positions": [10, 15], "values": ["C"]}
]
list2 = [
    {"positions": [3, 8], "values": ["D", "E"]},
    {"positions": [12, 18], "values": ["F"]}
]

result = combine_lists(list1, list2)
```

## Algorithm
1. Combine both lists
2. Sort by left position
3. For each element, check overlap with subsequent elements
4. Merge if overlap ratio > 0.5
5. Return combined result

## Time Complexity
- O(n²) where n is the total number of elements

## Space Complexity
- O(n) for storing the result