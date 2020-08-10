console.log("Js file linked correctly");

    //local storage stores a string
    var json_data = JSON.parse( localStorage.getItem('json_data') );

// checks if empty and populates list from localStorage
    if (json_data) {
      json_data.forEach(element => {
        if (element) {
          newTodo(element.title, element.id);
        }
      });
    }

registerEventListeners();

// allows delete buttons to remove list items
function registerEventListeners() {
  $(".delete").on("click", function(){
        var todoId = $(this).parent().attr('data-id');
        deleteTodo(todoId);
      });
}

    function deleteTodo(todoId) {
      $("li[data-id="+todoId+"]").slideUp(); //can use .remove() or .fadeOut()
      var json_temp = JSON.parse( localStorage.getItem('json_data') );

      delete json_temp[todoId];
      localStorage.setItem('json_data', JSON.stringify(json_temp) );
    }

// for new todo form
function newTodo(todoTitle, todoId) {
      if (!todoTitle && !todoId) {
        todoTitle = document.getElementById("todoTitle").value;
        if (todoTitle) {
            var todoId = storeTodoLocal(todoTitle);
          }
        }
        if (todoTitle) {
          var todoHTML = '<li style="display:none" data-id="' + todoId + '">' + todoTitle + '<a href="#" class="btn btn-sm btn-danger m-1 delete">Delete</a></li>';
          $("#todo-list").append(todoHTML);
          $("li[data-id="+todoId+"]").fadeIn();
          registerEventListeners();
        }

    }

//to store todos
  function storeTodoLocal(todoTitle) {

    // retrieve and parse existing JSON from localstorage
    var json_temp = JSON.parse( localStorage.getItem('json_data') );

    if (!json_temp) {
      json_temp = [];
    }

    // creating a new todo ID based on length of existing localstorage array
    var todoId = json_temp.length;

    // add new todo object to JSON
    json_temp.push({
      "id": todoId,
      "title": todoTitle,
      "completed": false
    });

    // log updated JSON to console
    console.log(json_temp);

    // stringify updated JSON and store back in localStorage
    localStorage.setItem('json_data', JSON.stringify(json_temp));

      // return ID of new todo
      return todoId;

  }

  function deleteAllTodos() {
    if (confirm("Are you sure you want to delete all of your Todos?")) {
        localStorage.removeItem('json_data');
        $("#todo-list").empty();
      }
    }
