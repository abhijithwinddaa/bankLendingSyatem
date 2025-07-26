# Caesar Cipher Implementation

## Problem Description
Implement encoding and decoding of messages using the Caesar cipher technique. In this cipher, each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.

## Solution Features
- **Encoding**: Shifts letters by specified positions
- **Decoding**: Reverses the encoding process
- **Preserves**: Non-alphabetic characters remain unchanged
- **Handles**: Both uppercase and lowercase letters
- **Wraparound**: Uses modulo arithmetic for proper alphabet cycling

## Usage
```python
from caesar_cipher import caesar_cipher_encode, caesar_cipher_decode

# Encode a message
encoded = caesar_cipher_encode("Hello World!", 3)
print(encoded)  # Output: "Khoor Zruog!"

# Decode the message
decoded = caesar_cipher_decode(encoded, 3)
print(decoded)  # Output: "Hello World!"
```

## Time Complexity
- **Encoding**: O(n) where n is the length of the message
- **Decoding**: O(n) where n is the length of the message

## Space Complexity
- O(n) for storing the result string