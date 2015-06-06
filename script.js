$(function () {
//    setInterval(function () {
//        pollServer();
//    }, 3000);
    pollServer();
    
    function pollServer() {
        $.ajax({
            url: "/data",
            context: document.body
        }).done(function (data) {
            var j = 0;
            $('#regiont').html ('');
            $('#stations').html ('');
            for (i=0; i< data.length; i++) {
                if (data[i].region != j) {
                    j = data[i].region;
                    $('#regiont').append('<<tr><td><h2>Region ' + j + '</h2></td></tr>');
                }
//                    $('#record-count').html ('<h2>' + data[i].region + '</h2');
//            $('#stations').html('');
//                $('#stations').append(rows(data[k].regionData[0]));
                               $('#regiont').append(rows(i, data[i].region, data[i].regionData[0]));
            }
        }).fail(function (a, b) {
//            alert('Error: ' + b);
        });
    }
    
    function rows(k, region, record) {
        return '<tr>' +
            '<td class="col-md-2"><h4>' + k + ':*' + region + '* ' + record.station + '</h4></td>' +
            '<td id="station"><h4>' + record.lastUpdDt + '</h4></td>' +
            '</tr>';
    }
});