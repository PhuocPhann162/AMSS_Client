/**
 * Formats a number as a currency string
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'VND')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback to simple formatting if Intl is not available
    return `${amount} ${currency}`;
  }
};
