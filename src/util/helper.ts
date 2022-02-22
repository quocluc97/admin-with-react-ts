export const processPathRoute = (path: string): string => {
    return path.replace('/', '').toUpperCase();
}