/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return(false);
}

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

function stringToArray(string)
{
    var stringHolder;

    stringHolder = string.replace(/,/g, "<br>").replace(/!/g, "<br>")
    return stringHolder
}

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

function preloaderFade() {
    if ($(".preloader").length) {
        $(".preloader").fadeOut()
    }
}

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

var validation = {
    isEmailAddress: function (str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1, str2) {
        return str1 === str2;
    }
};

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

function setGetLocalstorage(key, param) {
    var
            self = this;

    if (param == undefined) {
        var keyitem;

        if (localStorage.getItem(key) !== null) {
            return atob(localStorage.getItem(key));
        }

    } else {
        localStorage.setItem(key, "")
        localStorage.removeItem(key)
        localStorage.setItem(key, btoa(param));
        return
    }
}

/* -----------------------------------------------
 * 
 * 
   ----------------------------------------------- */

function timeFunction(){
    this.d = new Date()
} 

timeFunction.prototype.get = function(){
    return this.d.getTime();
}
timeFunction.prototype.getCurrentYears = function(){
    return this.d.getFullYear();
}
timeFunction.prototype.getYears = function(y){
    var da = new Date(y)
    return da.getFullYear();
}