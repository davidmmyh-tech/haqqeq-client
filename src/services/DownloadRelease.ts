import api from './api';

export const DownloadRelease = async (url: string, fileName?: string, openInNewTab = false) => {
  try {
    const res = await api.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf',
        credentials: 'include'
      }
    });

    const blob = new Blob([res.data], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    if (openInNewTab) {
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
    } else {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName || 'download.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000); // Reduced timeout to 2 seconds
    return true;
  } catch {
    throw new Error('تعذر تحميل الإصدار. حاول مرة أخرى لاحقاً.');
  }
};
