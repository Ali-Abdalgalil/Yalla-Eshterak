import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-stream-card border-t border-gray-200 dark:border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-stream-red mb-4">
              يلا اشترك
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              استكشف أفضل منصات البث ووجهة الترفيه التي تناسب ذوقك.
              اشتراك سريع وآمن عبر واتساب.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              للتواصل
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>📞 01111111111</li>
              <li>📞 01222222222</li>
              <li>📍 القاهرة - مصر</li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              اشترك الآن
            </h3>

            <a
              href="https://wa.me/201111111111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium shadow-lg"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-white/10 mt-12 pt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} يلا اشترك - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
