self.addEventListener('install', (event) => {
  console.log('Service worker installed')
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activated')
})

self.addEventListener('fetch', (event) => {
  // Simple pass-through for now, can be extended for offline caching
})

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || 'Sol Plaatje Update'
  const options = {
    body: data.body || 'New update from the municipality.',
    icon: '/logo.jpg',
    badge: '/logo.jpg'
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})
