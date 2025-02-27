document.addEventListener("DOMContentLoaded", function () {
    // Function to open the login modal
    function openLogin() {
        document.getElementById("loginModal").style.display = "flex";
    }

    // Function to close the login modal
    function closeLogin() {
        document.getElementById("loginModal").style.display = "none";
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        let modal = document.getElementById("loginModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Function to open a document
    function viewDocument(pdfPath) {
        console.log("Opening document:", pdfPath); // Debugging log

        // Hide document list
        document.querySelector(".document-list").style.display = "none";

        // Show PDF viewer
        document.getElementById("pdfContainer").style.display = "block";
        
        // Set the PDF source
        document.getElementById("pdfViewer").src = pdfPath;
    }

    // Function to go back to the document list
    function goBack() {
        console.log("Going back to document list"); // Debugging log

        // Hide PDF viewer
        document.getElementById("pdfContainer").style.display = "none";

        // Show document list
        document.querySelector(".document-list").style.display = "block";
    }

    // Attach event listeners
    document.querySelector(".login-btn").addEventListener("click", openLogin);
    document.querySelector(".close-btn").addEventListener("click", closeLogin);
    document.querySelector(".document-item").addEventListener("click", function () {
        viewDocument('Computer Networking Project Report.pdf');
    });
    document.querySelector(".back-btn").addEventListener("click", goBack);
});