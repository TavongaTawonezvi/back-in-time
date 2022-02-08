
async function doFetch() {
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/search/page?q=&limit=20",
     {'Api-User-Agent': 'MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)'}
    );
    const data = await rsp.json();
    return data;
  }
  
  async function fetchAsync()
  {
    try {
      let result = await doFetch();
      console.log(result);
    } catch( err ) {
      console.error( err.message );
    }
  }
let searchDate = document.getElementById("search-item");
let searchButton = document.getElementById("button-addon1");
searchButton.addEventListener('click', event => {
fetchAsync();
});
