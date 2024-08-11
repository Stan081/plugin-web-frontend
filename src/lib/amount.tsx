export const toFiat = (
    amount: number,
    locale: string = 'en-US',
    currency: string = 'NGN'
  ): string => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
  
    return formatter.format(amount);
  };
  