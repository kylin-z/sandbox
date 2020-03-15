function component() {
  return '<div><h1>sub-a</h1></div>'
}

module.exports = function() {
  document.body.innerHTML = component();
  window.xx = 'a';
  console.log('a xx:', window.xx);
  console.log('a xxx:', window.xxx);
};

