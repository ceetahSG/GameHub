// Bangla locale uses Bengali digits (০১২৩৪৫৬৭৮৯); English uses Western digits.
export function formatNumber(value: number, locale: string, fractionDigits = 0): string {
  const intlLocale = locale === 'bn' ? 'bn-BD-u-nu-beng' : 'en-US';
  return new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
