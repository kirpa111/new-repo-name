import Script from 'next/script'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Проверка автомобиля по VIN | Полная история и комплектация',
    template: '%s | VIN Проверка'
  },
  description: 'Получите полную информацию о комплектации и сервисной истории автомобиля по VIN номеру. Проверка за 7$.',
  keywords: 'проверка VIN, история автомобиля, комплектация авто, сервисная история, проверка авто, VIN декодер, купить автомобиль, аукцион автомобилей',
  openGraph: {
    title: 'Проверка автомобиля по VIN | Полная история и комплектация',
    description: 'Получите полную информацию о комплектации и сервисной истории автомобиля по VIN номеру. Проверка за 7$.',
    url: 'https://vinproverka.com',
    siteName: 'VIN Проверка',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Проверка автомобиля по VIN | Полная история и комплектация',
    description: 'Получите полную информацию о комплектации и сервисной истории автомобиля по VIN номеру. Проверка за 7$.',
  },
  alternates: {
    canonical: 'https://vinproverka.com',
  },
}

export default function RootHead() {
  return (
    <>
      <Script id="schema-org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "VIN Проверка",
            "url": "https://vinproverka.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vinproverka.com/?vin={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "Сервис проверки автомобилей по VIN номеру. Получите полную информацию о комплектации и сервисной истории."
          }
        `}
      </Script>
      <Script id="local-business" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Проверка автомобиля по VIN",
            "description": "Получите полную информацию о комплектации и сервисной истории автомобиля по VIN номеру",
            "provider": {
              "@type": "Organization",
              "name": "VIN Проверка",
              "url": "https://vinproverka.com"
            },
            "serviceType": "Проверка автомобиля",
            "offers": {
              "@type": "Offer",
              "price": "7.00",
              "priceCurrency": "USD"
            }
          }
        `}
      </Script>
    </>
  )
}
