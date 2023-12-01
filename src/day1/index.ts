import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const lines = input.split('\n');
        let sum = 0;

        for (const line of lines) {
            const digits = line.match(/\d/g);

            if (digits) {
                const firstDigit = digits[0];
                const lastDigit = digits.length > 1 ? digits[digits.length - 1] : firstDigit;
                const calibrationValue = parseInt(firstDigit + lastDigit, 10);
                sum += calibrationValue;
            }
        }

        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

        const convertLineToDigits = (line: string) => {
            let digitsInLine = [];
            for (let index = 0; index < line.length; index++) {
                const wordIndex = digitWords.findIndex(word => line.startsWith(word, index));
                if (wordIndex !== -1) {
                    digitsInLine.push(wordIndex + 1);
                    index += digitWords[wordIndex].length - 1;
                } else if (/\d/.test(line[index])) {
                    digitsInLine.push(parseInt(line[index]));
                }
            }
            return digitsInLine;
        };

        const calculateValue = (lineDigits: number[]) => {
            if (lineDigits.length > 0) {
                const firstDigit = lineDigits[0];
                const lastDigit = lineDigits[lineDigits.length - 1];
                return parseInt(firstDigit.toString() + lastDigit.toString(), 10);
            }
            return 0;
        };

        return input.split('\n')
            .map(line => {
                const lineLower = line.toLowerCase();
                const digitsInLine = convertLineToDigits(lineLower);
                return calculateValue(digitsInLine);
            })
            .reduce((totalSum, calibrationValue) => totalSum + calibrationValue, 0)
            .toString();
    }

}

export default new Day1;
