/***** start of polyfill function *****/
window.matchMedia = window.matchMedia || (function(doc, undefined){
  
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');
  
  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none!important";
  fakeBody.appendChild(div);
  
  return function(q){
    //&shy; = soft hyphen
    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
    
    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;
    docElem.removeChild(fakeBody);
    
    return { matches: bool, media: q };
  };
  
})(document);
/***** end of polyfill function *****/


var Utils = {
// toggle function from before
	classToggle : function(element, tclass) {
		var classes = element.className,
		pattern = new RegExp( tclass );
		hasClass = pattern.test( classes );
		//toggle the class
		classes = hasClass ? classes.replace( pattern, '' ) : classes + ' ' + tclass;
		element.className = classes.trim();
	},
//function to help select elements: takes a selector and returns the elements
//that match it.
	q : function(q, res) {
		if (document.querySelectorAll) {
          res = document.querySelectorAll(q);
        } else {
			var d = document,
            a = d.styleSheets[0] || d.createStyleSheet();
          a.addRule(q,'f:b');
          for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
            l[b].currentStyle.f && c.push(l[b]);

          a.removeRule(0);
          res = c;
        }
        return res;
	}
}



window.onload = function() {
	//get elements involved with expanding and collapsing the navigation sidebar
	var sidebar = document.getElementById('sidebar');
	var content = document.getElementById('content');
	var expand = document.getElementById('expand-arrow');
	var collapse = document.getElementById('collapse-arrow');
	var searchbox = document.getElementById('cse-search-box');
	var header = document.getElementById('header');
	var aside = document.getElementById('aside');
	collapse.style.display = 'none';
	

	expand.onclick = function() {
		//on clicking the expand arrow, display the navigation sidebar
		sidebar.style.display = 'block';
		
		//hide the content, expand arrow, and search box
		content.style.display = 'none';
		aside.style.display = 'none';
		expand.style.display = 'none';
		searchbox.style.display = 'none';
		
		//display the collapse arrow, and move the header content to the right
		collapse.style.display = '';
		header.style.textAlign = 'right';		
	};
	
	collapse.onclick = function() {
		//on clicking the collapse arrow, hide the navigation sidebar and collapse arrow
		sidebar.style.display = 'none';
		collapse.style.display = 'none';
		
		//show the content, expand arrow, and search box
		content.style.display = '';
		aside.style.display = '';
		expand.style.display = '';
		searchbox.style.display = '';
		
		//move header contents to the left
		header.style.textAlign = 'left';

	};
	
	//reformat the page if at a large resolution
	if (window.matchMedia("(min-width: 75em)").matches) {
		//moves the navigation icons to be a right-page column
		var extraNav = document.getElementById('extra-nav');
		var page = document.getElementById('page');
		page.appendChild(extraNav);
	}
	
	//load images after page formatting
	if (window.matchMedia("(min-width: 34.375em)").matches) {
		//grab any element with 'data-src' attribute using util 'q' above
		var lazy = Utils.q('[data-src]');
		for (var i = 0; i < lazy.length; i++) {
			//create a new image for each element selected using value of
			//data-src attribute
			var source = lazy[i].getAttribute('data-src'); 
			//create the image
			var img = new Image();
			img.src = source;
			img.setAttribute("class", "extra-img");
			//insert it inside of the link as first element within the link
			lazy[i].insertBefore(img, lazy[i].firstChild);
		}
	}

}

//adjust the page layout if the window is resized
window.onresize = function() {

	if (window.matchMedia("(min-width: 75em)").matches) {
		//moves the navigation icons to be a right-page column
		var extraNav = document.getElementById('extra-nav');
		var page = document.getElementById('page');
		page.appendChild(extraNav);
	}
	else {
		//moves the navigation icons to the bottom of the page
		var extraNav = document.getElementById('extra-nav');
		var aside = document.getElementById('aside');
		var footer = document.getElementById('footer');
		aside.insertBefore(extraNav, footer);
	}

}