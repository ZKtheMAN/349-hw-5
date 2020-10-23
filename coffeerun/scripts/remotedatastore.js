(function (window)  {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    
    class RemoteDataStore {
        constructor(url) {
            console.log('running the DataStore function');
            if (!url) { throw new Error('No remote URL supplied.'); }
            this.serverURL = url;
        }

        add(key, val) {
            var collection = firebase.firestore().collection("coffee");
            return collection.add(val);
        }
        get(key, cb) { 
            return (firebase
                .firestore()
                .collection("coffee")
                .where('emailAddres', '==', key)
                .get()
                .then((x) => x.docs.map((y) => y.data)));
        }
        getAll(cb) {
            return (firebase
                .firestore()
                .collection("coffee")
                .get()
                .then((x) => x.docs.map((y) => y.data())));
        }
        remove(key) {
            firebase
                .firestore()
                .collection("coffee")
                .where("emailAddress", "==", key)
                .get()
                .then((x) => x.docs[0].ref.delete())
        } 
    }
    
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);