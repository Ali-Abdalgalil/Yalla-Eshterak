// src/hooks/useLang.js
import { useState, useEffect } from "react"
import { translations } from "../i18n/translations"

export default function useLang() {
  // اللغة الافتراضية إنجليزي
  const [lang, setLang] = useState("en")

  // دالة ترجمة النصوص حسب المفتاح
  const t = (key) => translations[lang][key] || key

  // تغيير اللغة بين en و ar
  const toggleLang = () => setLang(lang === "en" ? "ar" : "en")

  // تغيير اتجاه الصفحة تلقائي عند العربي
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [lang])

  return { t, lang, toggleLang }
}
