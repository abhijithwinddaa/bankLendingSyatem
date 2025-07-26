"""
Caesar Cipher Implementation
============================

In cryptography, a Caesar cipher is one of the simplest and most widely known 
encryption techniques. It is a type of substitution cipher in which each letter 
in the plaintext is replaced by a letter some fixed number of positions down the alphabet.

Example: With a left shift of 3, D would be replaced by A, E would become B, and so on.
"""

def caesar_cipher_encode(message, shift):
    """
    Encode a message using Caesar cipher with given shift.
    
    Args:
        message (str): The message to encode
        shift (int): Number of positions to shift (positive for right shift)
    
    Returns:
        str: Encoded message
    """
    result = ""
    for char in message:
        if char.isalpha():
            # Handle uppercase letters
            if char.isupper():
                result += chr((ord(char) - ord('A') + shift) % 26 + ord('A'))
            # Handle lowercase letters
            else:
                result += chr((ord(char) - ord('a') + shift) % 26 + ord('a'))
        else:
            # Keep non-alphabetic characters unchanged
            result += char
    return result

def caesar_cipher_decode(message, shift):
    """
    Decode a message using Caesar cipher with given shift.
    
    Args:
        message (str): The message to decode
        shift (int): Number of positions that were shifted during encoding
    
    Returns:
        str: Decoded message
    """
    # Decoding is encoding with negative shift
    return caesar_cipher_encode(message, -shift)

# Test the implementation
if __name__ == "__main__":
    print("=== Caesar Cipher Implementation ===")
    
    # Test cases
    test_cases = [
        ("Hello World!", 3),
        ("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1),
        ("The quick brown fox jumps over the lazy dog", 13),
        ("Programming is fun!", 5)
    ]
    
    for message, shift in test_cases:
        encoded = caesar_cipher_encode(message, shift)
        decoded = caesar_cipher_decode(encoded, shift)
        
        print(f"\nOriginal: {message}")
        print(f"Shift: {shift}")
        print(f"Encoded: {encoded}")
        print(f"Decoded: {decoded}")
        print(f"Match: {message == decoded}")