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
                        '<td><a class="modal-trigger donate-link" href="#receipt-modal" data-id="'+ data[i].id +'">' + data[i].title + '</a></td>' + 
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
                        '<td><a class="modal-trigger req-link" href="#receipt-modal" data-id="'+ data[i].id +'">' + data[i].title + '</a></td>' + 
                        '<td>' + data[i].description + '</td>'+
                        '<td>' + data[i].category + '</td>' +
                        '<td>' + data[i].quantity + '</td>' +
                        '<td>' + approvedCheck + '</td>' +
                        '</tr>';
            requestTable.append(tableRow);
        }
    });

    setTimeout(function(){
        $(".donate-link").on("click", function(){
            var donateID = $(this).attr("data-id");
            console.log(donateID);
            $.get("/api/products/").then(function(data) {
                    var approvedCheck = "";
                    if(data[donateID].vendorID){
                        approvedCheck = "Yes";
                    }
                    else{
                        approvedCheck = "No";
                    }
                    var receiptTable = $("#receipt-table");
                    var tableRow = '<tr>' +
                                '<td><a class="modal-trigger req-link" href="#receipt-modal" data-id="'+ data[i].id +'">' + data[donateID].title + '</a></td>' + 
                                '<td>' + data[donateID].description + '</td>'+
                                '<td>' + data[donateID].category + '</td>' +
                                '<td>' + data[donateID].quantity + '</td>' +
                                '<td>' + approvedCheck + '</td>' +
                                '</tr>';
                    receiptTable.append(tableRow);
                
            });
        })
    }, 1000)
});