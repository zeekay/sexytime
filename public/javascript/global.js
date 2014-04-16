
var User = (function (window) {

    function User (options) {
        options = options || {};
        this.name = options.name || '';
    };

    User.prototype.connect = function () {
        console.log('connect', this);
    };

    User.prototype.sync = function () {
        console.log('sync', this);  
    };

    User.prototype.say = function () {
        console.log('connect', this);
    };

    User.prototype.takeback = function () {
        throw new Error('Sorry, no take-backs');
    };

    return User;

})(window);

var user = new User({name: 'Chika, Chicka, Slim-shady'});
