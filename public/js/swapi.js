function search() {
   // Get the value from the search box
   var searchString = $('#txtSearch').val();
   console.log('Searching for: ' + searchString);

   // Set up the parameters to send to the API
   var params = { q: searchString, app_id: '661c2e42', app_key: 'f2af3a7c771087f4a37bfadb93a34d97' };

  // Use jQuery to make the get request
   $.get('https://api.edamam.com/search', params, function(data, status) {
     // For debugging purposes, make a note that we're back
     console.log('Back from server with the following results:');
     console.log(status);
     console.log(data);

     updateResultList(data);
   });
}

function updateResultList(data) {
 if (data.hits && data.hits.length > 0) {
   var resultList = $('#ulResults');
   resultList.empty();
    
   // For loop to Iterate thru the results...
   for (var i = 0; i < data.hits.length; i++) {
     var title = data.hits[i].recipe.label;
     var url = data.hits[i].recipe.url;
     var image = data.hits[i].recipe.image;
     resultList.append('<li style="list-style-type: none;"><a href="'+ url +'"><h1>' + title + '</h1><img class="title_image" src="'+ image +'"><br /></a>');
     
     //resultList.append('<h3><a href="'+ url +'">' + title + '</a></h3>');
     resultList.append('<ul>')
     for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
       var ingredient = data.hits[i].recipe.ingredients[j];
       resultList.append('<li><p>' + ingredient.text + '</p></li>');
       
     } 
     resultList.append('</ul></li><br /><br /><br />')
    }
  }
}