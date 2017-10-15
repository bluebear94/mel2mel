console.log("bepis");

var exID = chrome.i18n.getMessage("@@extension_id");
var melURL = "chrome-extension://" + exID + "/images/mel.png";
var mel = document.createElement("img");
mel.setAttribute("src", melURL);

function getFontSizeOfParent(node) {
  var s = getComputedStyle(node.parentNode, null)["font-size"];
  return parseInt(s);
}

function getMelNodeFor(node, s) {
  var size = getFontSizeOfParent(node);
  var mymel = mel.cloneNode(true);
  mymel.setAttribute("height", (size) + "px");
  mymel.setAttribute("width", (45.0 * size / 38.0) + "px");
  mymel.setAttribute("alt", s);
  return mymel;
}

function touchNode(node) {
  var tagName = node.tagName;
  if (tagName == "SCRIPT" || tagName == "LINK") return;
  var children = node.childNodes;
  for (var child of children) {
    if (child.nodeType == Document.TEXT_NODE) {
      var oldText = child.textContent;
      var separators = oldText.split(/mel/ig);
      var matches = oldText.match(/mel/ig);
      var slen = separators.length;
      for (var i = 0; i < slen - 1; ++i) {
        child.before(separators[i]);
        child.before(getMelNodeFor(child, matches[i]));
      }
      child.replaceWith(separators[slen - 1]);
    } else touchNode(child);
  }
}

/*
document.addEventListener("DOMContentLoaded", function(event) { 
  touchNode(window.document);
  console.log("bepis2");
});
*/

touchNode(window.document);