def solution(statues):
    minValue = min(statues)
    maxValue = max(statues)
    
    range = (maxValue - minValue) - 1
    diff = len(statues) - 2

    return range - diff

statues = [6, 2, 3, 8]
solution(statues)