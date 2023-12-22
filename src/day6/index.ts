import { Day } from "../day";

class Day6 extends Day {
    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        const parsed = input
            .split('\n')
            .filter(line => line.includes(':'))
            .map(line => line.split(':')[1].trim())
            .map(nums => nums.split(/ +/).map(num => parseInt(num)));

        const totalDistance = (timeHolding: number, totalDuration: number) => {
            return (totalDuration - timeHolding) * timeHolding;
        };

        return parsed[0].map(t => Array(t)
            .fill(0)
            .map((_, t1) => totalDistance(t1, t)))
            .map((race, i) => race.filter(d => d > parsed[1][i]))
            .reduce((acc, v) => acc * v.length, 1)
            .toString();
    }

    solveForPartTwo(input: string): string {
        const parsed = input
            .split('\n')
            .filter(line => line.includes(':'))
            .map(line => parseInt(line.split(':')[1].replace(/ /g, '')));

        const totalDistance = (timeHolding: number, totalDuration: number) => {
            return (totalDuration - timeHolding) * timeHolding;
        };

        let result = 0;
        for(let i = 0; i <= parsed[0]; i++) {
            const d = totalDistance(i, parsed[0]);
            if(d > parsed[1]) {
                result++;
            }
        }

        return result.toString();
    }
}

export default new Day6;
