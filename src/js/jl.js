// request weather

// http://api.openweathermap.org/data/2.5/weather?zip=32820,us&appid=5d87307ec2ac976e394333baaa93c861&units=imperial


// homepage functions
(function(){
  'use strict';
  var projectRibbon = document.getElementById("project-ribbon");
  var bodyImg = document.getElementById("body-img");

  if (!projectRibbon) {
    return false;
  }

  var panels = {
    toggleSlash: function () {
      projectRibbon.classList.toggle("slash");
      bodyImg.classList.add("dim");
    },
    reset: function () {
      projectRibbon.classList.remove("slash");
      bodyImg.classList.remove("dim");
    }
  };

  function checkHashState () {

    var _hash = location.hash;
    if( _hash === "#more" ) {
      panels.toggleSlash();
    }
    if ( _hash === '' || _hash === '#home' ) {
      panels.reset();
    }
    // console.log( _hash );
  }
  window.addEventListener("hashchange", checkHashState, false);
  checkHashState();

})();


// music page functions
(function(){
  'use strict';
  var musicPlayerModal = document.getElementById("music-player-modal");
  var exitPlayerBtn = document.getElementById("body-img");

  function checkHashState () {

    var _hash = location.hash;
    if( _hash === "#player" ) {
      player.open();
    }
    if ( _hash === '' || _hash === '#home' ) {
      player.close();
    }
    // console.log( _hash );
  }

  if (musicPlayerModal) {
    var player = {
      open: function () {
        musicPlayerModal.classList.toggle("activate");
      },
      close: function () {
        musicPlayerModal.classList.remove("activate");
      }
    };

    window.addEventListener("hashchange", checkHashState, false);
    checkHashState();
  }

})();

(function(){
  'use strict';
  var daysSinceBirth;
  var start = null;
  var ageInDaysDiv = document.getElementById("age-in-days");
  var count = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    var _daysIncrease = progress / 86400000;
    var _daysSinceBirth = daysSinceBirth + _daysIncrease;
    ageInDaysDiv.innerText = _daysSinceBirth;
    window.requestAnimationFrame(step);
  }

  function thedaysSinceBirth() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(1989,4,1);
    var secondDate = new Date();

    daysSinceBirth = Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay));
    window.requestAnimationFrame(step);
  }

  if (ageInDaysDiv) {
    thedaysSinceBirth();
  }


})();

(function() {

  var
  insta_posts_holder = document.getElementById('insta_posts'),
  insta_posts_mover = document.getElementById('insta_posts_container'),
  insta_shuffle = document.getElementById('shuffle_insta');

  if (insta_posts_holder) {
    var insta_shuffled = insta_posts_holder.getAttribute("data-scramble");
  }

  var insta_count = 0,
  window_width = window.innerWidth,
  window_diff = 0,
  window_offsetLeft = 0;

  var ajaxRequest = function (url, callback, error) {
    var xmlhttp = (window.XMLHttpRequest) ?  new XMLHttpRequest() :  ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var _response = xmlhttp.responseText;
        if (xmlhttp.responseText && typeof callback === "function") {
          callback(_response);
        } else if (typeof error === "function") {
          error();
        }
      }
      if (xmlhttp.readyState === 4 && xmlhttp.status !== 200) {
        if (typeof error === "function") {
          error();
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };




  function toggleInstaImage(e) {
    var toggleOff = [].slice.call(document.querySelectorAll('.instaA.active'));
    var activeEle = this;
    var _activeInstas = 0;
    toggleOff.forEach(function (ele) {
      if (ele !== activeEle) {
        ele.className = "instaA";
        _activeInstas++;
      }
    });

    var _newPos = this.getBoundingClientRect().left - window_diff,
      _shift;


    if (_newPos < window_offsetLeft || _activeInstas === 0) {
      _shift = -115;
    } else {
      _shift = (insta_shuffled) ? -75 : -135;
    }


    window_offsetLeft = _newPos;
    window_diff = (window_width / 2) - window_offsetLeft + _shift;


    insta_posts_mover.style.webkitTransform = "translateX(" + window_diff + "px)";
    insta_posts_mover.style.transform = "translateX(" + window_diff + "px)";

    if (this.className.indexOf("active") === -1) {
      this.className = "active instaA";
      e.preventDefault();

    } else {
      this.className = "instaA";
    }
  }

  function shuffleInsta() {
    if (insta_posts_holder.getAttribute("data-scramble") === "true") {
      insta_posts_holder.setAttribute("data-scramble", "false");
      insta_shuffled = false;
      this.setAttribute("data-scramble", "false");
    } else {
      insta_posts_holder.setAttribute("data-scramble", "true");
      insta_shuffled = true;
      this.setAttribute("data-scramble", "true");
    }

    var toggleOff = [].slice.call(document.querySelectorAll('.instaA.active'));
    toggleOff.forEach(function (ele) {
      ele.className = "instaA";
    });

  }


  function closeInsta(e) {
    e.preventDefault();

    if (window_diff > 100) {
      setTimeout(function () {
        insta_posts_mover.style.webkitTransform = "translateX(0px)";
        insta_posts_mover.style.transform = "translateX(0px)";
        window_diff = 0;
      }, 100);
    }
  }

  function loadInstaG(json) {
    var insta_data = JSON.parse(json);
    insta_data.data.forEach(function (image) {
      if (image.type === "image" || image.type === "video") {
        if (image.caption === null) {
          image.caption = {};
          image.caption.text = '';
        }
        var _link = document.createElement('a');
        _link.innerHTML = '<li><img src="' + image.images.low_resolution.url + '">' +
          '<div class="details"><div class="exit-insta">&times;</div><div class="comments">' + image.comments.count + '</div>' +
          '<div class="caption">' + image.caption.text + '</div>' +
          '<div class="likes">' + image.likes.count + '</div><div><div class="open">View ' + image.type + '</div></div>' +
          '</div></li>';
        _link.href = image.link;
        _link.target = "_blank";
        _link.className = "instaA";
        _link.addEventListener('click', toggleInstaImage);
        insta_posts_holder.appendChild(_link);
        insta_count++;
      }
    });
    var _exits = [].slice.call(document.querySelectorAll('.exit-insta'));
    _exits.forEach(function (exitEle) {
      exitEle.addEventListener("click", closeInsta);
    });

    insta_shuffle.addEventListener("click", shuffleInsta);

  }

  function failedInstag() {
    console.log("Error loading posts");
  }

  function loadWeather(json) {
    var weather = JSON.parse(json);
    var weatherDomEles = {
      temp: document.getElementById("temp-outside-f"),
      description: document.getElementById("weather-desc"),
    };

    var temp = weather.main.temp;
    var weatherDesc = weather.weather[0].description;

    if (weatherDesc === "sky is clear") {
      weatherDesc = "clear skies";
    }

    if(weatherDomEles.temp) {
      weatherDomEles.temp.innerText = temp;
      weatherDomEles.description.innerText = weatherDesc;
    }

  }

  function failedWeather() {
    console.log("Error loading weather");
  }

  function imgPreloader() {

    this.images = [];

    this.addImages = function(images) {

        var self = this;

        if (!images) return;

        if (Array.isArray(images)) {
          images.forEach(function(ele) {
            var _image = new Image();
            _image.src = ele;
            self.images.push(_image);
          });
        }
    };

    return this;
  }


  function init() {

    if (insta_posts_holder) {
      ajaxRequest("/instafeed.php", loadInstaG, failedInstag);
    }

    ajaxRequest("/weatherfeed.php", loadWeather, failedWeather);


    // resize window width if changes
    window.onresize = function () {
       window_width = window.innerWidth;
    };

    var newImage = new imgPreloader();
    newImage.addImages(["/img/rotary_drawing.png","/img/color_blot.jpg","/img/color_samples.jpg", "/img/spark.jpg","/img/juiced.jpg","/img/piano.jpg"]);
  }

  init();

})();
