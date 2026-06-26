// 매니페스트커피 서비스 워커 - 자동 업데이트
const CACHE_NAME = 'manifest-coffee-v' + Date.now();

// 설치 시 즉시 활성화
self.addEventListener('install', e => {
  self.skipWaiting();
});

// 활성화 시 이전 캐시 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// 네트워크 우선 - 항상 최신 버전 사용
self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate'){
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});

// 강제 업데이트 메시지 수신
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});
