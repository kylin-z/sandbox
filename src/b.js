function component() {
  return '<div><h1>sub-b</h1></div>'
}

module.exports = function() {
  document.body.innerHTML = component();
  window.xx = 'b';
  console.log('b xx:', window.xx);
  console.log('b xxx:', window.xxx);
};
