"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CountryCode {
  code: string
  dialCode: string
  name: string
}

const COUNTRIES: CountryCode[] = [
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "BE", dialCode: "+32", name: "Belgium" },
  { code: "CH", dialCode: "+41", name: "Switzerland" },
  { code: "AT", dialCode: "+43", name: "Austria" },
  { code: "SE", dialCode: "+46", name: "Sweden" },
  { code: "NO", dialCode: "+47", name: "Norway" },
  { code: "DK", dialCode: "+45", name: "Denmark" },
  { code: "FI", dialCode: "+358", name: "Finland" },
  { code: "PL", dialCode: "+48", name: "Poland" },
  { code: "IE", dialCode: "+353", name: "Ireland" },
  { code: "PT", dialCode: "+351", name: "Portugal" },
  { code: "GR", dialCode: "+30", name: "Greece" },
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "CN", dialCode: "+86", name: "China" },
  { code: "JP", dialCode: "+81", name: "Japan" },
  { code: "KR", dialCode: "+82", name: "South Korea" },
  { code: "SG", dialCode: "+65", name: "Singapore" },
  { code: "MY", dialCode: "+60", name: "Malaysia" },
  { code: "TH", dialCode: "+66", name: "Thailand" },
  { code: "ID", dialCode: "+62", name: "Indonesia" },
  { code: "PH", dialCode: "+63", name: "Philippines" },
  { code: "VN", dialCode: "+84", name: "Vietnam" },
  { code: "NZ", dialCode: "+64", name: "New Zealand" },
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia" },
  { code: "IL", dialCode: "+972", name: "Israel" },
  { code: "TR", dialCode: "+90", name: "Turkey" },
  { code: "BR", dialCode: "+55", name: "Brazil" },
  { code: "MX", dialCode: "+52", name: "Mexico" },
  { code: "AR", dialCode: "+54", name: "Argentina" },
  { code: "CL", dialCode: "+56", name: "Chile" },
  { code: "CO", dialCode: "+57", name: "Colombia" },
  { code: "PE", dialCode: "+51", name: "Peru" },
  { code: "RU", dialCode: "+7", name: "Russia" },
  { code: "UA", dialCode: "+380", name: "Ukraine" },
  { code: "EG", dialCode: "+20", name: "Egypt" },
  { code: "NG", dialCode: "+234", name: "Nigeria" },
  { code: "KE", dialCode: "+254", name: "Kenya" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

export default function PhoneInput({
  value,
  onChange,
  className,
  placeholder = "Phone number",
  required = false,
  disabled = false,
  id = "phone",
}: PhoneInputProps) {
  // Parse value to extract country code and number
  const parseValue = (val: string) => {
    if (!val) return { countryCode: "+1", phoneNumber: "", country: COUNTRIES[0] }
    
    // Try to find matching country code (check longer codes first to avoid partial matches)
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
    const matchedCountry = sortedCountries.find((country) => val.startsWith(country.dialCode))
    
    if (matchedCountry) {
      return {
        countryCode: matchedCountry.dialCode,
        phoneNumber: val.replace(matchedCountry.dialCode, "").trim(),
        country: matchedCountry
      }
    }
    
    // Default to US if no match
    return {
      countryCode: "+1",
      phoneNumber: val.replace(/^\+\d+/, "").trim(),
      country: COUNTRIES[0]
    }
  }

  const initial = parseValue(value)
  const [countryCode, setCountryCode] = useState<string>(initial.countryCode)
  const [phoneNumber, setPhoneNumber] = useState<string>(initial.phoneNumber)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(initial.country)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isInternalUpdate = useRef(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Update when external value changes (but only if it wasn't set internally)
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }
    const parsed = parseValue(value)
    setCountryCode(parsed.countryCode)
    setPhoneNumber(parsed.phoneNumber)
    setSelectedCountry(parsed.country)
  }, [value])

  const handleCountryChange = (dialCode: string) => {
    const country = COUNTRIES.find((c) => c.dialCode === dialCode)
    if (country) {
      setSelectedCountry(country)
      setCountryCode(dialCode)
      setIsDropdownOpen(false)
      setSearchQuery("")
      isInternalUpdate.current = true
      const fullNumber = dialCode + phoneNumber
      onChange(fullNumber)
    }
  }

  // Filter countries based on search query
  const filteredCountries = COUNTRIES.filter((country) => {
    const query = searchQuery.toLowerCase()
    return (
      country.dialCode.toLowerCase().includes(query) ||
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query)
    )
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchQuery("")
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "") // Only digits
    setPhoneNumber(input)
    isInternalUpdate.current = true
    const fullNumber = countryCode + input
    onChange(fullNumber)
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <div className="relative w-full sm:w-auto" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={cn(
            "w-full sm:w-[120px] h-10 sm:h-11 px-3 rounded-md border bg-white/5 border-white/10 text-white",
            "flex items-center justify-between",
            "hover:bg-white/10 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-sm sm:text-base"
          )}
        >
          <span>{countryCode}</span>
          <svg
            className={cn(
              "w-4 h-4 transition-transform",
              isDropdownOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute z-50 mt-1 w-[calc(100vw-4rem)] sm:w-[320px] max-w-[320px] rounded-md border border-white/10 bg-black/95 backdrop-blur-md text-white shadow-lg left-0 sm:left-auto">
            {/* Search Input */}
            <div className="p-2 border-b border-white/10">
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-9 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Country List */}
            <div className="max-h-[240px] sm:max-h-[280px] overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountryChange(country.dialCode)}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-white/10 transition-colors",
                      "flex items-center justify-between",
                      countryCode === country.dialCode && "bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-medium w-10 sm:w-12 text-xs sm:text-sm">{country.dialCode}</span>
                      <span className="text-xs sm:text-sm text-white/80 truncate">{country.name}</span>
                    </div>
                    {countryCode === country.dialCode && (
                      <svg
                        className="w-4 h-4 text-[color:var(--brand,#18e2a5)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-white/50 text-sm">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Input
        id={id}
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50 h-10 sm:h-11 text-sm sm:text-base"
        required={required}
        disabled={disabled}
      />
    </div>
  )
}

