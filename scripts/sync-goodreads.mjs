import { writeFile, readFile } from 'node:fs/promises'
import { XMLParser } from 'fast-xml-parser'

const USER_ID = process.env.GOODREADS_USER_ID ?? '198396455'
const OUT_PATH = 'src/data/books.json'

const SHELVES = {
  read: `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read`,
  currentlyReading: `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=currently-reading`,
}

async function fetchShelf(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ashwinthampi.github.io sync-bot' },
  })
  if (!res.ok) {
    throw new Error(`Goodreads RSS fetch failed (${res.status}) for ${url}`)
  }
  return res.text()
}

function parseShelf(xml) {
  const parser = new XMLParser({
    ignoreAttributes: true,
    cdataPropName: '__cdata',
    textNodeName: '__text',
    parseTagValue: false,
  })
  const doc = parser.parse(xml)
  const channel = doc?.rss?.channel
  if (!channel) return []
  const raw = channel.item
  const items = Array.isArray(raw) ? raw : raw ? [raw] : []
  return items.map((it) => {
    const pick = (v) => {
      if (v == null) return ''
      if (typeof v === 'string') return v.trim()
      if (typeof v === 'object') return (v.__cdata ?? v.__text ?? '').toString().trim()
      return String(v).trim()
    }
    return {
      title: pick(it.title),
      author: pick(it.author_name),
      readAt: pick(it.user_read_at),
      dateAdded: pick(it.user_date_added),
    }
  })
}

function cleanTitle(title) {
  return title.replace(/\s*\([^()]*#\d+[^()]*\)\s*$/, '').trim()
}

function format(item) {
  const title = cleanTitle(item.title)
  return item.author ? `${title} — ${item.author}` : title
}

function bucketByYear(items) {
  const buckets = {}
  for (const item of items) {
    if (!item.readAt) continue
    const year = new Date(item.readAt).getUTCFullYear()
    if (!Number.isFinite(year)) continue
    const key = String(year)
    if (!buckets[key]) buckets[key] = []
    buckets[key].push({ formatted: format(item), readAt: item.readAt })
  }
  for (const key of Object.keys(buckets)) {
    buckets[key].sort((a, b) => new Date(b.readAt) - new Date(a.readAt))
  }
  const ordered = {}
  for (const year of Object.keys(buckets).sort((a, b) => Number(b) - Number(a))) {
    ordered[year] = buckets[year].map((b) => b.formatted)
  }
  return ordered
}

async function loadExisting() {
  try {
    return JSON.parse(await readFile(OUT_PATH, 'utf8'))
  } catch {
    return null
  }
}

async function main() {
  const [readXml, currentXml] = await Promise.all([
    fetchShelf(SHELVES.read),
    fetchShelf(SHELVES.currentlyReading),
  ])

  const readItems = parseShelf(readXml)
  const currentItems = parseShelf(currentXml)

  if (readItems.length === 0 && currentItems.length === 0) {
    const existing = await loadExisting()
    if (existing) {
      console.error('Goodreads returned empty shelves — keeping existing books.json')
      process.exit(1)
    }
  }

  const data = {
    generatedAt: new Date().toISOString(),
    currentlyReading: currentItems.map(format),
    years: bucketByYear(readItems),
  }

  await writeFile(OUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(
    `wrote ${OUT_PATH} — ${data.currentlyReading.length} currently reading, ${
      Object.values(data.years).reduce((a, b) => a + b.length, 0)
    } read across ${Object.keys(data.years).length} years`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
