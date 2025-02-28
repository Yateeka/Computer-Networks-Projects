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
  window.onclick = function (event) {
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
  document
    .querySelector(".document-item")
    .addEventListener("click", function () {
      viewDocument("report.pdf");
    });
  document.querySelector(".back-btn").addEventListener("click", goBack);
});

async function onSubmitLogin(e) {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  const formData = new FormData(e.target);
  const res = await window.fetch("/sign/in", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    alert(`Welcome! ${data.username}`);
    localStorage.setItem("token", data._id);
    localStorage.setItem("username", data.username);
    window.location.href = "/";
  } else {
    alert("Check your username and password.");
  }
}
document.querySelector("#login_form").addEventListener("submit", onSubmitLogin);

async function loadNotes() {
  const res = await window.fetch("/notes", {
    headers: {
      "Lemon-Melon": localStorage.getItem("token"),
    },
  });

  if (res.status !== 200) {
    alert("Cannot load notes");
    return;
  }

  const data = await res.json();

  const notesElement = document.querySelector("#notes");
  const tmpl = document.querySelector("#template_note");
  data.forEach((note) => {
    const clone = tmpl.content.cloneNode(true);
    clone.querySelector(".note_content").textContent = note.content;
    clone.querySelector(".note_created_at").textContent = new Date(
      note.createdAt,
    ).toLocaleString();
    notesElement.appendChild(clone);
  });
}

if (localStorage.getItem("token")) {
  document.querySelector("#login-btn").textContent = "Sign Out";
  document.querySelector("#section_note").style.display = "block";

  document.querySelectorAll(".username").forEach((element) => {
    element.textContent = localStorage.getItem("username");
  });
  loadNotes();
}

async function onSubmitNote(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const res = await window.fetch("/notes", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      "Content-Type": "application/json",
      "Lemon-Melon": localStorage.getItem("token"),
    },
  });
  if (res.status === 200) {
    window.location.href = "/";
  } else {
    alert("Failed to create a note.");
  }
}
document.querySelector("#note_form").addEventListener("submit", onSubmitNote);
