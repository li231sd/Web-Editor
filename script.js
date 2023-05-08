document.addEventListener("DOMContentLoaded", function () {
    // Initialize ACE Editor
    var editor = ace.edit("codeEditor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");

    // Set initial code
    var initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body {
            background-color: #FFFF;
        }
    </style>
</head>
<body>
    <h1>Hello, world!</h1>
    <script>
        // Your JavaScript code here
    </script>
</body>
</html>`;

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
    document.getElementById("Upload").addEventListener("click", function () {
        document.getElementById("UploadWindow").style.display = "block";
    });

    document.getElementById("UploadButton").addEventListener("click", function () {
        var fileInput = document.getElementById("file");
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var uploadedCode = e.target.result;
            editor.setValue(uploadedCode);
            editor.clearSelection();
            runCode();
            document.getElementById("UploadWindow").style.display = "none";
            fileInput.value = ""; // Clear the file input value
        };

        reader.readAsText(file);
    });

    // Close upload window
    document.getElementById("CloseButton").addEventListener("click", function () {
        document.getElementById("UploadWindow").style.display = "none";
    });
});
