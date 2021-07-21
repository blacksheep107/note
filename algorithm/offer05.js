s = "We are happy."
var replaceSpace = function(s) {
    return s.replace(new RegExp(' ','gm'),'%20')
};
console.log(replaceSpace(s));