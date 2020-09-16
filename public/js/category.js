$(document).ready(function () {
  var tempCategoryId = "";

  var catContainer = $(".catContainer");

  var postCategorySelect = $("#category");

  $(document).on("click", "button.delete", handleCategoryDelete);

  $(document).on("click", "button.edit", handleCategoryEdit);
  // postCategorySelect.on("change", handleCategoryChange);
  // var posts;

  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var categoryId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?category_id=") !== -1) {
    categoryId = url.split("=")[1];
    getCategoryData(categoryId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var categoryNameInput = $("#cat_name");
  //var idInput = $("#title");
  var catForm = $("#cat_form");
  var categoryDescInput = $("#cat_desc");
  // Giving the postCategorySelect a default value
  //categoryDescInput.val("Personal");
  // Adding an event listener for when the form is submitted
  $(catForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!categoryNameInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newCategory = {
      // id: idInput.val(),
      category_name: categoryNameInput.val().trim(),
      category_desc: categoryDescInput.val().trim(),
    };

    console.log(newCategory);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    // createUpdateCategory(updating) 
    if (updating) {
      newCategory.id = tempCategoryId;
      updatePost(newCategory);
    } else {
      submitPost(newCategory);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/category/", Post, function () {
      window.location.href = "/category";
    });
  }

  accessDB();

  // Gets post data for a post if we're editing
  function getCategoryData(id) {
    $.get("/api/category/" + id, function (data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        // idInput.val(data.title);
        categoryNameInput.val(data.category_name);
        categoryDescInput.val(data.category_desc);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
        // updatePost();
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/category",
      data: post,
    }).then(function () {
      accessDB();
    });
  }
  
  function accessDB(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/category" + categoryString, function(data) {
      console.log("Category", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  function initializeRows() {
    catContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    catContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.category_name + " " + post.category_desc + " ");
    newPostBody.text(post.body);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  function displayEmpty() {
    catContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
    catContainer.append(messageH2);
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/category/" + id
    })
      .then(function() {
        accessDB(postCategorySelect.val());
      });
  }

  function handleCategoryDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleCategoryEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
      tempCategoryId = currentPost.id;
    getCategoryData(currentPost.id);
  }

});
