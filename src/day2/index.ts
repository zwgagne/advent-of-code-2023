import { Day } from "../day";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    private parseInput(input: string): { id: number, sets: { [color: string]: number }[] }[] {
        if (!input) {
            return [];
        }

        return input.split('\n').filter(line => line.trim().length > 0).map(line => {
            const parts = line.split(': ');
            if (parts.length !== 2) {
                return { id: 0, sets: [] };
            }

            const [idPart, data] = parts;
            const id = parseInt(idPart.split(' ')[1]);
            const sets = data.split('; ').map(set => {
                const counts: { [color: string]: number } = { red: 0, green: 0, blue: 0 };
                set.split(', ').forEach(cube => {
                    const [count, color] = cube.split(' ');
                    counts[color] = Math.max(counts[color], parseInt(count));
                });
                return counts;
            });
            return { id, sets };
        });
    }

    private isGamePossible(sets: { [color: string]: number }[]): boolean {
        const maxCubes = { red: 12, green: 13, blue: 14 };
        return sets.every(set =>
            Object.keys(set).every(color => set[color] <= maxCubes[color as keyof typeof maxCubes])
        );
    }

    private calculatePowerOfSet(sets: { [color: string]: number }[]): number {
        const totalCubes = { red: 0, green: 0, blue: 0 };
        sets.forEach(set => {
            Object.keys(set).forEach(color => {
                totalCubes[color as keyof typeof totalCubes] = Math.max(totalCubes[color as keyof typeof totalCubes], set[color]);
            });
        });
        return totalCubes.red * totalCubes.green * totalCubes.blue;
    }

    solveForPartOne(input: string): string {
        const games = this.parseInput(input);
        const possibleGames = games.filter(game => this.isGamePossible(game.sets));
        const sumOfIds = possibleGames.reduce((sum, game) => sum + game.id, 0);
        return sumOfIds.toString();
    }

    solveForPartTwo(input: string): string {

        const games = this.parseInput(input);
        const powerSums = games.map(game => this.calculatePowerOfSet(game.sets)).reduce((sum, power) => sum + power, 0);
        return powerSums.toString();
    }
}

export default new Day2;
