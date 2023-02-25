

var xlabels = [];
var counts = [];
var times = [];
var inputDate = document.getElementById("mydate").value;

// async function getDate(){
// 	inputDate = document.getElementById("mydate").value;
// 	itemDate = inputDate;
// }

async function chartIt(){
await getData();


let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
}
let chartStatus2 = Chart.getChart("canvas2"); // <canvas> id
    if (chartStatus2 != undefined) {
        chartStatus2.destroy();
}



const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('canvas2');
inputDate = document.getElementById("mydate").value;


new Chart(ctx, {
type: 'bar',
data: {
    labels: xlabels,
    datasets: [
        {
            label: 'Scheduled',
            data: Object.values(counts),
            borderWidth: 1
        }
    ]
}
});

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["9am to 12pm","12pm to 3pm","3pm to 6pm","6pm to 9pm"],
        datasets: [
            {
                label: 'Scheduled',
                data: Object.values(times),
                borderWidth: 1
            }
        ]
    }
});
}
chartIt();
async function getData() {
    const response = await fetch('P2VO.json');
    const data = await response.json();
    xlabels = [];
    counts = [];
    times = [];
    data.forEach(elt => {
        const schedule_date = elt.schedule_time.split(" ")[0];
        const schedule_time = elt.schedule_time.split(" ")[1];
        const hrs = schedule_time.split(":")[0];
        const item_date = elt.item_date;
        
        if(item_date == inputDate ){
            // xlabels.push(schedule_date);
            if(isNaN(counts[schedule_date])) counts[schedule_date] = 1;
            else counts[schedule_date] += 1;

        }

        if(schedule_date == inputDate ){
            if(hrs >= 9 && hrs < 12){
                if(isNaN(times["9am to 12pm"])) times["9am to 12pm"] = 1;
                else times["9am to 12pm"] += 1;
            }
            else if(hrs >12 && hrs<=3){
                if(isNaN(times["12pm to 3pm"])) times["12pm to 3pm"] = 1;
                else times["12pm to 3pm"] += 1;					
            }
            else if(hrs >3 && hrs<=6){
                if(isNaN(times["3pm to 6pm"])) times["3pm to 6pm"] = 1;
                else times["3pm to 6pm"] += 1;					
            }
            else if(hrs >6 && hrs<=9){
                if(isNaN(times["6pm to 9pm"])) times["6pm to 9pm"] = 1;
                else times["6pm to 9pm"] += 1;					
            }
        }
        // console.log(schedule_date, item_date);
    });
    for(var key in counts) { 
        
        xlabels.push(key); 
    }
    console.log(counts);
    console.log(times);
}

function removeDuplicates(arr) {
    var unique = [];
    for(i=0; i < arr.length; i++){  
        if(unique.indexOf(arr[i]) === -1) {  
            unique.push(arr[i]);  
        }  
    }
    return unique;
}