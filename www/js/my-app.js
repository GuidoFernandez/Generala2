  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var x = ['1','2','3','4','5','6']

var temporal;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/pagina1/',
        url: 'pagina1.html',
      },
    ]
    // ... other parameters
  });




var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
  

});


$$(document).on('page:init', '.page[data-name="pagina1"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('.popover-about').on('popover:open', function (e) {
      console.log('About popover open');
    });
    $$('.popover-about').on('popover:opened', function (e) {
      console.log('About popover opened');
    });

    $$('.dado').on('click', function() {
     x = $$(this).attr('id')
     
     console.log(x)
      
    })
    
    
   
    
    })
        
 

    
    

  


   


