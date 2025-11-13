

axios.get("https://tarmeezacademy.com/api/v1/posts")
  .then(response => {
    const posts = response.data.data;
    const container = document.getElementById("posts");
    container.innerHTML = "";

    for (let post of posts) {
      let postImage = "";
      if (post.image) {
        if (typeof post.image === "string") {
          postImage = `<img src="${post.image}" alt="post image" class="card-img-top mb-3">`;
        } else if (typeof post.image === "object" && post.image.url) {
          postImage = `<img src="${post.image.url}" alt="post image" class="card-img-top mb-3">`;
        }
      }

      let profileImage = "";
      if (post.author.profile_image) {
        if (typeof post.author.profile_image === "string") {
          profileImage = post.author.profile_image;
        } else if (typeof post.author.profile_image === "object" && post.author.profile_image.url) {
          profileImage = post.author.profile_image.url;
        }
      }

      const content = `
        <div class="card post-card my-3">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <img src="${profileImage}" alt="profile" class="profile-img me-2" style="width:40px;height:40px;border-radius:50%;">
              <h5 class="card-title mb-0">${post.author.username}</h5>
            </div>
            <p class="card-text">${post.body || "No content"}</p>
            ${postImage}
            <div class="d-flex justify-content-between align-items-center">
              <a href="#" class="btn btn-primary btn-sm">Like</a>
              <div class="d-flex align-items-center gap-1">
                <span class="text-muted">${post.comments_count || 0} Comments</span>
               
               
              </div>
            
<div class="d-flex align-items-center gap-1">
                <span class="text-muted">${ ' CRAETED AT:       '+post.author.created_at}</span>
               
               
              </div>
            </div>
          </div>
        </div>
      `;

      const fragment = document.createDocumentFragment();
      const div = document.createElement("div");
      div.innerHTML = content;
      fragment.appendChild(div.firstElementChild);
      container.appendChild(fragment);
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
    document.getElementById("posts").innerHTML = "<p>حدث خطأ أثناء جلب البوستات.</p>";
  });
 function buttonLoginClick() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  const params = {
    username: username,
    password: password
  };

  axios.post("https://tarmeezacademy.com/api/v1/login", params)
    .then(response => {
      console.log("Login successful:", response.data);
      // هنا ممكن تحفظي التوكن أو تعملي redirect
      // مثال:
      // localStorage.setItem("token", response.data.token);
    })
    .catch(error => {
      console.error("Login failed:", error.response ? error.response.data : error);
      alert("فشل تسجيل الدخول، تحقق من بياناتك");
    });
}
