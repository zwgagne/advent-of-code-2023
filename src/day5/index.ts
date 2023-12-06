import { Day } from "../day";

class Day5 extends Day {
    constructor() {
        super(5);
    }

    solveForPartOne(input: string): string {
        const data = input.split('\n');
        let initialSeeds: number[] = [];
        let conversionMap: Record<string, number[][]> = {};
        let categoryCounter = 0;
        const categories: string[] = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];

        data.forEach((line) => {
            if (line.includes('seeds')) {
                initialSeeds = line.split(':')[1].split(' ').slice(1).map(Number);
            } else if (line.includes('-to-')) {
                categoryCounter++;
            } else {
                if (line.trim() !== '') {
                    const key = categories[categoryCounter - 1];
                    conversionMap[key] = conversionMap[key] || [];
                    conversionMap[key].push(line.split(' ').map(Number));
                }
            }
        });

        function convert(line: number, seed: number, targetType: string): number {
            seed = parseInt(seed.toString());
            let targetValue, sourceValue, range = 0;
            const conversionArray = conversionMap[targetType];

            if (conversionArray) {
                targetValue = parseInt(conversionArray[line][0].toString());
                sourceValue = parseInt(conversionArray[line][1].toString());
                range = parseInt(conversionArray[line][2].toString());
            } else {
                console.error(`Target type '${targetType}' not found in the map.`);
                return seed;
            }

            if (seed === sourceValue) {
                return targetValue;
            } else if (seed > sourceValue && seed < sourceValue + range) {
                let result = seed - sourceValue + targetValue;
                return result;
            } else {
                if (line + 1 >= conversionArray.length) {
                    return seed;
                } else {
                    return convert(line + 1, seed, targetType);
                }
            }
        }

        let minLocation = Number.MAX_SAFE_INTEGER;
        initialSeeds.forEach((seed) => {
            categories.forEach((category) => {
                seed = convert(0, seed, category);
            });
            seed < minLocation ? minLocation = seed : null;
        });

        return minLocation.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day5();
