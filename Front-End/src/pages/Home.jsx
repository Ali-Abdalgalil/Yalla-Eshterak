import { platforms } from '../data/platforms'
import PlatformCard from '../components/PlatformCard'
import heroImage from '../assets/images/hero.jpeg'
import useLang from '../hooks/useLang'
import Footer from '../components/Footer'

export default function Home() {
  const { t, lang } = useLang()

  return (
    <div className="min-h-screen" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stream-red/20 via-purple-500/20 to-blue-500/20 dark:from-black/90 dark:via-black/50 dark:to-transparent" />
        {/* Hero Text */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4">
          معرض منصات البث
          </h1>
          <p className="text-lg text-white dark:text-gray-300 max-w-2xl mx-auto">
          استكشف أفضل منصات البث وقارن بينها لتختار وجهة الترفيه التي تناسب ذوقك تماماً.
          </p>
        </div>
      </div>

      {/* Platform Cards */}
      <section className="py-12 lg:py-16 px-4 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t("allPlatforms")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
