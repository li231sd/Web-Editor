document.addEventListener("DOMContentLoaded", function () {
    // Initialize ACE Editor
    var editor = ace.edit("codeEditor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");

    // Set initial code
    var initialCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial;
        }
    </style>
</head>
<body>
    <h1 id="h1">/</h1>

    <script>
        //Errors show in the console!
        document.getElementById("h1").innerHTML = "Hello World";
    </script>
</body>
</html>
`;

    // Set initial code in the editor
    editor.setValue(initialCode);
    editor.clearSelection();

    // Run the code and display output
    function runCode() {
        var code = editor.getValue();
        var iframe = document.getElementById("outputFrame").contentWindow.document;
        iframe.open();
        iframe.write(code);
        iframe.close();
    }

    // Run the code whenever it is modified
    editor.session.on("change", runCode);

    // Initial code execution
    runCode();

    // Download HTML code
    document.getElementById("Download").addEventListener("click", function () {
        var code = editor.getValue();
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(code));
        element.setAttribute("download", "code.html");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    // Upload HTML file
    document.getElementById("UploadButton").addEventListener("click", function () {
        document.getElementById("file").click();
    });

    document.getElementById("file").addEventListener("change", function (e) {
        var file = e.target.files[0];
        if (file && file.name.endsWith(".html")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var contents = e.target.result;
                editor.setValue(contents);
                runCode();
            };
            reader.readAsText(file);
        } else {
            alert("Please select a valid HTML file.");
        }
    });

    // Custom console logging
    var consoleElement = document.getElementById("console");

    function customLog(message) {
        var logElement = document.createElement("div");
        logElement.textContent = message;
        consoleElement.appendChild(logElement);
        originalConsoleLog.apply(console, arguments);
    }

    var originalConsoleLog = console.log;
    console.log = customLog;

    window.onerror = function (errorMsg, url, lineNumber) {
        customLog("Error: " + errorMsg + " at " + url + ":" + lineNumber);
        return false;
    };
});
