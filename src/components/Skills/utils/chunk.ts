export function chunk<T>(items: T[], size: number): T[][] {
    return items.reduce<T[][]>((groups, _, index) => {
        if (index % size === 0) {
            groups.push(items.slice(index, index + size));
        }
        return groups;
    }, []);
}
