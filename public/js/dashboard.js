$(document).ready(function() {
    var memberID = $("#member-id").text();
    var prodURL = "/api/user_products/" + memberID;
    $.get(prodURL).then(function(data) {
        for(var i = 0; i < data.length; i++){
            var approvedCheck = "";
            if(data[i].recID){
                approvedCheck = "No";
            }
            else{
                approvedCheck = "Yes";
            }
            var donateTable = $("#donate-table");
            var tableRow = '<tr>' +
                        '<td>' + data[i].title + '</td>' + 
                        '<td>' + data[i].description + '</td>'+
                        '<td>' + data[i].category + '</td>' +
                        '<td>' + data[i].quantity + '</td>' +
                        '<td>' + approvedCheck + '</td>' +
                        '</tr>';
            donateTable.append(tableRow);
        }
    });
    $.get("/api/user_requests/" + memberID).then(function(data) {
        for(var i = 0; i < data.length; i++){
            var approvedCheck = "";
            if(data[i].vendorID){
                approvedCheck = "Yes";
            }
            else{
                approvedCheck = "No";
            }
            var requestTable = $("#request-table");
            var tableRow = '<tr>' +
                        '<td>' + data[i].title + '</td>' + 
                        '<td>' + data[i].description + '</td>'+
                        '<td>' + data[i].category + '</td>' +
                        '<td>' + data[i].quantity + '</td>' +
                        '<td>' + approvedCheck + '</td>' +
                        '</tr>';
            requestTable.append(tableRow);
        }
    });
});