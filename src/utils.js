export const STORAGE_KEY = "shortlinks_v1";

/* simple base62-style code generator */
function generateCode(len = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function save(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function saveShortLink(url) {
  const db = load();
  let code;
  do {
    code = generateCode(6);
  } while (db[code]);
  db[code] = { url, created: Date.now() };
  save(db);
  return { code };
}

export function buildShortUrl(code) {
  return `${window.location.origin}/r/${code}`;
}

export function getAllLinks() {
  const db = load();
  return Object.keys(db)
    .map((code) => ({
      code,
      url: db[code].url,
      shortUrl: buildShortUrl(code),
      created: db[code].created,
    }))
    .sort((a, b) => b.created - a.created);
}

export function findOriginalUrl(code) {
  const db = load();
  return db[code] ? db[code].url : null;
}

export function deleteLink(code) {
  const db = load();
  delete db[code];
  save(db);
}
