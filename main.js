 const $siteList = $('.siteList'); 
 // console.log($siteList)
 const $lastLi=$siteList.find('li.last');
 const x=localStorage.getItem('x'); 
//  console.log('x')
//  console.log(x)
 const xObject=JSON.parse(x);
  // console.log('xObject')
  // console.log(xObject)
 const hashMap =  xObject  ||
 [
       { 
        logo: 'A',//logoType:'text',
        url: 'https://www.acfun.cn'}, // url:url
      {logo: 'B',//logo: './images/bilibili.png',
      url: 'https://www.bilibili.com'}
];
const simplifyUrl = (url) =>{
  return url.replace("https://","")
            .replace("http://","")
            .replace("www.","")
            .replace(/\/.*/,"")// 删除 / 开头的内容
            // .replace("com","")
            // .replace("cn","")

}
const render = () =>{
  $siteList.find('li:not(.last)').remove();
   hashMap.forEach((node,index)=>{
    //  console.log(index)
  const $li =$(
    `<li>\n
         
            <div class="site">\n
              <div class="logo">${node.logo}</div>\n
               <div class="link">${simplifyUrl(node.url)}</div>\n
                 <div class="close">\n
                 <svg class="icon" >\n
                 <use xlink:href="#icon-close"></use>\n
                  </svg>\n
                  </div>\n
               </div>\n
         
  </li>`).insertBefore($lastLi)
  $li.on('click',()=>{
    window.open(node.url)
  })
  $li.on('click','.close',(e)=>{
    // console.log('这里执行了')
    // console.log(hasMap)
    e.stopPropagation() 
    hashMap.splice(index,1)
    render();
    
  })

  })
 };
   render();
$('.addButton').on('click', ()=>
 {
  let url=window.prompt('请问你要添加的网址是啥?')
  if(url.indexOf('http')!==0)
  {
    // console.log(1)
    // alert('请输入http开头的网址')
    url ='https://'+url;
    //  console.log(url)
  }
    hashMap.push(
      {
        //logo:url[0],
        logo:simplifyUrl(url)[0],//logo:simplifyUrl(url)[0].toUpperCase(),
        //logoType:'text',
        url:url
      })
       render();
 })
 window.onbeforeunload = ()=>{
  //  console.log('页面要关闭了')
   const string = JSON.stringify(hashMap)
  //  console.log(typeof hasMap)
  //  console.log(hasMap)
  //  console.log(typeof string)
  //  console.log(string)
  localStorage.setItem('x',string)
 }
$(document).on("keypress",  (e)=> {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      render();
      window.open(hashMap[i].url);
    }
  }
});