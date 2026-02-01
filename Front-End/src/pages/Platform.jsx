import { useParams, useNavigate } from 'react-router-dom'
import { getPlatformBySlug, platforms } from '../data/platforms'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

export default function Platform() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const platform = getPlatformBySlug(slug)

  if (!platform) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-stream-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Platform Not Found
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-stream-red text-white rounded-lg hover:bg-stream-red-hover transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const message = `مرحبًا 👋
أرغب في الاشتراك في ${platforms.name}
السعر: ${platforms.price}`

    window.open(
      `https://wa.me/201234567890?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-stream-black">

      {/* 🎬 Cinematic Hero Section */}
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden">

        {/* Background */}
        <img
          src={platform.logo || platform.thumbnail}
          alt={platform.name}
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-slowZoom"
          loading="lazy"
        />

        {/* Blur Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-20 text-white animate-fadeUp">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-2xl">
            {platform.name}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {platform.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            <div className="text-3xl font-bold text-stream-red">
              {platform.price}
            </div>

            <button
              onClick={handleSubscribe}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:scale-105"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              اطلب الآن عبر واتساب
            </button>

          </div>
        </div>
      </div>

      {/* 📦 Details Section */}
      <section className="max-w-5xl mx-auto py-20 px-4">

        <div className="bg-white/80 dark:bg-stream-card/80 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-white/10 shadow-2xl transition hover:shadow-3xl">

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            تفاصيل الاشتراك
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg">
            استمتع بأفضل تجربة ترفيهية مع {platform.name}. محتوى متجدد،
            جودة عالية، وتجربة مشاهدة مميزة على جميع أجهزتك.
          </p>

          <button
            onClick={handleSubscribe}
            className="w-full py-4 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:scale-105"
          >
            <i className="fa-brands fa-whatsapp text-2xl"></i>
            اطلب الآن عبر واتساب
          </button>

        </div>

        {/* 🎥 Other Platforms */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            منصات أخرى
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms
              .filter(p => p.id !== platform.id)
              .slice(0, 4)
              .map(p => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/platform/${p.slug}`)}
                  className="p-6 bg-white dark:bg-stream-card rounded-xl border border-gray-200 dark:border-white/10 hover:border-stream-red hover:shadow-xl transition-all text-left hover:scale-105"
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {p.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {p.price}
                  </div>
                </button>
              ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}