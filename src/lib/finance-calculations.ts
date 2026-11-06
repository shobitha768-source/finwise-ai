export type BudgetExpense = {
  category: string;
  amount: number;
};

export function calculateEmi(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;

  const growth = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * growth) / (growth - 1);
}

export function calculateInvestmentGrowth(
  monthlyContribution: number,
  annualRate: number,
  years: number,
  initialInvestment = 0,
) {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 100 / 12;
  if (months === 0) return Math.max(0, initialInvestment);

  if (monthlyRate === 0) {
    return Math.max(0, initialInvestment) + Math.max(0, monthlyContribution) * months;
  }

  const growth = (1 + monthlyRate) ** months;
  const contributions = (Math.max(0, monthlyContribution) * (growth - 1)) / monthlyRate;
  return Math.max(0, initialInvestment) * growth + contributions;
}

export function calculateBudgetTotals(income: number, expenses: BudgetExpense[]) {
  const totalIncome = Math.max(0, income);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Math.max(0, expense.amount), 0);

  return {
    totalIncome,
    totalExpenses,
    remaining: totalIncome - totalExpenses,
    savingsRate: totalIncome === 0 ? 0 : Math.max(0, totalIncome - totalExpenses) / totalIncome,
  };
}