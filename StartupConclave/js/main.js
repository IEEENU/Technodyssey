         $('.div-box').height($(window).height());

/*     $('.icons-set ul li img').hide();
    $('#make').waypoint(function(direction) {
        var lis=$('.icons-set ul li img');
        var i = 0;
            (function displayImages() {
                lis.eq(i++).fadeIn(150, displayImages);

            })();
        return false;
    });
*/


  
        
    

         /**
 * cbpScroller.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */


 /*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


;( function( window ) {
     
    'use strict';
 
    var docElem = window.document.documentElement;
 
    function getViewportH() {
        var client = docElem['clientHeight'],
            inner = window['innerHeight'];
         
        if( client < inner )
            return inner;
        else
            return client;
    }
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
 
    // http://stackoverflow.com/a/5598797/989439
    function getOffset( el ) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if ( !isNaN( el.offsetTop ) ) {
                offsetTop += el.offsetTop;
            }
            if ( !isNaN( el.offsetLeft ) ) {
                offsetLeft += el.offsetLeft;
            }
        } while( el = el.offsetParent )
 
        return {
            top : offsetTop,
            left : offsetLeft
        }
    }
 
    function inViewport( el, h ) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom = elTop + elH,
            // if 0, the element is considered in the viewport as soon as it enters.
            // if 1, the element is considered in the viewport only when it's fully inside
            // value in percentage (1 >= h >= 0)
            h = h || 0;
 
        return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
    }
 
    function extend( a, b ) {
        for( var key in b ) { 
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
 
    function cbpScroller( el, options ) {   
        this.el = el;
        this.options = extend( this.defaults, options );
        this._init();
    }
 
    cbpScroller.prototype = {
        defaults : {
            // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
            // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
            // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
            viewportFactor : 0.2
        },
        _init : function() {
            if( Modernizr.touch ) return;
            this.sections = Array.prototype.slice.call( this.el.querySelectorAll( '.cbp-so-section' ) );
            this.didScroll = false;
 
            var self = this;
            // the sections already shown...
            this.sections.forEach( function( el, i ) {
                if( !inViewport( el ) ) {
                    classie.add( el, 'cbp-so-init' );
                }
            } );
 
            var scrollHandler = function() {
                    if( !self.didScroll ) {
                        self.didScroll = true;
                        setTimeout( function() { self._scrollPage(); }, 60 );
                    }
                },
                resizeHandler = function() {
                    function delayed() {
                        self._scrollPage();
                        self.resizeTimeout = null;
                    }
                    if ( self.resizeTimeout ) {
                        clearTimeout( self.resizeTimeout );
                    }
                    self.resizeTimeout = setTimeout( delayed, 200 );
                };
 
            window.addEventListener( 'scroll', scrollHandler, false );
            window.addEventListener( 'resize', resizeHandler, false );
        },
        _scrollPage : function() {
            var self = this;
 
            this.sections.forEach( function( el, i ) {
                if( inViewport( el, self.options.viewportFactor ) ) {
                    classie.add( el, 'cbp-so-animate' );
                }
                else {
                    // this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scroll
                    classie.add( el, 'cbp-so-init' );
                     
                    classie.remove( el, 'cbp-so-animate' );
                }
            });
            this.didScroll = false;
        }
    }
 
    // add to global namespace
    window.cbpScroller = cbpScroller;
 
} )( window );


var h = $('.div-box').height($(window).height());
var controller = $.superscrollorama();

controller.addTween('#rep', 
  TweenMax.from($('#man'),.5,{
    css:{left: -120, top: h,opacity:0}}),0, 200);

controller.addTween('#rep', 
  TweenMax.from($('#table'),.5,{
    css:{left: 120, top: h,opacity:0}}),0, 200);

controller.addTween('#rep', 
  TweenMax.from($('#box'),.5,{
    css:{bottom: 00, top: 200,opacity:0}}),0, 200);


var fnames = new Array();var ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';
try {
    var jqueryLoaded=jQuery;
    jqueryLoaded=true;
} catch(err) {
    var jqueryLoaded=false;
}
var head= document.getElementsByTagName('head')[0];
if (!jqueryLoaded) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
    head.appendChild(script);
    if (script.readyState && script.onload!==null){
        script.onreadystatechange= function () {
              if (this.readyState == 'complete') mce_preload_check();
        }    
    }
}
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';
head.appendChild(script);
var err_style = '';
try{
    err_style = mc_custom_error_style;
} catch(e){
    err_style = '#mc_embed_signup input.mce_inline_error{border-color:#6B0505;} #mc_embed_signup div.mce_inline_error{margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff;}';
}
var head= document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type= 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = err_style;
} else {
  style.appendChild(document.createTextNode(err_style));
}
head.appendChild(style);
setTimeout('mce_preload_check();', 250);

var mce_preload_checks = 0;
function mce_preload_check(){
    if (mce_preload_checks>40) return;
    mce_preload_checks++;
    try {
        var jqueryLoaded=jQuery;
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    try {
        var validatorLoaded=jQuery("#fake-form").validate({});
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    mce_init_form();
}
function mce_init_form(){
    jQuery(document).ready( function($) {
      var options = { errorClass: 'mce_inline_error', errorElement: 'div', onkeyup: function(){}, onfocusout:function(){}, onblur:function(){}  };
      var mce_validator = $("#mc-embedded-subscribe-form").validate(options);
      $("#mc-embedded-subscribe-form").unbind('submit');//remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator
      options = { url: 'http://startupfestival.us6.list-manage.com/subscribe/post-json?u=c254d2f28a12931d45f133340&id=a02c0eb698&c=?', type: 'GET', dataType: 'json', contentType: "application/json; charset=utf-8",
                    beforeSubmit: function(){
                        $('#mce_tmp_error_msg').remove();
                        $('.datefield','#mc_embed_signup').each(
                            function(){
                                var txt = 'filled';
                                var fields = new Array();
                                var i = 0;
                                $(':text', this).each(
                                    function(){
                                        fields[i] = this;
                                        i++;
                                    });
                                $(':hidden', this).each(
                                    function(){
                                        var bday = false;
                                        if (fields.length == 2){
                                            bday = true;
                                            fields[2] = {'value':1970};//trick birthdays into having years
                                        }
                                        if ( fields[0].value=='MM' && fields[1].value=='DD' && (fields[2].value=='YYYY' || (bday && fields[2].value==1970) ) ){
                                            this.value = '';
                                        } else if ( fields[0].value=='' && fields[1].value=='' && (fields[2].value=='' || (bday && fields[2].value==1970) ) ){
                                            this.value = '';
                                        } else {
                                            if (/\[day\]/.test(fields[0].name)){
                                                this.value = fields[1].value+'/'+fields[0].value+'/'+fields[2].value;                                           
                                            } else {
                                                this.value = fields[0].value+'/'+fields[1].value+'/'+fields[2].value;
                                            }
                                        }
                                    });
                            });
                        return mce_validator.form();
                    }, 
                    success: mce_success_cb
                };
      $('#mc-embedded-subscribe-form').ajaxForm(options);
      
      
    });
}
function mce_success_cb(resp){
    $('#mce-success-response').hide();
    $('#mce-error-response').hide();
    if (resp.result=="success"){
        $('#mce-'+resp.result+'-response').show();
        $('#mce-'+resp.result+'-response').html(resp.msg);
        $('#mc-embedded-subscribe-form').each(function(){
            this.reset();
        });
    } else {
        var index = -1;
        var msg;
        try {
            var parts = resp.msg.split(' - ',2);
            if (parts[1]==undefined){
                msg = resp.msg;
            } else {
                i = parseInt(parts[0]);
                if (i.toString() == parts[0]){
                    index = parts[0];
                    msg = parts[1];
                } else {
                    index = -1;
                    msg = resp.msg;
                }
            }
        } catch(e){
            index = -1;
            msg = resp.msg;
        }
        try{
            if (index== -1){
                $('#mce-'+resp.result+'-response').show();
                $('#mce-'+resp.result+'-response').html(msg);            
            } else {
                err_id = 'mce_tmp_error_msg';
                html = '<div id="'+err_id+'" style="'+err_style+'"> '+msg+'</div>';
                
                var input_id = '#mc_embed_signup';
                var f = $(input_id);
                if (ftypes[index]=='address'){
                    input_id = '#mce-'+fnames[index]+'-addr1';
                    f = $(input_id).parent().parent().get(0);
                } else if (ftypes[index]=='date'){
                    input_id = '#mce-'+fnames[index]+'-month';
                    f = $(input_id).parent().parent().get(0);
                } else {
                    input_id = '#mce-'+fnames[index];
                    f = $().parent(input_id).get(0);
                }
                if (f){
                    $(f).append(html);
                    $(input_id).focus();
                } else {
                    $('#mce-'+resp.result+'-response').show();
                    $('#mce-'+resp.result+'-response').html(msg);
                }
            }
        } catch(e){
            $('#mce-'+resp.result+'-response').show();
            $('#mce-'+resp.result+'-response').html(msg);
        }
    }
}
