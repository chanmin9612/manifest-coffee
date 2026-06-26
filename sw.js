// 매니페스트커피 서비스 워커 v2
// 버전 바꾸면 자동 업데이트 트리거
const VERSION = 'v' + Date.now();

// 설치 즉시 활성화
self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

// 이전 캐시 전부 삭제 후 즉시 제어
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 항상 네트워크에서 최신 파일 가져오기 (캐시 안 씀)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, {cache: 'no-store'})
      .catch(() => caches.match(e.request))
  );
});
