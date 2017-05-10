

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5qfMCJQY2hNWUfoqrCliwgNtm2nsoLUE",
  authDomain: "noobijoe.firebaseapp.com",
  databaseURL: "https://noobijoe.firebaseio.com",
  projectId: "noobijoe",
  storageBucket: "noobijoe.appspot.com",
  messagingSenderId: "252696857462"
};
firebase.initializeApp(config);

var database = firebase.database();

function writeUserData(secretKey, message) {
  firebase.database().ref('messages/' + secretKey).set({
    message: message
  });
  console.log('----> write')
}

function writeSlideData(secretKey, direction, index) {
  firebase.database().ref('slides/' + secretKey).set({
    direction: direction,
    index: index
  });
  console.log('----> write slide')

}




var app = new Vue({
  el: '#app',
  data: {
    message: "Sup",
    form: {message: ""},
    secretKey: "dor",
    slideKey: "slide",
    images: ["1.jpg","2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    image_index: 0
  },
  methods: {
    changeMessage: () => {
      app.message = app.form.message;
      writeUserData(app.secretKey, app.form.message);

    },
    changes: (message) => {
      app.message = message;
    },
    goLeft: () => {

      if(app.image_index > 0) {
        app.image_index--;
        writeSlideData(app.slideKey, "left", app.image_index);
      }

    },
    goRight: () => {

      if(app.image_index < app.images.length-1 ) {
        app.image_index++;
        writeSlideData(app.slideKey, "right", app.image_index);
      }


    },
    setImageIndex: (index) => {
      app.image_index = index;
    }


  },
  created: () => {

  }
})


var listenToMessage = firebase.database().ref('messages/' + app.secretKey );
listenToMessage.on('value', function(snapshot) {
  // updateStarCount(postElement, snapshot.val());
  console.log("listen: ", snapshot.val());
  app.changes(snapshot.val().message);
});

var listenToSlide = firebase.database().ref('slides/' + app.slideKey );
listenToSlide.on('value', function(snapshot) {
  // updateStarCount(postElement, snapshot.val());
  console.log("listenToSlide: ", snapshot.val());

  app.setImageIndex(snapshot.val().index);

});
