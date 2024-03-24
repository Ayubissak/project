function calculateNetSalary(basicSalary, benefits) {
    // Tax rates based on the provided KRA link
    const taxRates = [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 15 },
        { min: 32334, max: 40385, rate: 20 },
        { min: 40386, max: 48337, rate: 25 },
        { min: 48338, max: Infinity, rate: 30 }
    ];

    // NHIF and NSSF rates based on the provided link
    const nhifRate = 0.005;
    const nssfRate = 0.06;

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE (Tax)
    let tax = 0;
    let taxableIncome = grossSalary;
    for (const rate of taxRates) {
        if (taxableIncome > rate.max) {
            tax += (rate.max - rate.min + 1) * (rate.rate / 100);
            taxableIncome -= (rate.max - rate.min + 1);
        } else {
            tax += taxableIncome * (rate.rate / 100);
            break;
        }
    }

    // Calculate NHIF deductions
    const nhifDeductions = grossSalary * nhifRate;

    // Calculate NSSF deductions
    const nssfDeductions = grossSalary * nssfRate;

    // Calculate net salary
    const netSalary = grossSalary - tax - nhifDeductions - nssfDeductions;

    return {
        grossSalary: grossSalary,
        tax: tax,
        nhifDeductions: nhifDeductions,
        nssfDeductions: nssfDeductions,
        netSalary: netSalary
    };
}
