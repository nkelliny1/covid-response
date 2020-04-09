$(document).ready(function() {
    // Getting references to our form and input
        $.get("/api/products").then(function(data) {
            for(var i = 0; i < data.length; i++){
                var approvedCheck = "";
                var disButton = "";
                if(data[i].recID){
                    approvedCheck = "No";
                    disButton = "disabled";
                }
                else{
                    approvedCheck = "Yes";
                    disButton = "";
                }
                var donateTable = $("#donate-table");
                var tableRow = '<tr>' +
                            '<td>' + data[i].title + '</td>' + 
                            '<td>' + data[i].description + '</td>'+
                            '<td>' + data[i].category + '</td>' +
                            '<td>' + data[i].quantity + '</td>' +
                            '<td>' + approvedCheck + '</td>' +
                            '<td><a class="waves-effect waves-light req-button btn-small" value="' + data[i].id + '"' + disButton + '>Request</a></td>'
                            '</tr>';
                donateTable.append(tableRow);
            }
        });

        setTimeout(function(){ 
            $( ".req-button" ).click(function() {
                var newRequest = {
                    recID: parseInt($("#member-id").text())
                }
                newRequest.id = $(this).attr("value");
                $.ajax({
                    method: "PUT",
                    url: "/api/products",
                    data: newRequest
                  })
                    .then(function() {
                      window.location.href = "/inventory";
                    });
                console.log($(this).attr("value"));
              });
        }, 500);

    var donateForm = $("#donate-form");
    var titleInput = $("#title");
    var categoryInput = $("#category");
    var descriptionInput = $("#description");
    var quantityInput = $("#quantity");
    var vendorIDInput = $("#member-id");
  
    // When the signup button is clicked, we validate the email and password are not blank
    donateForm.on("submit", function(event) {
      event.preventDefault();
      var productData = {
        title: titleInput.val().trim(),
        category: categoryInput.val().trim(),
        description: descriptionInput.val().trim(),
        quantity: quantityInput.val().trim(),
        vendorID: parseInt(vendorIDInput.text()),
      };
  
      // If we have an email and password, run the signUpUser function
      addProduct(productData.title, productData.category, productData.description, productData.quantity, productData.vendorID);
      titleInput.val("");
      categoryInput.val("");
      descriptionInput.val("");
      quantityInput.val("");
      vendorIDInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function addProduct(title, category, description, quantity, vendorID) {
      $.post("/api/donate", {
        title: title,
        category: category,
        description: description,
        quantity: quantity,
        vendorID: vendorID,
      })
        .then(function(data) {
          window.location.replace("/inventory");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleAddProductErr);
    }
  
    function handleAddProductErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  