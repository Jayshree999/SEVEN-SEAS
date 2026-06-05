const fs = require('fs');

async function scrapePages() {
  const pages = [
    'https://sevenseashotel.net/'
  ];
  
  const results = {};
  
  for (const url of pages) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      // Extract all text content
      const headings = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)].map(m => m[2].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
      // Extract paragraphs
      const paragraphs = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
      
      results[url] = { headings, paragraphs };
    } catch (e) {
      console.log('Error scraping', url);
    }
  }
  
  fs.writeFileSync('pages_content_home.json', JSON.stringify(results, null, 2));
  console.log("Pages scraped and saved.");
}

scrapePages();
