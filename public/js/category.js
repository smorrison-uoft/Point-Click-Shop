var router = require("router");

$(document).ready(function () {

  readCat();

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
  categoryDescInput.val("Personal");
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
    if (updating) {
      newCategory.id = categoryId;
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
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post,
    }).then(function () {
      window.location.href = "/administrative";
    });
  }

  function readCat() {
    // Create all our routes and set up logic within those routes where required.
    router.get("/", function (req, res) {
      Category.all(function (data) {
        var hbsObject = {
          category_hbs: data,
        };
        console.log(hbsObject);
        res.render("category", hbsObject);
      });
    });
  }
  
});
