// =====================
// UI SETUP
// =====================
function setui() {
    const token = localStorage.getItem("token");
    const loginDiv = document.getElementById("logged-out-div");
    const logoutDiv = document.getElementById("logout-div");
    const addbutton = document.getElementById("addbutton");
    const userprofile = document.getElementById("userprofile");

    if (!token) {
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
        addbutton.style.setProperty("display", "none", "important");
        userprofile.style.setProperty("display", "none", "important");
    } else {
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
        addbutton.style.setProperty("display", "flex", "important");
        userprofile.style.setProperty("display", "flex", "important");
    }
}

// =====================
// ALERTS
// =====================
function showAlert(message, type = "success") {
    const alertsDiv = document.getElementById("alerts");
    const alertEl = document.createElement("div");
    alertEl.className = `alert alert-${type} d-flex align-items-center`;
    alertEl.style.width = "300px";
    alertEl.style.padding = "10px";
    alertEl.style.marginBottom = "10px";
    alertEl.setAttribute("role", "alert");
    alertEl.innerHTML = `
        <div style="font-size:20px; margin-right:10px;">
            ${type === "success" ? "✅" : type === "info" ? "ℹ️" : "❌"}
        </div>
        <div>${message}</div>
    `;
    alertsDiv.appendChild(alertEl);

    setTimeout(() => alertsDiv.removeChild(alertEl), 5000);
}

// =====================
// CREATE POST CARD
// =====================
function createPostCard(post) {
    const profileImg = post.author.profile_image || './images/imgprofile.png';
    const postImage = post.image ? `<img src="${post.image}" class="card-img-top mb-3" />` : "";

    let tagsHtml = "";
    if (post.tags?.length > 0) {
        tagsHtml = post.tags.map(tag =>
            `<button class="btn btn-sm rounded-5 me-1" style="background-color: gray; color: white;">${tag.name}</button>`
        ).join("");
    } else {
        tagsHtml = `<span>No Tags</span>`;
    }

    const div = document.createElement("div");
    div.className = "card my-3";
    div.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <img src="${profileImg}" style="width:40px;height:40px;border-radius:50%;" class="me-2 border" />
            <h5 class="mb-0">${post.author.username}</h5>
          </div>
          <p>${post.body || "No content"}</p>
          ${postImage}
          <div class="mb-2">${tagsHtml}</div>
          <div class="d-flex justify-content-between text-muted mt-3">
            <span>${post.comments_count} Comments</span>
            <span>Created: ${post.created_at}</span>
          </div>
        </div>
    `;
    return div;
}

// =====================
// FETCH POSTS
// =====================
function getPosts() {
    axios.get("https://tarmeezacademy.com/api/v1/posts")
        .then(response => {
            const posts = response.data.data;
            const container = document.getElementById("posts");
            container.innerHTML = "";

            posts.forEach(post => {
                const card = createPostCard(post);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById("posts").innerHTML = "<p class='text-danger'>خطأ أثناء تحميل البوستات</p>";
        });
}

// =====================
// ADD NEW POST
// =====================
// function addnewpostuser() {
//     const title = document.getElementById("post-title")?.value || "";
//     const body = document.getElementById("post-body")?.value || "";
//     const postimage = document.getElementById("post-image").files[0];

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("body", body);
//     if (postimage) formData.append("image", postimage);

//     const token = localStorage.getItem("token");

//     axios.post(
//         "https://tarmeezacademy.com/api/v1/posts",
//         formData,
//         { headers: { "authorization": `Bearer ${token}` } }
//     )
//     .then(response => {
//         showAlert("Post added successfully!", "success");

//         const container = document.getElementById("posts");
//         const newCard = createPostCard(response.data.data);
//         container.prepend(newCard); // ضع البوست الجديد فوق البوستات القديمة
//     })
//     .catch(error => {
//         console.log("ERR:", error);
//         showAlert(error.response?.data?.message || "Something went wrong", "danger");
//     });
// }
// function addnewpostuser() {
//     const title = document.getElementById("post-title")?.value || "";
//     const body = document.getElementById("post-body")?.value || "";
//     const postimage = document.getElementById("post-image")?.files[0];

//     if (!title && !body && !postimage) {
//         showAlert("Please enter title, body, or image", "info");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("body", body);
//     if (postimage) formData.append("image", postimage);

//     const token = localStorage.getItem("token");
//     if (!token) {
//         showAlert("You must be logged in to add a post", "danger");
//         return;
//     }

//     axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             // خلي Content-Type يتحدد تلقائي عشان axios يعرف يتعامل مع FormData
//         }
//     })
//     .then(response => {
//         showAlert("Post added successfully!", "success");
//         const container = document.getElementById("posts");
//         if (container) container.prepend(createPostCard(response.data.data));
//         bootstrap.Modal.getInstance(document.getElementById("add-modal"))?.hide();
//     })
//     .catch(error => {
//         console.log("ERR:", error.response || error);
//         showAlert(error.response?.data?.message || "Something went wrong", "danger");
//     });
// }
// function addnewpostuser() {
//     const title = document.getElementById("post-title")?.value.trim() || "";
//     const body = document.getElementById("post-body")?.value.trim() || "";
//     const postImageInput = document.getElementById("post-image");
//     const postimage = postImageInput?.files?.[0];

//     if (!title && !body && !postimage) {
//         showAlert("Please enter title, body, or select an image", "info");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("body", body);
//     if (postimage) {
//         formData.append("image", postimage);
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//         showAlert("You must be logged in to add a post", "danger");
//         return;
//     }

//     // Disable the button temporarily
//     const addBtn = document.querySelector("#addbutton");
//     addBtn.disabled = true;

//     axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {
//         headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//         showAlert("Post added successfully!", "success");
//         const container = document.getElementById("posts");
//         container.prepend(createPostCard(response.data.data));

//         // Reset form
//         document.getElementById("post-title").value = "";
//         document.getElementById("post-body").value = "";
//         postImageInput.value = ""; // مهم جدًا لإعادة تهيئة الملف

//         bootstrap.Modal.getInstance(document.getElementById("add-modal"))?.hide();
//     })
//     .catch(error => {
//         console.error(error.response || error);
//         showAlert(error.response?.data?.message || "Something went wrong", "danger");
//     })
//     .finally(() => {
//         addBtn.disabled = false; // re-enable button
//     });
// }
function addNewPostUser() {
    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    const imageInput = document.getElementById("post-image");
    const imageFile = imageInput.files[0];

    if (!title && !body && !imageFile) {
        showAlert("Please enter title, body, or select an image", "info");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("You must be logged in to add a post", "danger");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageFile) formData.append("image", imageFile);

    axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
        document.getElementById("posts").prepend(createPostCard(res.data.data));

        // إعادة تهيئة الفورم
        document.getElementById("post-title").value = "";
        document.getElementById("post-body").value = "";
        imageInput.value = "";

        bootstrap.Modal.getInstance(document.getElementById("add-modal"))?.hide();
        showAlert("Post added successfully!", "success");
    })
    .catch(err => {
        console.error(err);
        showAlert("Error adding post!", "danger");
    });
}



// =====================
// LOGIN FUNCTION
// =====================
function buttonLoginClick() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;

    axios.post("https://tarmeezacademy.com/api/v1/login", { username, password })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            bootstrap.Modal.getInstance(document.getElementById("login-modal")).hide();
            setui();
            showAlert("Logged in successfully!", "success");
        })
        .catch(() => {
            showAlert("Invalid username or password", "danger");
        });
}

// =====================
// REGISTER FUNCTION
// =====================
function buttonRegisterClick() {
    const username = document.getElementById("register-username-input").value;
    const name = document.getElementById("register-name-input").value;
    const password = document.getElementById("register-password-input").value;

    axios.post("https://tarmeezacademy.com/api/v1/register", { username, name, password })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            bootstrap.Modal.getInstance(document.getElementById("register-modal")).hide();
            showAlert("Registered successfully!", "success");
        })
        .catch(() => {
            showAlert("Registration failed!", "danger");
        });
}

// =====================
// LOGOUT
// =====================
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setui();
    showAlert("Logged out", "info");
}

// =====================
// ON PAGE LOAD
// =====================
document.addEventListener("DOMContentLoaded", () => {
    setui();
    getPosts();
});
