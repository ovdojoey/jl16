(function(){

  var tagsToFilter = {};
  var tagsElementArray = [].slice.call(document.querySelectorAll(".tags-list"));
  var allPosts = [].slice.call(document.querySelectorAll("li.post"));
  var numResultsBox = document.getElementById("results-found-box");
  var numResults = document.getElementById("num-results-found");
  var clearResults = document.getElementById("clear-results");
  var filterInput = document.getElementById("filter-blog-posts");

  var tagsArray = [];
  var tagsToPostKey = [];

  tagsElementArray.forEach( function (tags) {

    var _tags = tags.dataset.tags || tags.getAttribute("data-tags");
    var _post = tags.dataset.post || tags.getAttribute("data-post");

    tagsArray.push(_tags);
    tagsToPostKey.push(_post);


    // var _allTags = _tags.split(",");
    // _allTags.forEach( function (tag) {
    //   tag = tag.replace('"','').trim();
    //   if ( !tag ) {
    //     return;
    //   }
    //
    //   if (str.search(re) != -1) {
    //
    //
    //   if ( tagsToFilter[tag] && tagsToFilter[tag].length > 0 ) {
    //     tagsToFilter[tag].push(_post);
    //   } else {
    //     tagsToFilter[tag] = [ _post ];
    //   }
    // });
  } );


  function clearSearchedElements(hideResultCount) {
    allPosts.forEach( function (ele) {
      ele.classList.remove("highlight");
      ele.classList.remove("hide");
    });
    if (hideResultCount) {
      numResultsBox.classList.remove("activate");
    }
  }

  function hideAllElements() {
    allPosts.forEach( function (ele) {
      ele.classList.add("hide");
    });
  }

  function searchPostsForTag (term) {

    hideAllElements();
    var count = 0;

    tagsArray.forEach( function(tags, index) {
      var _searchPos = tags.search(term);

      if ( _searchPos != -1 ) {
        // term found
        count++;
        var _post = tagsToPostKey[index];
        _domHighLight = document.querySelector("[data-post='" + _post + "']");
        _domHighLight.classList.add("highlight");
      }
    });

    if ( count === 0 ) {
      clearSearchedElements();
    }

    numResults.innerText = count;
    numResultsBox.classList.add("activate");
  }

  filterInput.onchange = function(e) {
    var _search = this.value;
    searchPostsForTag(_search);
  };

  filterInput.onkeyup = function(e) {
      if(e.keyCode == 13){
        var _search = this.value;
        searchPostsForTag(_search);
      }
  };

  clearResults.addEventListener("click", function() {
    clearSearchedElements(true);
    filterInput.value = "";
    
  });

})();
