// export const toFiat = (
//     amount: number,
//     locale: string = 'en-US',
//     currency: string = 'NGN'
//   ): string => {
//     const formatter = new Intl.NumberFormat(locale, {
//       style: 'currency',
//       currency: currency,
//     });

//     return formatter.format(amount);
//   };

export const toFiat = (value: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("NGN", "₦");
};
