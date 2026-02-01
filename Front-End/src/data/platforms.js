import youtubeLogo from '../assets/images/youtubePremium.webp'
import shahidLogo from '../assets/images/shahid.jpg'
import viuLogo from '../assets/images/viu.webp'
import netflixLogo from '../assets/images/netflix.webp'
import osnLogo from '../assets/images/osn.webp'
import primeVideoLogo from '../assets/images/prime_new.webp'
import huluLogo from '../assets/images/hulu.webp'
import disney_PlusLogo from '../assets/images/disneyPlus.webp'

export const platforms = [
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    slug: 'youtube-premium',
    description: 'فيديوهات بدون إعلانات، تشغيل في الخلفية، بالإضافة إلى YouTube Music Premium.',
    price: '٧ ريال سعودي',
    logo: youtubeLogo,
    color: '#FF0000'
  },
  {
    id: 'shahid',
    name: 'Shahid',
    slug: 'shahid',
    description: 'منصة البث العربية الرائدة بمحتوى حصري وفريد.',
    price: '$9.99/month',
    logo: shahidLogo,
    color: '#00A8E6'
  },
  {
    id: 'viu',
    name: 'Viu',
    slug: 'viu',
    description: 'عالم من الدراما والأفلام والترفيه الآسيوي بين يديك.',
    price: '$4.99/month',
    logo: viuLogo,
    color: '#FF6B6B'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    slug: 'netflix',
    description: 'شاهد أفلاماً وعروضاً تلفزيونية وغيرها بلا حدود.',
    price: '$15.99/month',
    logo: netflixLogo,
    color: '#E50914'
  },
  {
    id: 'osn',
    name: 'OSN',
    slug: 'osn',
    description: 'ترفيه مميز مع أحدث الأفلام والمسلسلات.',
    price: '$9.99/month',
    logo: osnLogo,
    color: '#FFA500'
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    slug: 'prime-video',
    description: 'آلاف الأفلام والبرامج التلفزيونية، بما في ذلك إنتاجات أمازون الأصلية.',
    price: '$8.99/month',
    logo: primeVideoLogo,
    color: '#00A8E6'
  },
  {
    id: 'hulu',
    name: 'Hulu',
    slug: 'hulu',
    description: 'شاهد المسلسلات، والأفلام، وأعمال Hulu Originals الحصرية.',
    price: '$7.99/month',
    logo: huluLogo,
    color: '#1CE783'
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    slug: 'disney-plus',
    description: 'أقوى العوالم الترفيهية تجتمع هنا: Disney، Pixar، Marvel، Star Wars، وNational Geographic.',
    price: '$10.99/month',
    logo: disney_PlusLogo,
    color: '#113CCF'
  }
]

export const getPlatformBySlug = (slug) => {
  return platforms.find(p => p.slug === slug)
}

export const searchPlatforms = (query) => {
  if (!query) return platforms
  const lowerQuery = query.toLowerCase()
  return platforms.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}
