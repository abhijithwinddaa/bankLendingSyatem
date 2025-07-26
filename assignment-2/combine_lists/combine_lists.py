"""
Combining Two Lists with Position-Based Merging
===============================================

This module combines two lists of elements with positions. Elements are merged
if more than half of one element is contained within another. The position of
the element that appears first is retained.

Input format:
[
    {
        "positions": [left_position, right_position],
        "values": [value1, value2, ...]
    },
    ...
]
"""

def combine_lists(list1, list2):
    """
    Combine two lists of elements with positions, merging overlapping elements.
    
    Args:
        list1, list2: Lists in format [{"positions": [left, right], "values": [...]}, ...]
    
    Returns:
        list: Combined and sorted list
    """
    def overlap_ratio(elem1, elem2):
        """Calculate overlap ratio between two elements"""
        left1, right1 = elem1["positions"]
        left2, right2 = elem2["positions"]
        
        # Calculate intersection
        intersection_left = max(left1, left2)
        intersection_right = min(right1, right2)
        
        if intersection_left >= intersection_right:
            return 0  # No overlap
        
        intersection_length = intersection_right - intersection_left
        elem1_length = right1 - left1
        elem2_length = right2 - left2
        
        # Check if more than half of either element is contained in the other
        return max(intersection_length / elem1_length, intersection_length / elem2_length)
    
    # Combine all elements
    all_elements = list1 + list2
    
    # Sort by left position
    all_elements.sort(key=lambda x: x["positions"][0])
    
    result = []
    i = 0
    
    while i < len(all_elements):
        current = all_elements[i].copy()
        current["values"] = current["values"].copy()  # Deep copy values
        j = i + 1
        
        # Check for overlaps with subsequent elements
        while j < len(all_elements):
            if overlap_ratio(current, all_elements[j]) > 0.5:
                # Merge elements - combine values, keep first element's position
                current["values"].extend(all_elements[j]["values"])
                all_elements.pop(j)
            else:
                j += 1
        
        result.append(current)
        i += 1
    
    return result

def print_element(elem, label=""):
    """Helper function to print an element nicely"""
    pos = elem["positions"]
    values = elem["values"]
    print(f"{label}Position: [{pos[0]}, {pos[1]}], Values: {values}")

# Test the implementation
if __name__ == "__main__":
    print("=== Combining Two Lists Implementation ===")
    
    # Test case 1: Basic overlap
    print("\n--- Test Case 1: Basic Overlap ---")
    list1 = [
        {"positions": [1, 5], "values": ["A", "B"]},
        {"positions": [10, 15], "values": ["C"]}
    ]
    list2 = [
        {"positions": [3, 8], "values": ["D", "E"]},
        {"positions": [12, 18], "values": ["F"]}
    ]
    
    print("List 1:")
    for i, elem in enumerate(list1):
        print_element(elem, f"  {i+1}. ")
    
    print("List 2:")
    for i, elem in enumerate(list2):
        print_element(elem, f"  {i+1}. ")
    
    combined = combine_lists(list1, list2)
    print("Combined Result:")
    for i, elem in enumerate(combined):
        print_element(elem, f"  {i+1}. ")
    
    # Test case 2: No overlap
    print("\n--- Test Case 2: No Overlap ---")
    list3 = [
        {"positions": [1, 3], "values": ["X"]},
        {"positions": [10, 12], "values": ["Y"]}
    ]
    list4 = [
        {"positions": [5, 7], "values": ["Z"]},
        {"positions": [15, 17], "values": ["W"]}
    ]
    
    combined2 = combine_lists(list3, list4)
    print("Combined Result (No Overlap):")
    for i, elem in enumerate(combined2):
        print_element(elem, f"  {i+1}. ")
    
    # Test case 3: Complete containment
    print("\n--- Test Case 3: Complete Containment ---")
    list5 = [{"positions": [1, 10], "values": ["Container"]}]
    list6 = [{"positions": [3, 7], "values": ["Contained"]}]
    
    combined3 = combine_lists(list5, list6)
    print("Combined Result (Containment):")
    for i, elem in enumerate(combined3):
        print_element(elem, f"  {i+1}. ")