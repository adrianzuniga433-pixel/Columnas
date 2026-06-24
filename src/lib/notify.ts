// Utilidad de cliente para mostrar notificaciones. Prefiere el service worker
// (funciona mejor con la PWA instalada) y cae a la API Notification normal.

export async function showAppNotification(
  title: string,
  body: string
): Promise<boolean> {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") {
    return false;
  }
  const options: NotificationOptions = {
    body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: "columnas-reminder",
  };
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.showNotification(title, options);
        return true;
      }
    }
  } catch {
    /* cae al método simple */
  }
  try {
    new Notification(title, options);
    return true;
  } catch {
    return false;
  }
}
