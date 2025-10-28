import api from './api';

export const DownloadRelease = async (url: string, fileName?: string, openInNewTab = false) => {
  try {
    const token = localStorage.getItem('authToken') ?? null;
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await api.get(url, {
      method: 'GET',
      headers: {
        credentials: 'include' // include cookies if backend uses them
      }
    });

    const blob = await res.data.blob();
    const blobUrl = URL.createObjectURL(blob);

    if (openInNewTab) {
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
    } else {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName ?? '';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    // revoke after giving the browser time to load it
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60 * 1000);
    return true;
  } catch {
    throw new Error('تعزر تحميل الاصدار. حاول مرة أخرى لاحقاً.');
  }
};
