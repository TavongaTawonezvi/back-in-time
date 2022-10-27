function dateOnChange(){
    let isoDate = document.getElementById("form-input").value;     //Get value of date when changed by user       
    let objectDate = new Date(Date.parse(isoDate));                        // Parse date into milliseconds and convert it into date object 
    let strDate = objectDate.toDateString();                     //Convert the date object’s contents into a string format

    let day = strDate.split(' ')[2];                           // Store the day
    let month = objectDate.toLocaleString('default', { month: 'long' })    // Get the long string format of the month
    
    let date = day + ' ' + month;
    console.log(date);
    fetchAsync(date)
}

async function doFetch(date) {
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/search/page?q="+date+"&limit=10",
     {'Api-User-Agent': 'MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)'}
    );
    const data = await rsp.json();
    return data;
  }
  
  async function fetchAsync(date)
  {
    try {
      let result = await doFetch(date);
      let content = document.getElementById("content");
      content.innerHTML = "";
      console.log(result);
      
      for(let i = 0; i< result.pages.length; i++){
          if(result.pages[i].thumbnail === null){
             content.innerHTML += "<div class='row w-50 list-item'> <div class='col img-wrap'>  <div class='bg-image hover-overlay ripple shadow-2-strong rounded-5'  data-mdb-ripple-color='light'> <img src='img/dog.jpg' style='width:280px; height:199px' class='img-fluid' />  <a href='#!'> <div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div> </a>  </div>  </div> <div class='col '>  <span class='badge bg-danger px-2 py-1 shadow-1-strong mb-3'>News of the day</span> <h4><strong>"+result.pages[i].title+"</strong></h4>  <p class='text-muted'>  "+result.pages[i].excerpt+"  </p>  <button type='button' class='btn btn-primary'>READ MORE</button>  </div>  </div>"
          continue;
          }                                                                       //-md-6 mb-4                                                                                                                                                                                                                                                                                                                                      //-md-6 mb-4                                                  
       content.innerHTML += "<div class='row w-50 list-item'> <div class='col img-wrap'>  <div class='bg-image hover-overlay ripple shadow-2-strong rounded-5'  data-mdb-ripple-color='light'> <img src="+result.pages[i].thumbnail.url+" style='width:280px; height:199px' class='img-fluid' />  <a href='#!'> <div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div> </a>  </div>  </div> <div class='col'>  <span class='badge bg-danger px-2 py-1 shadow-1-strong mb-3'>News of the day</span> <h4><strong>"+result.pages[i].title+"</strong></h4>  <p class='text-muted'>  "+result.pages[i].excerpt+"  </p>  <button type='button' class='btn btn-primary'>READ MORE</button>  </div>  </div>"
      }

    } catch( err ) {
      console.error( err.message );
    }
  }


