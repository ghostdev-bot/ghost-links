/* Ghost Links SW: caches only this site's own static files; cross-origin and non-GET bypass. */
var VERSION='gl-shell-20261029a-fb';
var SHELL=['/','/assets/avatar.jpg','/assets/favicon.png','/assets/icons/icon-192.png','/assets/icons/icon-512.png','/manifest.webmanifest'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x.indexOf('gl-shell-')===0&&x!==VERSION}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==self.location.origin)return;
if(r.mode==='navigate'||u.pathname==='/'||u.pathname==='/index.html'){e.respondWith(fetch(r,{cache:'no-store'}).then(function(res){if(res.ok){var c=res.clone();caches.open(VERSION).then(function(x){x.put('/',c)})}return res}).catch(function(){return caches.match('/')}));return}
if(SHELL.indexOf(u.pathname)===-1)return;e.respondWith(caches.match(u.pathname).then(function(h){return h||fetch(r)}))});
