import React, { useEffect, useMemo, useState } from 'react';
import { Lightbulb, Search, Bell, Bookmark, MessageCircle, UserRound, Plus, Paperclip, X, Flame, Snowflake, ArrowUpRight, ChevronDown, FileText, Image as ImageIcon, CheckCircle2, LoaderCircle } from 'lucide-react';
import { api, getToken, setToken } from './api';

const CATEGORIES = [{ value: 'TECH', label: 'TECH' }, { value: 'COMMUNITY', label: 'COMMUNITY' }, { value: 'EDUCATION', label: 'EDUCATION' }, { value: 'ENVIRONMENT', label: 'ENVIRONMENT' }, { value: 'HEALTH', label: 'HEALTH' }, { value: 'ART_CULTURE', label: 'ART & CULTURE' }, { value: 'BUSINESS', label: 'BUSINESS' }, { value: 'OTHER', label: 'OTHER' }];
const blank = { title: '', description: '', category: '', visibility: 'PUBLIC', status: 'ACTIVE', mediaUrls: [], communityReactionEnabled: true };

export default function App() {
  const [form, setForm] = useState(blank);
  const [files, setFiles] = useState([]);
  const [savedPost, setSavedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  const [tokenReady, setTokenReady] = useState(Boolean(getToken()));
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const titleCount = form.title.length;

  useEffect(() => { if (getToken()) loadPosts(); }, []);
  async function loadPosts() { try { setPosts(await api.getMyPosts()); } catch (e) { setError(e.message); } }
  async function connectDemo() {
    setBusy(true); setError('');
    try { const data = await api.getDemoToken(); setToken(data.token); setTokenReady(true); setNotice('Demo account connected. You can create ideas now.'); await loadPosts(); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  function change(key, value) { setForm(prev => ({ ...prev, [key]: value })); }
  function addFiles(event) {
    const selected = Array.from(event.target.files || []);
    const allowed = selected.filter(f => f.size <= 20 * 1024 * 1024 && /\.(png|jpe?g|gif|webp|pdf|docx?|pptx?)$/i.test(f.name));
    if (allowed.length !== selected.length) setError('Some files were skipped. Use images, PDF, DOC/DOCX or PPTX files up to 20 MB each.');
    setFiles(prev => [...prev, ...allowed]); event.target.value = '';
  }
  function removeFile(index) { setFiles(prev => prev.filter((_, i) => i !== index)); }

  async function submit(status) {
    setError(''); setNotice('');
    if (!tokenReady) { setError('Connect the local demo account before publishing.'); return; }
    if (!form.title.trim()) { setError('Give your idea a title first.'); return; }
    if (!form.description.trim()) { setError('Add a description so people understand your idea.'); return; }
    if (!form.category) { setError('Choose a category.'); return; }
    setBusy(true);
    try {
      const uploaded = [];
      for (const file of files) { const result = await api.upload(file); uploaded.push(result.url); }
      const payload = { ...form, title: form.title.trim(), description: form.description.trim(), status, mediaUrls: [...form.mediaUrls, ...uploaded] };
      let result;
      if (savedPost?.postId) result = await api.updatePost(savedPost.postId, payload);
      else result = await api.createPost(payload);
      setSavedPost(result); setForm(prev => ({ ...prev, status: result.status, mediaUrls: result.mediaUrls || [] })); setFiles([]);
      setNotice(status === 'DRAFT' ? 'Your draft has been saved.' : 'Your idea is now published.');
      await loadPosts();
      if (status === 'ACTIVE') setActiveTab('preview');
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  async function publishSaved() {
    if (!savedPost?.postId) return submit('ACTIVE');
    setBusy(true); setError('');
    try { const result = await api.publishPost(savedPost.postId); setSavedPost(result); setNotice('Your idea is now published.'); setActiveTab('preview'); await loadPosts(); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  async function openPost(id) {
    setBusy(true); setError('');
    try { const post = await api.getPost(id); setSavedPost(post); setForm({ title: post.title, description: post.description, category: post.category, visibility: post.visibility, status: post.status, mediaUrls: post.mediaUrls || [], communityReactionEnabled: post.communityReactionEnabled }); setFiles([]); setActiveTab('preview'); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  const published = savedPost?.status === 'ACTIVE';
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark"><Lightbulb size={20}/></span><span>bright<span className="brand-light">ideas</span></span></a><div className="search"><Search size={17}/><input placeholder="Search ideas, people, possibilities..." /></div><div className="top-actions"><span className="credits">1,240 credits</span><button className="share-top" onClick={() => { setSavedPost(null); setForm(blank); setFiles([]); setActiveTab('create'); }}><Plus size={16}/> Share an idea</button><button className="profile-pill"><UserRound size={15}/> Your profile</button></div></header>
    <div className="layout"><aside className="sidebar"><p className="eyebrow">YOUR WORKSHOP</p><nav>
      <button className="nav-item" onClick={() => { setSavedPost(null); setForm(blank); setFiles([]); setActiveTab('create'); }}>Home feed</button><button className="nav-item" onClick={() => setActiveTab('posts')}><Bookmark size={17}/> Saved & favourites</button><button className="nav-item">Private workspace</button><button className="nav-item"><MessageCircle size={17}/> Messages</button><button className="nav-item"><Bell size={17}/> Notifications</button><button className="nav-item">Reputation & badges</button><button className="nav-item">Profile</button><button className="nav-item">Gift shop</button><button className="nav-item">Credits</button><button className="nav-item">Settings</button><button className="nav-item">Staff dashboard</button>
    </nav><div className="credit-card"><strong>A little support goes far.</strong><b>1,240 credits</b><span>Give a spark. Keep ideas moving.</span></div></aside>
    <main className="main"><div className="page-heading"><p className="eyebrow">MAKE ROOM FOR A POSSIBILITY</p><h1>{activeTab === 'preview' ? 'An idea takes shape.' : activeTab === 'posts' ? 'Your ideas, in progress.' : 'Every idea starts somewhere.'}</h1><p className="subtitle">{activeTab === 'preview' ? 'A little spark can bring people together.' : 'It doesn’t need to be perfect. It just needs to be shared.'}</p></div>
      {!tokenReady && <div className="connect-banner"><div><strong>Local development mode</strong><p>Connect the sample account to test creating and publishing ideas.</p></div><button className="primary small" onClick={connectDemo} disabled={busy}>{busy ? 'Connecting…' : 'Connect demo account'}</button></div>}
      {notice && <div className="notice"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice('')}><X size={15}/></button></div>}{error && <div className="error"><span>{error}</span><button onClick={() => setError('')}><X size={15}/></button></div>}
      {activeTab === 'create' && <section className="form-card"><div className="field"><label htmlFor="title">Title · {titleCount} / 120</label><input id="title" maxLength={120} value={form.title} onChange={e => change('title', e.target.value)} placeholder="Give your idea a clear, memorable name" /></div>
        <div className="field"><label htmlFor="description">Description</label><textarea id="description" value={form.description} onChange={e => change('description', e.target.value)} placeholder={'What should exist, and why does it matter?\n\nWho could it help? What would you like feedback on?\n\nStart with the problem. Dream a little.\n\nInvite a different perspective.'} rows={7}/></div>
        <div className="field-grid"><div className="field"><label htmlFor="category">Category</label><div className="select-wrap"><select id="category" value={form.category} onChange={e => change('category', e.target.value)}><option value="">Select a category</option>{CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select><ChevronDown size={16}/></div></div><div className="field"><label htmlFor="visibility">Visibility</label><div className="select-wrap"><select id="visibility" value={form.visibility} onChange={e => change('visibility', e.target.value)}><option value="PUBLIC">Public · Anyone can discover this</option><option value="PRIVATE">Private · Only you can see this</option></select><ChevronDown size={16}/></div></div></div>
        <label className="upload-box"><input type="file" multiple accept="image/*,.pdf,.doc,.docx,.ppt,.pptx" onChange={addFiles}/><span className="upload-title"><Plus size={17}/> Drop something that brings it to life</span><span className="upload-help">Images, PDF, DOCX or PPTX · up to 20 MB<br/>Choose a file or drag it here</span><span className="upload-hint"><Paperclip size={14}/> Browse files</span></label>
        {(files.length > 0 || form.mediaUrls.length > 0) && <div className="file-list">{form.mediaUrls.map((url, i) => <div className="file-chip" key={url}><FileText size={15}/><span>{url.split('/').pop()}</span></div>)}{files.map((f, i) => <div className="file-chip" key={`${f.name}-${i}`}>{f.type.startsWith('image/') ? <ImageIcon size={15}/> : <FileText size={15}/>}<span>{f.name}</span><button onClick={() => removeFile(i)} type="button"><X size={14}/></button></div>)}</div>}
        <div className="community-row"><div><strong>Let the community react</strong><span>Fire builds momentum. Ice opens a rethink.</span></div><button type="button" role="switch" aria-checked={form.communityReactionEnabled} className={`toggle ${form.communityReactionEnabled ? 'on' : ''}`} onClick={() => change('communityReactionEnabled', !form.communityReactionEnabled)}><span/></button></div>
        <div className="form-actions"><button className="secondary" disabled={busy} onClick={() => submit('DRAFT')}>Save draft</button><button className="primary" disabled={busy} onClick={() => submit('ACTIVE')}>{busy ? <><LoaderCircle className="spin" size={16}/> Working…</> : 'Publish idea'}</button></div><p className="ownership">Your idea stays yours. Community support never transfers ownership or equity.</p>
      </section>}
      {activeTab === 'preview' && savedPost && <article className="post-card"><div className="post-meta"><span className="tag">{savedPost.category} / {savedPost.visibility}</span><span>{savedPost.authorName || 'Your profile'} · just now</span><span className="status-tag">{savedPost.status}</span></div><h2>{savedPost.title}</h2><p className="post-subtitle">{savedPost.visibility === 'PUBLIC' ? 'A possibility worth sharing.' : 'A private idea in your workspace.'}</p><div className="post-description">{savedPost.description}</div>{savedPost.mediaUrls?.length > 0 && <div className="post-attachments">{savedPost.mediaUrls.map(url => <a key={url} href={`http://localhost:8080${url}`} target="_blank" rel="noreferrer"><Paperclip size={15}/>{url.split('/').pop()}</a>)}</div>}<div className="post-actions"><button className="reaction"><Flame size={16}/> Fire 0</button><button className="reaction"><Snowflake size={16}/> Ice 0</button><button className="secondary">Send gift</button><button className="secondary">Message author</button><button className="secondary" onClick={() => setActiveTab('create')}>Edit idea</button></div><div className="conversation"><h3><MessageCircle size={18}/> The conversation · 0</h3><label>Add your perspective</label><input placeholder="What could make this even better?" disabled/><p className="muted">Comments and reactions will be connected in the next feature.</p></div></article>}
      {activeTab === 'posts' && <section className="form-card"><div className="list-heading"><h2>Your posts</h2><button className="primary small" onClick={() => { setSavedPost(null); setForm(blank); setFiles([]); setActiveTab('create'); }}>New idea</button></div>{posts.length === 0 ? <p className="muted">No ideas yet. Your drafts and published ideas will appear here.</p> : posts.map(post => <button className="post-list-item" key={post.postId} onClick={() => openPost(post.postId)}><span><strong>{post.title}</strong><small>{post.category} · {post.status}</small></span><ArrowUpRight size={17}/></button>)}</section>}
    </main></div>
  </div>;
}
