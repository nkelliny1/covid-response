$(document).ready(function() {
    // Getting references to our form and input

    $.get("/api/requests").then(function(data) {
        for(var i = 0; i < data.length; i++){
            var approvedCheck = "";
            var disButton = "";
            if(data[i].vendorID){
                approvedCheck = "Yes";
                disButton = "disabled";
            }
            else{
                approvedCheck = "No";
                disButton = "";
            }
            var requestTable = $("#request-table");
            var tableRow = '<tr>' +
                        '<td>' + data[i].title + '</td>' + 
                        '<td>' + data[i].description + '</td>'+
                        '<td>' + data[i].category + '</td>' +
                        '<td>' + data[i].quantity + '</td>' +
                        '<td>' + approvedCheck + '</td>' +
                        '<td><a class="waves-effect waves-light req-button btn-small" value="' + data[i].id + '"' + disButton + '>Contribute</a></td>'
                        '</tr>';
            requestTable.append(tableRow);
        }
    });

    setTimeout(function(){ 
        $( ".req-button" ).click(function() {
            var newRequest = {
                vendorID: parseInt($("#member-id").text())
            }
            newRequest.id = $(this).attr("value");
            $.ajax({
                method: "PUT",
                url: "/api/requests",
                data: newRequest
              })
                .then(function() {
                  window.location.href = "/requests";
                });
            console.log($(this).attr("value"));
          });
    }, 500);

    setTimeout(function(){ 
        var requestSearch = $("#request-search");
        requestSearch.on("submit", function(event) {
            event.preventDefault();
            var query = $("#search").val().trim();
            var url = "/api/requests/" + query;
            console.log(url);
            $("#request-table").empty();
            $.get(url).then(function(data) {
                for(var i = 0; i < data.length; i++){
                    var approvedCheck = "";
                    var disButton = "";
                    if(data[i].vendorID){
                        approvedCheck = "Yes";
                        disButton = "disabled";
                    }
                    else{
                        approvedCheck = "No";
                        disButton = "";
                    }
                    var requestTable = $("#request-table");
                    var tableRow = '<tr>' +
                                '<td>' + data[i].title + '</td>' + 
                                '<td>' + data[i].description + '</td>'+
                                '<td>' + data[i].category + '</td>' +
                                '<td>' + data[i].quantity + '</td>' +
                                '<td>' + approvedCheck + '</td>' +
                                '<td><a class="waves-effect waves-light req-button btn-small" value="' + data[i].id + '"' + disButton + '>Contribute</a></td>'
                                '</tr>';
                    requestTable.append(tableRow);
                }
            });
        });
    }, 500);

    var requestForm = $("#request-form");
    var titleInput = $("#title");
    var categoryInput = $("#category");
    var descriptionInput = $("#description");
    var quantityInput = $("#quantity");
    var recIDInput = $("#member-id");

   

  
    // When the signup button is clicked, we validate the email and password are not blank
    requestForm.on("submit", function(event) {
      event.preventDefault();
      var requestData = {
        title: titleInput.val().trim(),
        category: categoryInput.val().trim(),
        description: descriptionInput.val().trim(),
        quantity: quantityInput.val().trim(),
        recID: parseInt(recIDInput.text()),
      };
  
      // If we have an email and password, run the signUpUser function
      addRequest(requestData.title, requestData.category, requestData.description, requestData.quantity, requestData.recID);
      titleInput.val("");
      categoryInput.val("");
      descriptionInput.val("");
      quantityInput.val("");
      recIDInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function addRequest(title, category, description, quantity, recID) {
      $.post("/api/make_request", {
        title: title,
        category: category,
        description: description,
        quantity: quantity,
        recID: recID,
      })
        .then(function(data) {
          window.location.replace("/requests");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleAddRequestErr);
    }
  
    function handleAddRequestErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  