import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VIN Проверка - Полная история и комплектация автомобиля',
    short_name: 'VIN Проверка',
    description: 'Получите полную информацию о комплектации и сервисной истории автомобиля по VIN номеру',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
