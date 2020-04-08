$(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      $("#member-name").text(data.firstName);
      $("#member-lname").text(data.lastName);
      $("#member-facName").text(data.facName);
      $("#member-facAddress").text(data.facAddress);
      $("#member-facPhone").text(data.facPhone);
      $("#member-facID").text(data.facID);
      console.log(data);
    });
  });
  