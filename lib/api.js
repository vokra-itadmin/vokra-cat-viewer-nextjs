export async function fetchCats() {
  const res = await fetch('https://www.shelterluv.com/api/v1/animals?status_type=publishable', {
  method: 'GET',    
  headers: {
        'X-API-Key': process.env.API_KEY
      }
  });
  const json = await res.json();
  if(json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API');
  }
  return json;
}