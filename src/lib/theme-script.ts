export const themeScript = `
  !function(){
    try {
      var d=document.documentElement;
      var e=localStorage.getItem('theme-mode');
      if(e){
        if(e === 'system'){
          var t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
          d.setAttribute('data-bs-theme',t)
        }else{
          d.setAttribute('data-bs-theme',e)
        }
      }
    } catch (t) {}
  }()
`
