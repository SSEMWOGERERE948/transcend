interface ScholarshipFilterProps {
  countries: string[];
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export function ScholarshipFilter({
  countries,
  selectedCountry,
  onCountryChange,
}: ScholarshipFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => onCountryChange(country)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${
              selectedCountry === country
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {country.charAt(0).toUpperCase() + country.slice(1)}
        </button>
      ))}
    </div>
  );
}
