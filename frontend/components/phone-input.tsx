"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const isInternalUpdate = useRef(false)

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
      isInternalUpdate.current = true
      const fullNumber = dialCode + phoneNumber
      onChange(fullNumber)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "") // Only digits
    setPhoneNumber(input)
    isInternalUpdate.current = true
    const fullNumber = countryCode + input
    onChange(fullNumber)
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Select
        value={countryCode}
        onValueChange={handleCountryChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[100px] bg-white/5 border-white/10 text-white h-11">
          <SelectValue>
            <span>{countryCode}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-white/10 text-white max-h-[300px]">
          {COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.dialCode}>
              <span>{country.dialCode}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        id={id}
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
        required={required}
        disabled={disabled}
      />
    </div>
  )
}

