
// Dictionaries array
const dictArray = [
     { img: '../assets/dict-0.png', url: 'https://www.oxfordlearnersdictionaries.com/definition/english/' },
     { img: '../assets/dict-1.png', url: 'https://dictionary.cambridge.org/dictionary/english/' },
     { img: '../assets/dict-2.png', url: 'https://www.thefreedictionary.com/' },
     { img: '../assets/dict-3.png', url: 'https://dictionary.reverso.net/english-definition/' },
     { img: '../assets/dict-4.png', url: 'https://en.wiktionary.org/wiki/' },
     { img: '../assets/dict-5.png', url: 'https://ahdictionary.com/word/search.html?q=' },
     { img: '../assets/dict-6.png', url: 'https://www.britannica.com/dictionary/' },
     { img: '../assets/dict-7.png', url: 'https://www.collinsdictionary.com/us/dictionary/english/' },
     { img: '../assets/dict-8.png', url: 'https://www.deepl.com/en/translator#en/de/' },
     { img: '../assets/dict-9.png', url: 'https://www.dictionary.com/browse/' },
     { img: '../assets/dict-10.png', url: 'https://www.merriam-webster.com/dictionary/' },
     { img: '../assets/dict-11.png', url: 'https://www.ldoceonline.com/dictionary/' },
];

// Create a variable to keep track of the translation icon element
let translationIcon = null;

function createMainDiv() {
     // Get the position of selected text
     let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

     // Create the outer div element
     const outerDiv = document.createElement('div');
     outerDiv.id = 'en-dict';
     outerDiv.style.position = 'absolute';
     outerDiv.style.top = (rect.top - rect.height) + 'px';
     outerDiv.style.left = (rect.left + rect.width) + 'px';

     // Apply CSS styles to the outer div
     outerDiv.style.backgroundColor = '#FFF';
     outerDiv.style.display = 'inline-flex';
     outerDiv.style.boxSizing = 'content-box';
     outerDiv.style.cursor = 'pointer';
     outerDiv.style.width = 'auto';
     outerDiv.style.height = '25px';
     outerDiv.style.zIndex = '2147483647';
     outerDiv.style.borderWidth = '1px';
     outerDiv.style.borderStyle = 'solid';
     outerDiv.style.borderColor = 'rgb(220, 220, 220)';
     outerDiv.style.borderImage = 'initial';
     outerDiv.style.borderRadius = '5px';
     outerDiv.style.padding = '3px';

     // Create and append the translation icons to the outer div
     for (let i = 0; i < dictArray.length; i++)
          outerDiv.appendChild(createIconDiv(i));

     // Append the outer div to the document's body
     document.body.appendChild(outerDiv);

     // Assign the outer div to the translationIcon variable
     translationIcon = outerDiv;
}

function createIconDiv(index) {
     // Get selection
     let selection = window.getSelection();
     let selectedText = selection.toString().trim();

     // Create the inner div element with the class "en-dict-icon"
     const innerDiv = document.createElement('div');
     innerDiv.className = 'en-dict-icon';

     // Apply CSS styles to the inner div
     const iconUrl = chrome.runtime.getURL(dictArray[index].img);
     innerDiv.style.backgroundImage = `url("${iconUrl}")`;
     innerDiv.style.backgroundSize = '25px';
     innerDiv.style.height = '25px';
     innerDiv.style.width = '25px';
     innerDiv.style.margin = '0 5px';

     // Open the extension popup when the icon is clicked
     innerDiv.addEventListener('click', function() {
          // Create Link
          let link = dictArray[index].url + selectedText;
          window.open(link, '_blank');
     });

     return innerDiv;
}

// MouseUp event
document.addEventListener('mouseup', function() {

     // Get selected text
     let selectedText = window.getSelection().toString().trim();

     // Add extension translation icon into opened tab DOM
     if (selectedText)
          createMainDiv();

});

// MouseDown event
document.addEventListener('mousedown', function(event) {

     // Check if the translation icon element exists
     if (translationIcon && !translationIcon.contains(event.target)) {
          // Remove the translation icon
          translationIcon.remove();
          translationIcon = null;
     }

     // Check for another condition
     if (!translationIcon && document.getElementById('en-dict')) {
          // Remove the translation main div
          document.getElementById('en-dict').remove();
          translationIcon = null;
     }

});
