$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("#signup-form");
    var emailInput = $("#signup_email");
    var firstNameInput = $("#first_name");
    var lastNameInput = $("#last_name");
    var facNameInput = $("#signup_facname");
    var facAddressInput = $("#signup_address");
    var facPhoneInput = $("#signup_phone");
    var facIDInput = $("#signup_fac");
    var passwordInput = $("#signup_password");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        facName: facNameInput.val().trim(),
        facAddress: facAddressInput.val().trim(),
        facPhone: facPhoneInput.val().trim(),
        facID: facIDInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.facName || !userData.facAddress || !userData.facPhone || !userData.facID) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.facName, userData.facAddress, userData.facPhone, userData.facID);
      emailInput.val("");
      passwordInput.val("");
      firstNameInput.val("");
      lastNameInput.val("");
      facNameInput.val("");
      facAddressInput.val("");
      facPhoneInput.val("");
      facIDInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, firstName, lastName, facName, facAddress, facPhone, facID) {
      $.post("/api/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        facName: facName,
        facAddress: facAddress,
        facPhone: facPhone,
        facID: facID,
      })
        .then(function(data) {
          window.location.replace("/dashboard");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  