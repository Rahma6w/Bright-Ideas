const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function getToken() { return localStorage.getItem('brightIdeasToken'); }
export function setToken(token) { localStorage.setItem('brightIdeasToken', token); }

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData) && options.body !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try { const body = await response.json(); message = body.message || body.error || message; } catch { /* response had no JSON body */ }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getDemoToken: () => request('/dev/token', { method: 'POST' }),
  upload: async (file) => {
    const form = new FormData(); form.append('file', file);
    return request('/media', { method: 'POST', body: form });
  },
  createPost: (post) => request('/posts', { method: 'POST', body: JSON.stringify(post) }),
  updatePost: (id, post) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(post) }),
  publishPost: (id) => request(`/posts/${id}/publish`, { method: 'POST' }),
  getPost: (id) => request(`/posts/${id}`),
  getMyPosts: () => request('/posts/mine')
};
