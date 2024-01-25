const contentBox = document.querySelector("#content");


function valueCaptured(value) {
    contentBox.innerText = value
}

browser.commands.onCommand.addListener((command) => {
    if (command == "start-translation") {
        navigator.clipboard
            .readText()
            .then((clipText) => {
                valueCaptured(clipText);
            });
    }
});

browser.runtime.onMessage.addListener(function (message) {
    if (message.action === 'value-captured') {
        valueCaptured(message.value)
    }
});


function onError(error) {
    console.error(`Error: ${error}`);
}