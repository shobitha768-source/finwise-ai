import { describe, expect, it } from "vitest";

import {
  calculateBudgetTotals,
  calculateEmi,
  calculateInvestmentGrowth,
} from "@/lib/finance-calculations";

describe("financial calculations", () => {
  it("calculates the monthly payment for a $10,000 loan at 12% over 12 months", () => {
    expect(calculateEmi(10_000, 12, 12)).toBeCloseTo(888.49, 2);
  });

  it("calculates end-of-month contributions of $100 monthly at 12% for one year", () => {
    expect(calculateInvestmentGrowth(100, 12, 1)).toBeCloseTo(1_268.25, 2);
  });

  it("totals a $4,000 budget with $2,500 in expenses", () => {
    expect(
      calculateBudgetTotals(4_000, [
        { category: "Housing", amount: 1_500 },
        { category: "Food", amount: 1_000 },
      ]),
    ).toEqual({ totalIncome: 4_000, totalExpenses: 2_500, remaining: 1_500, savingsRate: 0.375 });
  });
});