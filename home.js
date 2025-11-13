
 setui();
function getPosts() {
  axios.get("https://tarmeezacademy.com/api/v1/posts")
    .then(response => {
      const posts = response.data.data;
      const container = document.getElementById("posts");
      container.innerHTML = "";

      for (let post of posts) {

        // post image
        let postImage = "";
        if (post.image) {
          postImage = `<img src="${post.image}" class="card-img-top mb-3" />`;
        }

        // profile image
       let profileImage = post.author.profile_image
  ? post.author.profile_image
  : './images/imgprofile.png';


        const content = `
          <div class="card my-3">
            <div class="card-body">

              <!-- Profile Section -->
              <div class="d-flex align-items-center mb-3">
                <img src="${profileImage}" 
                     style="width:40px;height:40px;border-radius:50%;"
                     class="me-2 border" />
                <h5 class="mb-0">${post.author.username}</h5>
              </div>

              <!-- Post Body -->
              <p>${post.body || "No content"}</p>

              <!-- Post Image -->
              ${postImage}

              <!-- Footer -->
              <div class="d-flex justify-content-between text-muted mt-3">
                <span>${post.comments_count} Comments</span>
                <span>Created: ${post.created_at}</span>
              </div>

            </div>
          </div>
        `;

        container.innerHTML += content;
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      document.getElementById("posts").innerHTML =
        "<p class='text-danger'>حدث خطأ أثناء جلب البوستات.</p>";
    });
}

// Call posts on page load
getPosts();


// =====================
// Login FUNCTION
// =====================

function buttonLoginClick() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  axios.post("https://tarmeezacademy.com/api/v1/login", {
    username,
    password
  })
  .then(response => {

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    const modal = document.getElementById("login-model");
    const modalInstance = bootstrap.Modal.getInstance(modal);

    if (modalInstance) modalInstance.hide();

    
    setTimeout(() => {
       setui();
      alert("Login Successful!");
    }, 300);


  })
  .catch(error => {
    console.error("Login failed:", error);
    alert("فشل تسجيل الدخول");
  });
}
function setui(){
  const token=localStorage.getItem("token");
  const loginbutton=document.getElementById("lodded-div" );
  
  const logoutbutton =document.getElementById("logout-div");

if(token==null)
{
logoutbutton.style.setProperty("display","none","important")
loginbutton.style.setProperty("display","block","important")

}
else{
loginbutton.style.setProperty("display","none","important")
logoutbutton.style.setProperty("display","block","important")
}
}
function logout(){

localStorage.removeItem("token");
localStorage.removeItem("user");
setui();
alert("logged out successfully")




}