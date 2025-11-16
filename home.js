// =====================
// UI SETUP
// =====================
// =====================
// UI SETUP
// =====================
function setui() {
    const token = localStorage.getItem("token");
    const loginDiv = document.getElementById("logged-out-div");
    const logoutDiv = document.getElementById("logout-div");

    if (!token) {
        // login + register ظاهرين
        loginDiv.style.setProperty("display", "flex", "important");
        // logout مخفي
        logoutDiv.style.setProperty("display", "none", "important");
    } else {
        // login + register مخفيين
        loginDiv.style.setProperty("display", "none", "important");
        // logout ظاهر
        logoutDiv.style.setProperty("display", "flex", "important");
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
    alertEl.innerHTML = `<div style="font-size:20px; margin-right:10px;">
                             ${type === "success" ? "✅" : type === "info" ? "ℹ️" : "❌"}
                         </div>
                         <div>${message}</div>`;
    alertsDiv.appendChild(alertEl);

    setTimeout(() => {
        alertsDiv.removeChild(alertEl);
    }, 5000);
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
                const postImage = post.image ? `<img src="${post.image}" class="card-img-top mb-3" />` : "";
                const profileImage = post.author.profile_image || './images/imgprofile.png';

                let tagsHtml = "";
                if (post.tags && post.tags.length > 0) {
                    tagsHtml = post.tags.map(tag => 
                        `<button class="btn btn-sm rounded-5 me-1" style="background-color: gray; color: white;">${tag.name}</button>`
                    ).join("");
                } else {
                    tagsHtml = `<span>No Tags</span>`;
                }

                const content = `
                  <div class="card my-3">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-3">
                        <img src="${profileImage}" style="width:40px;height:40px;border-radius:50%;" class="me-2 border" />
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
                  </div>
                `;

                container.innerHTML += content;
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById("posts").innerHTML =
                "<p class='text-danger'>حدث خطأ أثناء جلب البوستات.</p>";
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

            const modal = document.getElementById("login-modal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();

            setui();
            showAlert("You Logged in Successfully", "success");
        })
        .catch(error => {
            console.error("Login failed:", error);
            showAlert("Enter a correct username and password", "danger");
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
            const modal = document.getElementById("register-modal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();

            showAlert("Registered Successfully! You can login now.", "success");
        })
        .catch(error => {
            console.error("Register failed:", error);
            showAlert("Registration failed. Try again.", "danger");
        });
}

// =====================
// LOGOUT FUNCTION
// =====================
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setui();
    showAlert("You Logged Out Successfully", "info");
}

// =====================
// INITIALIZE
// =====================
document.addEventListener("DOMContentLoaded", () => {
    setui();
    getPosts();
});
