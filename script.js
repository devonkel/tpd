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
            document.getElementById("sys").innerHTML = '<h2><p>System Metrics</p></h2>';
            document.getElementById("reg1").innerHTML = '<h2><p>Region 1</p></h2>';
            document.getElementById("reg2").innerHTML = '<h2><p>Region 2</p></h2>';
            document.getElementById("reg3").innerHTML = '<h2><p>Region 3</p></h2>';
            document.getElementById("reg4").innerHTML = '<h2><p>Region 4</p></h2>';
            document.getElementById("reg5").innerHTML = '<h2><p>Region 5</p></h2>';
            document.getElementById("reg6").innerHTML = '<h2><p>Region 6</p></h2>';
            for(i=0; i<=data.length-1; i++) {
                console.log('Region', data[i].region);
                document.getElementById("sys").innerHTML += '<h3><p>Region ' + data[i].region + ' - ' + data[i].regionData[0].station + '  - ' + data[i].regionData[0].lastUpdDt + '</p><h3>';
                switch (data[i].region)
                {
                    case "1": document.getElementById("reg1").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    break;
                    case "2": document.getElementById("reg2").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    break;
                    case "3": document.getElementById("reg3").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    break;
                    case "4": document.getElementById("reg4").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    break;
                    case "5": document.getElementById("reg5").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    break;
                    case "6": document.getElementById("reg6").innerHTML += '<h3><p> ' + data[i].regionData[0].station + ' - ' + data[i].regionData[0].lastUpdDt + '</p></h3>';
                    default: console.log('Bad Region in data');
                    break;
                }
                console.log('Region: ' + data[i].region + ' Station: ' + data[i].regionData[0].station + ' LUD: ' + data[i].regionData[0].lastUpdDt);
                currentRegion= data[i].region;
        };
    }
)};
});