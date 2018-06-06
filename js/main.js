//listen to button submit
document.getElementById("myForm").addEventListener("submit",savebookmark);

// save bookmark
function savebookmark(e){
    //get form values
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    if(!validateform(siteName,siteURL)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }
     

    if (localStorage.getItem('bookmarks')===null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    

    // clear form
    document.getElementById("myForm").reset();

    fetchbookmarks(); 

    // prevent Default behavior
    e.preventDefault();
}

function deletebookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchbookmarks();

}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = ((a[property]).toLowerCase()< (b[property]).toLowerCase()) ? -1 : ((a[property]).toLowerCase() > (b[property]).toLowerCase()) ? 1 : 0;
        return result * sortOrder;
    }
}

function validateform(siteName,siteURL){
    if(!siteName || !siteURL){
        alert('Please Fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
   
    if(!siteURL.match(regex)){
        alert('Please Use a Valid URL');
        return false;
    }

    return true;
}

function fetchbookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    bookmarksResults.innerHTML='';
    
    bookmarks.sort(dynamicSort("name"));

    for(var i=0; i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="card card-body bookmark bg-faded">'+
                                        '<h3>'+name+' '+
                                        '<a class="btn btn-primary" target="_blank" href="http://'+url+'">Visit</a> ' +
                                        '<a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                        '</h3>'+
                                        '</div>'
    }
}
