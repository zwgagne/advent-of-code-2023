import {Day} from "../day";

class Day3 extends Day {
    constructor() {
        super(3);
    }

    private parseInput(input: string): string[][] {
        return input.trim().split("\n").map(row => row.split(''));
    }

    solveForPartOne(input: string): string {
        const grid = this.parseInput(input);
        const height = grid.length;
        const width = grid[0].length;
        const isSpecialCharacter = (character: string) => !/[.\d]/.test(character);

        const hasAdjacentSpecialChar = (x: number, y: number) => {
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                for (let deltaY = -1; deltaY <= 1; deltaY++) {
                    if (deltaX === 0 && deltaY === 0) continue;
                    const newX = x + deltaX;
                    const newY = y + deltaY;
                    if (newX >= 0 && newX < width && newY >= 0 && newY < height && isSpecialCharacter(grid[newY][newX])) {
                        return true;
                    }
                }
            }
            return false;
        };

        let sum = 0;
        grid.forEach((row, y) => {
            [...row.join('').matchAll(/\d+/g)].forEach(match => {
                const x = match.index || 0;
                for (let i = 0; i < match[0].length; i++) {
                    if (hasAdjacentSpecialChar(x + i, y)) {
                        sum += parseInt(match[0]);
                        break;
                    }
                }
            });
        });
        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        const grid = this.parseInput(input);
        const height = grid.length;
        const width = grid[0].length;
        const isNumber = (character: string) => /\d/.test(character);

        const getAdjacentNumbers = (x: number, y: number, checkedPositions: Set<string>) => {
            const adjacentNumbers: number[] = [];
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                for (let deltaY = -1; deltaY <= 1; deltaY++) {
                    if (deltaX === 0 && deltaY === 0) continue;
                    const newX = x + deltaX;
                    const newY = y + deltaY;
                    if (newX >= 0 && newX < width && newY >= 0 && newY < height && isNumber(grid[newY][newX])) {
                        let numberStartIndex = newX;
                        while (numberStartIndex > 0 && isNumber(grid[newY][numberStartIndex - 1])) numberStartIndex--;

                        const positionKey = `${newY},${numberStartIndex}`;
                        if (checkedPositions.has(positionKey)) continue;

                        const numberMatch = grid[newY].slice(numberStartIndex).join('').match(/^\d+/);
                        if (numberMatch) {
                            adjacentNumbers.push(parseInt(numberMatch[0]));
                            checkedPositions.add(positionKey);
                        }
                    }
                }
            }
            return adjacentNumbers;
        };

        let totalSum = 0;
        grid.forEach((row, y) => {
            const pos = new Set<string>();
            row.forEach((char, x) => {
                if (char === "*") {
                    const adjacentNbrs = getAdjacentNumbers(x, y, pos);
                    if (adjacentNbrs.length === 2) {
                        totalSum += adjacentNbrs[0] * adjacentNbrs[1];
                    }
                }
            });
        });
        return totalSum.toString();
    }
}

export default new Day3;
