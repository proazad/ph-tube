const blogPage = ()=>{
    const url = location.href;
    console.log(url);
    if('http://127.0.0.1:3000/index.html' === url){
      location.href = "blog.html"
    }else{
      location.href = "index.html"
    }
  }