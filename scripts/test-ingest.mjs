

async function test() {
  const res = await fetch('http://localhost:3000/api/brain/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: "A empresa Gonex lançou o produto Alfa que ajudou João a ganhar 1 milhão."
    })
  })
  
  const text = await res.text()
  console.log("Status:", res.status)
  console.log("Response:", text)
}

test()
