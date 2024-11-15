const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';





const currentCache = 'current-cache-v1.3';
const dynamicCache = 'dynamic-cache-v1.1';

const files =
[
            '/',
            '/index.html',
            '/js/app.js',
            '/manifest.json',
            '/index3.html',
            '/pages/offline.html',
            '/images/error.png',
            '/images/perrito.jpg',
            '/images/perrito2.jpg',
            '/pages/recent.html',
            '/images/icons/android-launchericon-144-144.png',
            '/images/icons/android-launchericon-192-192.png',
            '/images/icons/android-launchericon-48-48.png',
            '/images/icons/android-launchericon-512-512.png',
            '/images/icons/android-launchericon-72-72.png',
            '/images/icons/android-launchericon-96-96.png'

];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache).then(cache => {
      return cache.addAll(files);
    })
  );
});



self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => {
        return cacheName !== currentCache
      }).map(cacheName => caches.delete(cacheName))
    ))
  );
});






self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        return response || caches.match("/offline.html");
      });
    })
  );
});






const cleanCache = (cacheName, limitItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > limitItems) {
        cache.delete(keys[0]).then(cleanCache(cacheName, limitItems));
      }
    });
  });
};

const staleWhileRevalidate = (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        fetch(event.request).then((networkResponse) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        });
        return cacheResponse;
      } else {
        return fetch(event.request).then((networkResponse) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        });
      }
    })
  );
 };







/*

import {getAllNote} from "/js/app.js"



//Instalación
  self.addEventListener('install', (event)=>{
    console.log('SW: instalado');
    console.log(event.url);
    //guardar cache de rutas estáticas, las cuales no cambian
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache)=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/manifest.json',
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            'pages/offline.html',
            'images/error.png'
        ]);
        
    });

    const respCacheDynamic = caches.open(DYNAMIC_CACHE_NAME).then((cache)=>{
      return cache.addAll([
          '/',
          '/index.html',
          '/js/app.js',
          '/manifest.json',
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
      ]);
      
  });


    event.waitUntil(Promise.all[respCache]); //espera a que se terminen de crear esos dos caches.
});

 //Rutas inmutables (que son CDN, o recursos que usamos)
 const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache)=>{
  return cache.addAll([
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          'http://localhost:8080/images/icons/android-launchericon-144-144.png'
      ]);
});

, respCacheInmutable



//Activación
self.addEventListener('activate', (event=>{
  console.log('activado');
  const proDelete = caches.keys().then((cachesItems)=>{
      cachesItems.forEach(element => {
          if(element != STATIC_CACHE_NAME && element.includes('static')){
              return caches.delete(element)
          }
      });
  })

  event.waitUntil(proDelete)
}));

  

//Primero cache, sino respuesta web con control de error
self.addEventListener('fetch', (event) => {
  const resp = caches.match(event.request).then((respCache) => {
    if (respCache) {
      return respCache;
    }
    return fetch(event.request).then((respWeb) => {
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        cache.put(event.request, respWeb);
        cleanCache(DYNAMIC_CACHE_NAME, 10);
      });
      return respWeb.clone();
    });
  }).catch((err)=>{
    if(event.request.headers.get('accept').includes('text/html')){
        return caches.match('pages/offline.html')
    }
    if(event.request.headers.get('accept').includes('image')){
        return caches.match('/images/error.png')
    }   
    
  });
  event.respondWith(resp);
});





const cacheFirst = (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
      })
    })
  )
 };







//primero intento siempre ir a la web y si no cache
self.addEventListener('fetch', (event)=>{
    console.log(event.request.url);

    const resp = fetch(event.request).then((respWeb)=>{
        if(!respWeb.ok){
            
            return caches.match(event.request)
              
        }

        caches.open(DYNAMIC_CACHE_NAME).then((cacheDynamic)=>{
            cacheDynamic.put(event.request, respWeb)
        })

        return respWeb.clone();
    }).catch(()=>{
        return caches.match(event.request)
    })


    event.respondWith(resp);
})
*/
