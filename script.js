 let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function renderNotes() {
      const container = document.getElementById("notes");
      container.innerHTML = "";
      notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
          ${note.image ? `<img src="${note.image}">` : ""}
          <p>${note.text}</p>
          <button onclick="deleteNote(${index})">ลบ</button>
        `;
        container.appendChild(div);
      });
    }

    function addNote() {
      const noteInput = document.getElementById("floatingTextarea2");
      const imageInput = document.getElementById("fileInput");
      const text = noteInput.value.trim();

      if (text === "" && !imageInput.files.length) return;

      if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
          notes.push({ text, image: e.target.result });
          saveNotes();
          renderNotes();
        };
        reader.readAsDataURL(imageInput.files[0]); // อ่านเป็น base64
      } else {
        notes.push({ text, image: null });
        saveNotes();
        renderNotes();
      }

      noteInput.value = "";
      imageInput.value = "";
    }

    function saveNotes() {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    function deleteNote(index) {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    }

    renderNotes();