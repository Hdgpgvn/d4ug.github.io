const btn = document.getElementById("time-butn");
const timeText = document.getElementById("time-display");
const resetBtn = document.getElementById("reset-butn");
var tbs = 0;
var tbm = 0;
var tbmr = 0;
var tbmv = 0;
var tbmrv = 0;
var tbms = 0;
var times = 0;
var maxTimes = 0;
var isStart = false;
var isPause = false;
var isRest = false;
btn.addEventListener("click", starts);
resetBtn.addEventListener("click", reset);
function reset() {
    
    isStart = false;
    isRest = false;
    document.getElementById("display").style.backgroundColor = "white";
    times = 1;
    isPause = false;
    tbs = 0;
    tbms = 0;
    btn.innerHTML = "Bắt đầu";
    timeText.innerHTML = "00:00";
    clearInterval(timeHd);
}
function timeHandle(){
    if (tbms <= 0){
        tbs-=1;
        tbms=10;
        if (tbs < 0) {
            tbs=59;
            tbm-=1;
            if (tbm < 0){
                if (!isRest){
                    isRest = true;
                    document.getElementById("display").style.backgroundColor = "green";
                    tbm = tbmrv;
                    tbs = 0;
                    tbms = 0;
                } else {
                    isRest = false;
                    document.getElementById("display").style.backgroundColor = "red";
                    tbm = tbmv;
                    tbs = 0;
                    tbms = 0;
                    times +=1;
                    if (times >= maxTimes){
                        clearInterval(timeHd);
                        isStart = false;
                        isPause = false;
                        btn.innerHTML = "Bắt đầu";
                        document.getElementById("display").style.backgroundColor = "white";
                        timeText.innerHTML = "00:00";
                    }
                }
                
            }
        }
    }
    tbms-=1;
    var second = '';
    if (tbs < 10) {
        second = '0';
    } else {
        second ='';
    }
    timeText.innerHTML = tbm + ":" + second + tbs;
    //console.log(tbm, " ",tbs, " ",tbms);
}
let timeHd = setInterval(timeHandle, 100);
clearInterval(timeHd);
function starts(){
    
    if (!isStart){
        
        
       
        
        times = 1;
        maxTimes = document.getElementById("time").value;
        
        tbmv = document.getElementById("minute-do").value;
        tbm = tbmv;
        tbmrv = document.getElementById("minute-rest").value;
        tbmr = tbmrv;
        tbs = 0;
        tbms = 0;
        if ((tbmv <= 0) || (tbmrv <= 0) || (maxTimes <= 0)) {
            alert("Số không hợp lệ, hãy thử lại!");

            return ;
        }
        btn.innerHTML = "Dừng lại";
        isStart = true;
        isRest = false;
        isPause = false;
        document.getElementById("display").style.backgroundColor = "red";
        timeHd = setInterval(timeHandle, 100);
        
    } else if (isStart){
        if (!isPause){
            isPause = true;
            btn.innerHTML = "Tiếp tục";
            clearInterval(timeHd);
        } else if (isStart) {
            isPause = false;
            btn.innerHTML = "Dừng lại";
            timeHd = setInterval(timeHandle, 100);
            
        }
    }
}


