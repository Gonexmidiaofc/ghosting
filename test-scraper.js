const fs = require('fs');

async function testScraper() {
  const url = "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&media_type=all&search_type=page&view_all_page_id=20531316728"; // Example FB page

  // Read the APIFY_API_KEY from .env.local
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const match = envContent.match(/APIFY_API_KEY=(.*)/);
  if (!match) {
    console.log("No API key found");
    return;
  }
  const apiKey = match[1].trim();

  const apifyUrl = `https://api.apify.com/v2/acts/apify~facebook-ads-scraper/run-sync-get-dataset-items?token=${apiKey}`;

  console.log("Running scraper...");
  const res = await fetch(apifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startUrls: [{ url }],
      maxAds: 3,
    })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testScraper();
