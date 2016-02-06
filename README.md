# instascii
An instafeed.js plugin that returns ASCII versions of images

<h2>Description</h2>
  <p>InstASCII is really simple, it will returns ASCII versions of your instagram images fetched with <a href="http://instafeedjs.com/">Instafeed.js</a></p>
  <p>You can returns plain ol' text, or stylized colored HTML</p>
  <p>Once <code class="language-javascript">instafeed.js</code> and <code class="language-javascript">instascii.js</code> loaded, you'll have to make your call directly with the InstASCII instance. <br/><a href="#api">As shown in the API section</a></p>
  <p>This plugin  <strong>only can work with <a href="http://instafeedjs.com/">Instafeed.js</a></strong>, it will not work as a standalone script.</p>
  
  <h2>API</h2>
  <pre class="language-javascript"><code class="language-javascript">  instASCII({
    clientId: <span>'Your client_id'</span>
    accessToken: <span>'Your access_token'</span>,
    userId: <span>'user_id'</span>,
    limit:<span> x, </span>
    get: <span>'user'</span>,
    target: <span>'instafeed'</span>,
    resolution: <span>'standard_resolution'</span>,
    limit: <span>'100'</span>,
    type: <span>'colored'</span>, // or Basic | By default : colored
    color: <span>'#fff'</span>,    // Only if basic
    wrapper: <span>'pre',</span> // By default : pre
    wrapperClass: <span>'instascii'</span>, // By default : instascii

    // Because instagram servers
    // are protected, we need a server
    // that deals with CORS restriction
    // By default I created an heroku app
    // for it :
    // https://still-forest-36763.herokuapp.com/?u=
    cors: 'https://still-forest-36763.herokuapp.com/?u='
  })</code></pre>
  <p>All the parameters but <code class=" language-javascript">type</code> and <code class=" language-javascript">color</code>, are the same as the one used on <a href="http://instafeedjs.com/">Instafeed.js</a>, so if you encounter any issues related to those parameters (except <code class=" language-javascript">type</code> and <code class=" language-javascript">color</code>) , consider digging the <a href="http://instafeedjs.com/">Instafeed.js</a> documentation</p>

--- 

Demo : [fullscreen](http://codepen.io/LukyVj/full/obapgx/) | [pen](http://codepen.io/LukyVj/pen/obapgx/)
