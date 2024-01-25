// function getSelectedText() {
//     let selectedText = '';

//     // Check if the focused element is an input or textarea
//     const activeElement = document.activeElement;
//     console.log(activeElement)
//     const isInputOrTextarea = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

//     if (isInputOrTextarea) {
//       // For input or textarea, get the selected text within the input/textarea
//       const start = activeElement.selectionStart;
//       const end = activeElement.selectionEnd;
//       selectedText = activeElement.value.substring(start, end);
//     } else {
//       // For other elements, get the selected text in the document
//       const selection = window.getSelection();
//       selectedText = selection.toString();
//     }

//     return selectedText;
//   }

//   browser.runtime.onMessage.addListener((message) => {
//     if (message.action === "capture-text") {
//         return Promise.resolve({ response: getSelectedText() });
//     }
// }
// )

// content.js
function addButtonToSpans() {
    const style = document.createElement('style');
    style.textContent = `
        .buddy-translate-button {
            background-color: #e0e0e0;
            border: 1px solid #ccc;
            cursor: pointer;
            position: absolute;
            left: -35px;
            padding: 5px;
        }
        .buddy-translate-button img {
            vertical-align: middle;
        }

        `;

    document.head.appendChild(style);


    const spans = document.querySelectorAll('.stepSource .stepTitleValue');
    console.log(spans)

    spans.forEach(span => {
        // Create a button
        const button = document.createElement('button');
        button.classList.add('buddy-translate-button');

        const icon = document.createElement('img');
        icon.src = 'https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-16x16.png' //browser.runtime.getURL('icons/star.png');
        icon.alt = 'Translate';
        button.appendChild(icon);

        // Add a click event listener to the button
        button.addEventListener('click', function () {
            const spanValue = span.textContent;
            browser.runtime.sendMessage({ action: 'value-captured', value: spanValue });
        });

        // Insert the button next to the span
        span.parentNode.parentNode.insertBefore(button, span.parentNode);
    });
}

// Run the function when the page is ready
addButtonToSpans();


