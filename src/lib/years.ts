type Year = {
  label: string;
  value: number | string;
};

export const generateYears = () => {
  const currentYear: number = new Date().getFullYear();
  const startYear: number = currentYear + 2;
  const endYear: number = currentYear - 70;
  const years: Year[] = [];

  for (let year = startYear; year >= endYear; year--) {
    years.push({ label: year.toString(), value: year });
  }

  return years;
};

export const generateInspectionYears = () => {
  const currentYear: number = new Date().getFullYear();
  const startYear: number = currentYear + 4;
  const years: Year[] = [];

  for (let year = startYear; year >= currentYear; year--) {
    years.push({ label: year.toString(), value: year });
  }

  return years;
};
