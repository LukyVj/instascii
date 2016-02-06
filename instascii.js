var instASCII = function(param){
  // Since it's instagram/facebook servers, we need to pass through a cors helper
  // By default, I use the server I created on heroku
  // but you're free to use the one you prefer.
  var cors = param.cors || 'https://still-forest-36763.herokuapp.com/?u='; 

  // Now we create a new instafeed instance, using the parameters passed to 
  // instASCII
  var feed = new Instafeed({ 
    clientId: param.clientId,
    accessToken: param.accessToken,
    userId: param.userId,
    limit: param.limit,
    get: param.get,
    target: param.target,
    resolution: param.resolution,
    limit: param.limit,
    type: param.type || 'colored',
    color:param.color || '#000',
    template: '<a href="{{image}}.html"></a>',
    wrapper: param.wrapper || 'pre',
    wrapperClass: param.wrapperClass || 'instascii',

    // Everything happen in the success event
    success: function(data) {
      // Now prepare the processUrl function
      // We'll make a few XMLHttpRequests 
      function ProcessUrl(url){
        var http = new XMLHttpRequest(); 

        // Set a switch to get the type of the output image
        // either colored or basic, and we will make our XMLHttp
        // request to the proper url
        switch(param.type){
          case 'colored':
            http.open('GET',cors + url+'.html', true); // This is where the magic happen, we add .html at the end
            break;
          case 'basic':
            http.open('GET',cors + url+'.txt', true); // This is where the magic happen, we add .txt at the end
            break;
        }

        // Now we listen the state's change of the http request 
        http.onreadystatechange = function (aEvt) {
          if (http.readyState == 4) {
            if(http.status == 200){

              // We re switch to get the type of the image
              switch(param.type){
                case 'colored':
                  // If it's colored, we add the default wrapper
                  var pr = document.createElement(param.wrapper ? param.wrapper : 'pre' );
                  pr.innerHTML = aEvt.currentTarget.responseText;
                  pr.classList.add(param.wrapperClass ? param.wrapperClass : 'ascii', param.type ? param.type : 'colored')
                  break;
                case 'basic':
                  // If it's basic, so just text, we add a color to it, defined in 'param.color'
                  var pr = document.createElement(param.wrapper ? param.wrapper : 'pre' );
                  pr.innerHTML = aEvt.currentTarget.responseText;
                  pr.classList.add(param.wrapperClass ? param.wrapperClass : 'ascii', param.type ? param.type : 'colored')
                  pr.style.color=param.color // right here
                  break;
              }

              // Then we add the output to our InstaFeed instance
              document.querySelector('#instafeed').appendChild(pr)
            }
            else{
              console.warn("An Error Occured\n");
            }
          } 
        };
        http.send(null);

      }

      // Now we want to handle multi requests
      // We first create an imgs var containing all the data returned by instafeed.js
      var imgs = data.data;
      // A new http request
      var req = new XMLHttpRequest();
      // And we prepare an array
      var requests = new Array();

      // We now iterate over each images returned by instafeed.js
      for(var i=0;i<imgs.length;i++){
        var url;

        // And prepare the url to process with instASCII
        // either thumbnail, low_resolution or standard_resolution
        switch(param.resolution){
          case 'thumbnail':
            url = imgs[i].images.thumbnail.url;
            break;
          case 'standard_resolution':
            url = imgs[i].images.standard_resolution.url;
            break;
          case 'low_resolution':
            url = imgs[i].images.low_resolution.url;
            break;
        }
        // Then we push it through our first function in the success
        // In order to get all the images in ASCII format
        requests.push(new ProcessUrl(url));  
      }
    }
  });

  // And since it's an instafeed.js plugin, we finish by running instafeed!
  feed.run();
}
