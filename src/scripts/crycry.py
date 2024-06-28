def solution(crypt, matrix):
    # Create a dictionary from the matrix
    matrixDict = dict(matrix)

    # Convert crypt words to digits using the matrix dictionary
    crycry_digits = ["".join(matrixDict[letter] for letter in word) for word in crypt]

    # Check if any digit starts with '0'
    if any(digit.startswith('0') for digit in crycry_digits):
        return False

    # Check if the sum of the first two digits equals the third digit
    return int(crycry_digits[0]) + int(crycry_digits[1]) == int(crycry_digits[2])
