function validateZone(zone) {
  // recorrer la zona y si se encuentra uno repetido regresar false
  const numbers = new Map();
  for (let i = 0; i < zone.length; i++) {
    const value = +zone[i];

    if (isNaN(value)) continue;

    if (numbers.has(value)) {
      return false;
    }

    numbers.set(value, 1);
  }

  return true;
}

function validateGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    if (!validateZone(grid[i])) {
      return false;
    }
  }
  return true;
}

function solution(grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const ejeY = Array.from({ length: numCols }, () => Array(numRows).fill(null));
  const cuadrantes = Array(9)
    .fill()
    .map(() => []);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ejeY[j][numRows - 1 - i] = grid[i][j]; // rotar a la derecha

      // agrupar por cuadrante de 3x3
      const indexA = parseInt(i / 3) * 3;
      const indexB = parseInt(j / 3);
      cuadrantes[indexA + indexB].push(grid[i][j]);
    }
  }

  if (!validateGrid(ejeY) || !validateGrid(cuadrantes) || !validateGrid(grid)) {
    return false;
  }

  return true;
}

const grid = [
  ['.', '.', '.', '.', '2', '.', '.', '9', '.'],
  ['.', '.', '.', '.', '6', '.', '.', '.', '.'],
  ['7', '1', '.', '.', '7', '5', '.', '.', '.'],
  ['.', '7', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '8', '3', '.', '.', '.'],
  ['.', '.', '8', '.', '.', '7', '.', '6', '.'],
  ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
  ['.', '1', '.', '2', '.', '.', '.', '.', '.'],
  ['.', '2', '.', '.', '3', '.', '.', '.', '.'],
];

console.log(solution(grid));
