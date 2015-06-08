$(function () {
    setInterval(function () {
        pollServer();
    }, 15000);
    pollServer();
    
    function pollServer() {
        $.ajax({
            url: "/data",
            context: document.body
        }).done(function (data) {
            var currentRegion, html;
//            document.getElementById("dynamic").innerHTML = '';
            for(i=0; i<=data.length-1; i++) {
                console.log('Region', data[i].region);
                if(currentRegion != data[i].region) {
                    if(i != 0) {
                        html += "</table>";
                    }
                    html +="<p><h2>Region " + data[i].region+"</h2>";
                    html+="<table class='table'>";
                }
                data[i].regionData.forEach(function(region, idx) {
                    html+="<tr><td>Station:"+region.station+"</td><td>"+region.lastUpdDt+"</td></tr>";
                    console.log(idx, region.station, region.lastUpdDt);
                });
                
                currentRegion= data[i].region;
            }
            html += "</table>";
            document.getElementById("dynamic").innerHTML = html;
//            $('#dynamic').append(html);
        });
    }
    
    function rows(k, region, record) {
        return '<tr>' +
            '<td class="col-md-2"><h4>' + k + ':*' + region + '* ' + record.station + '</h4></td>' +
            '<td id="station"><h4>' + record.lastUpdDt + '</h4></td>' +
            '</tr>';
    }
});