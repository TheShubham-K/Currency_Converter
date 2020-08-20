

let url="https://openexchangerates.org/api/",
currency='currencies.json',
latest='latest.json',
api_key='6d0ae2a5d72649a8ad895ed9c0bddaf6';

var fromname=document.getElementById('from-name');
var fromnamevalue=document.getElementById('from-name-value');
var toname=document.getElementById('to-name');
var tonamevalue=document.getElementById('to-name-value');
var convertbutton=document.getElementById('convert');
var refreshbutton=document.getElementById('refresh');



window.onload=function(){
    fetch(url+currency+'?app_id='+api_key)
    .then(data => data.json())
        .then(obj =>{
        let arr = [];
            for (let key in obj) {
                arr.push(`<option value=${key} ${(key === 'INR') ? 'selected' : ''}>[${key}] ${obj[key]}</option>`);
            }
        
        fromname.innerHTML=arr.join('');
        toname.innerHTML=arr.join('');
        
    })
    .catch(err => console.log(err));
}

convertbutton.addEventListener('click',()=>{
   fetch(url + latest + '?app_id=' + api_key)
            .then(data => data.json())
            .then(obj => {
                let x = obj.rates[fromname.value],
                    y = obj.rates[toname.value];
                tonamevalue.value = (fromnamevalue.value * y) / x;

                tonamevalue.innerHTML = y / x;
            })
            .catch(err => {
                alert('Api Call Was Faliure.');
                console.log('error: ' + err);
                
                tonamevalue.innerHTML = 'Currency';
            });
});

refreshbutton.addEventListener('click',()=>{
location.reload();
});