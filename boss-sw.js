// ใช้แสดงแจ้งเตือนของหน้า "เวลาบอส" เท่านั้น (Android ต้องแจ้งเตือนผ่าน service worker) — ไม่แคชไฟล์ ไม่ยุ่งกับหน้าอื่น
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    const page = list.find(c => c.url.includes("boss.html"));
    return page ? page.focus() : self.clients.openWindow("boss.html");
  }));
});
