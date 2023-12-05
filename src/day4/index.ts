import { Day } from "../day";

class Day4 extends Day {
    constructor(){
        super(4);
    }

    private getNumbers(row: string): { winning: string[], have: string[] } {
        const matches = row.match(/: (.+?) \| (.+)/);
        if (!matches || matches.length < 3) {
            return { winning: [], have: [] };
        }

        const winning = matches[1].match(/\d+/g) ?? [];
        const have = matches[2].match(/\d+/g) ?? [];
        return { winning, have };
    }

    solveForPartOne(input: string): string {
        let result = 0;
        const rows = input.split('\n');
        rows.forEach((row) => {
            const { have, winning } = this.getNumbers(row);
            const matches = winning.filter((n) => have.includes(n));
            result += matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
        });
        return result.toString();
    }

    solveForPartTwo(input: string): string {
     return input;
    }
}

export default new Day4();
