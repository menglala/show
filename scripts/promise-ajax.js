function ajax_promise({url,type='get',dataType='json'}) {
    return new Promise((resolve,reject)=>{
        var xhr=new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.responseType=dataType;
        xhr.send();
        xhr.onload=()=>{
            if (xhr.readyState===200) {
                resolve(xhr.response);
            }else{
                reject(err);
            }
        }
    })
}