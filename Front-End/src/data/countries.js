export const countries = [
  { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', currencySymbol: '£' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', currencySymbol: 'E£' },
  { code: 'AE', name: 'UAE', currency: 'AED', currencySymbol: 'AED' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', currencySymbol: '﷼' },
  { code: 'DE', name: 'Germany', currency: 'EUR', currencySymbol: '€' },
  { code: 'FR', name: 'France', currency: 'EUR', currencySymbol: '€' },
  { code: 'IN', name: 'India', currency: 'INR', currencySymbol: '₹' },
  { code: 'JP', name: 'Japan', currency: 'JPY', currencySymbol: '¥' },
]

export function getCountryByCode(code) {
  return countries.find((c) => c.code === code) || countries[0]
}
