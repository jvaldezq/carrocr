type Year = {
    name: string;
    id: number;
};

export const generateYears = (): Year[] => {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = currentYear + 2;
    const endYear: number = currentYear - 70;
    const years: Year[] = [];

    for (let year = startYear; year >= endYear; year--) {
        years.push({ name: year.toString(), id: year });
    }

    return years;
}