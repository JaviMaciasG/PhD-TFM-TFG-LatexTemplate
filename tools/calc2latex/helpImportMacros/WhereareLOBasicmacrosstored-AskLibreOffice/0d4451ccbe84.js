/*
	jQuery TextAreaResizer plugin
	Created on 17th January 2008 by Ryan O'Dell
	Version 1.0.4
*/(function($){var textarea,staticOffset;var iLastMousePos=0;var iMin=32;var grip;$.fn.TextAreaResizer=function(){return this.each(function(){textarea=$(this).addClass('processed'),staticOffset=null;$(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').bind("mousedown",{el:this},startDrag));var grippie=$('div.grippie',$(this).parent())[0];grippie.style.marginRight=(grippie.offsetWidth-$(this)[0].offsetWidth)+'px'})};function startDrag(e){textarea=$(e.data.el);textarea.blur();iLastMousePos=mousePosition(e).y;staticOffset=textarea.height()-iLastMousePos;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}function performDrag(e){var iThisMousePos=mousePosition(e).y;var iMousePos=staticOffset+iThisMousePos;if(iLastMousePos>=(iThisMousePos)){iMousePos-=5}iLastMousePos=iThisMousePos;iMousePos=Math.max(iMin,iMousePos);textarea.height(iMousePos+'px');if(iMousePos<iMin){endDrag(e)}return false}function endDrag(e){$(document).unbind('mousemove',performDrag).unbind('mouseup',endDrag);textarea.css('opacity',1);textarea.focus();textarea=null;staticOffset=null;iLastMousePos=0}function mousePosition(e){return{x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop}}})(jQuery);
/*
 *	TypeWatch 2.0 - Original by Denny Ferrassoli / Refactored by Charles Christolini
 *  Copyright(c) 2007 Denny Ferrassoli - DennyDotNet.com
 *  Coprright(c) 2008 Charles Christolini - BinaryPie.com
 *  Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
*/(function(jQuery){jQuery.fn.typeWatch=function(o){var options=jQuery.extend({wait:750,callback:function(){},highlight:true,captureLength:2},o);function checkElement(timer,override){var elTxt=jQuery(timer.el).val();if((elTxt.length>options.captureLength&&elTxt.toUpperCase()!=timer.text)||(override&&elTxt.length>options.captureLength)){timer.text=elTxt.toUpperCase();timer.cb(elTxt)}};function watchElement(elem){if(elem.type.toUpperCase()=="TEXT"||elem.nodeName.toUpperCase()=="TEXTAREA"){var timer={timer:null,text:jQuery(elem).val().toUpperCase(),cb:options.callback,el:elem,wait:options.wait};if(options.highlight){jQuery(elem).focus(function(){this.select()})}var startWatch=function(evt){var timerWait=timer.wait;var overrideBool=false;if(evt.keyCode==13&&this.type.toUpperCase()=="TEXT"){timerWait=1;overrideBool=true}var timerCallbackFx=function(){checkElement(timer,overrideBool)};clearTimeout(timer.timer);timer.timer=setTimeout(timerCallbackFx,timerWait)};jQuery(elem).keydown(startWatch)}};return this.each(function(index){watchElement(this)})}})(jQuery);
/*
Ajax upload
*/jQuery.extend({createUploadIframe:function(d,b){var a="jUploadFrame"+d;if(window.ActiveXObject){var c=document.createElement('<iframe id="'+a+'" name="'+a+'" />');if(typeof b=="boolean"){c.src="javascript:false"}else{if(typeof b=="string"){c.src=b}}}else{var c=document.createElement("iframe");c.id=a;c.name=a}c.style.position="absolute";c.style.top="-1000px";c.style.left="-1000px";document.body.appendChild(c);return c},createUploadForm:function(g,b){var e="jUploadForm"+g;var a="jUploadFile"+g;var d=$('<form  action="" method="POST" name="'+e+'" id="'+e+'" enctype="multipart/form-data"></form>');var c=$("#"+b);var f=$(c).clone();$(c).attr("id",a);$(c).before(f);$(c).appendTo(d);$(d).css("position","absolute");$(d).css("top","-1200px");$(d).css("left","-1200px");$(d).appendTo("body");return d},ajaxFileUpload:function(k){k=jQuery.extend({},jQuery.ajaxSettings,k);var a=new Date().getTime();var b=jQuery.createUploadForm(a,k.fileElementId);var i=jQuery.createUploadIframe(a,k.secureuri);var h="jUploadFrame"+a;var j="jUploadForm"+a;if(k.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}var c=false;var f={};if(k.global){jQuery.event.trigger("ajaxSend",[f,k])}var d=function(l){var p=document.getElementById(h);try{if(p.contentWindow){f.responseText=p.contentWindow.document.body?p.contentWindow.document.body.innerText:null;f.responseXML=p.contentWindow.document.XMLDocument?p.contentWindow.document.XMLDocument:p.contentWindow.document}else{if(p.contentDocument){f.responseText=p.contentDocument.document.body?p.contentDocument.document.body.textContent||document.body.innerText:null;f.responseXML=p.contentDocument.document.XMLDocument?p.contentDocument.document.XMLDocument:p.contentDocument.document}}}catch(o){jQuery.handleError(k,f,null,o)}if(f||l=="timeout"){c=true;var m;try{m=l!="timeout"?"success":"error";if(m!="error"){var n=jQuery.uploadHttpData(f,k.dataType);if(k.success){k.success(n,m)}if(k.global){jQuery.event.trigger("ajaxSuccess",[f,k])}}else{jQuery.handleError(k,f,m)}}catch(o){m="error";jQuery.handleError(k,f,m,o)}if(k.global){jQuery.event.trigger("ajaxComplete",[f,k])}if(k.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}if(k.complete){k.complete(f,m)}jQuery(p).unbind();setTimeout(function(){try{$(p).remove();$(b).remove()}catch(q){jQuery.handleError(k,f,null,q)}},100);f=null}};if(k.timeout>0){setTimeout(function(){if(!c){d("timeout")}},k.timeout)}try{var b=$("#"+j);$(b).attr("action",k.url);$(b).attr("method","POST");$(b).attr("target",h);if(b.encoding){b.encoding="multipart/form-data"}else{b.enctype="multipart/form-data"}$(b).submit()}catch(g){jQuery.handleError(k,f,null,g)}if(window.attachEvent){document.getElementById(h).attachEvent("onload",d)}else{document.getElementById(h).addEventListener("load",d,false)}return{abort:function(){}}},uploadHttpData:function(r,type){var data=!type;data=type=="xml"||data?r.responseXML:r.responseText;if(type=="script"){jQuery.globalEval(data)}if(type=="json"){eval("data = "+data)}if(type=="html"){jQuery("<div>").html(data).evalScripts()}return data}});
/**
 * Upload call. Used only once in the wmd file upload
 * this is used in the wmd file uploader and the
 * askbots image and attachment upload plugins
 * @todo refactor this code to "new style"
 */
function ajaxFileUpload(options) {

    var spinner = options['spinner'];
    var uploadInputId = options['uploadInputId'];
    var urlInput = $(options['urlInput']);
    var startUploadHandler = options['startUploadHandler'];

    spinner.ajaxStart(function(){
        $(this).show();
    }).ajaxComplete(function(){
        $(this).hide();
    });

    /* important!!! upload input must be loaded by id
     * because ajaxFileUpload monkey-patches the upload form */
    $('#' + uploadInputId).ajaxStart(function(){
        $(this).hide();
    }).ajaxComplete(function(){
        $(this).show();
    });

    //var localFilePath = upload_input.val();
    $.ajaxFileUpload({
        url: askbot['urls']['upload'],
        secureuri: false,
        fileElementId: uploadInputId,
        dataType: 'xml',
        success: function (data, status) {

            var fileURL = $(data).find('file_url').text();
            /*
            * hopefully a fix for the "fakepath" issue
            * https://www.mediawiki.org/wiki/Special:Code/MediaWiki/83225
            */
            fileURL = fileURL.replace(/\w:.*\\(.*)$/,'$1');
            var error = $(data).find('error').text();
            if(error != ''){
                alert(error);
            } else {
                urlInput.attr('value', fileURL);
            }

            /* re-install this as the upload extension
             * will remove the handler to prevent double uploading
             * this hack is a manipulation around the
             * ajaxFileUpload jQuery plugin. */
            $('#' + uploadInputId).unbind('change').change(startUploadHandler);
        },
        error: function (data, status, e) {
            if (startUploadHandler){
                /* re-install this as the upload extension
                * will remove the handler to prevent double uploading */
                $('#' + uploadInputId).unbind('change').change(startUploadHandler);
            }
        }
    });
    return false;
};

/* ===================================================
 * bootstrap-transition.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  $(function () {

    "use strict"

    /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
     * ======================================================= */

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined

      return support && {
        end: (function () {
          var transitionEnd = "TransitionEnd"
          if ( $.browser.webkit ) {
          	transitionEnd = "webkitTransitionEnd"
          } else if ( $.browser.mozilla ) {
          	transitionEnd = "transitionend"
          } else if ( $.browser.opera ) {
          	transitionEnd = "oTransitionEnd"
          }
          return transitionEnd
        }())
      }
    })()

  })

}( window.jQuery );
/* =========================================================
 * bootstrap-modal.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );
/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function( $ ){

  "use strict"

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()
      !isActive && $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-scrollspy.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

  "use strict"

  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body').on('click.scroll.data-api', this.selector, process)
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        this.targets = this.$body
          .find(this.selector)
          .map(function () {
            var href = $(this).attr('href')
            return /^#\w/.test(href) && $(href).length ? href : null
          })

        this.offsets = $.map(this.targets, function (id) {
          return $(id).position().top
        })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active

        this.activeTarget = target

        this.$body
          .find(this.selector).parent('.active')
          .removeClass('active')

        active = this.$body
          .find(this.selector + '[href="' + target + '"]')
          .parent('li')
          .addClass('active')

        if ( active.parent('.dropdown-menu') )  {
          active.closest('li.dropdown').addClass('active')
        }
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}( window.jQuery );
/* ========================================================
 * bootstrap-tab.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function( $ ){

  "use strict"

 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      $this.trigger({
        type: 'show'
      , relatedTarget: previous
      })

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}( window.jQuery );
/* ===========================================================
 * bootstrap-tooltip.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function ( type, element, options ) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) {
        self.show()
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show()
          }
        }, self.options.delay.show)
      }
    }

  , leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = (title || '').toString().replace(/(^\s*|\s*$)/, "")

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , delay: 0
  , selector: false
  , placement: 'top'
  , trigger: 'hover'
  , title: ''
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  }

}( window.jQuery );
/* ===========================================================
 * bootstrap-popover.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      content = content.toString().replace(/(^\s*|\s*$)/, "")

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}( window.jQuery );
/* ==========================================================
 * bootstrap-alert.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function ( el ) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype = {

    constructor: Alert

  , close: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.trigger('close')

      e && e.preventDefault()

      $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

      $parent
        .trigger('close')
        .removeClass('in')

      function removeElement() {
        $parent
          .trigger('closed')
          .remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
        $parent.on($.support.transition.end, removeElement) :
        removeElement()
    }

  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}( window.jQuery );
/* ============================================================
 * bootstrap-button.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype = {

      constructor: Button

    , setState: function ( state ) {
        var d = 'disabled'
          , $el = this.$element
          , data = $el.data()
          , val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
          state == 'loadingText' ?
            $el.addClass(d).attr(d, d) :
            $el.removeClass(d).removeAttr(d)
        }, 0)
      }

    , toggle: function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent
          .find('.active')
          .removeClass('active')

        this.$element.toggleClass('active')
      }

  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-collapse.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Collapse = function ( element, options ) {
  	this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options["parent"]) {
      this.$parent = $(this.options["parent"])
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension = this.dimension()
        , scroll = $.camelCase(['scroll', dimension].join('-'))
        , actives = this.$parent && this.$parent.find('.in')
        , hasData

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', 'show', 'shown')
      this.$element[dimension](this.$element[0][scroll])

    }

  , hide: function () {
      var dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', 'hide', 'hidden')
      this.$element[dimension](0)
    }

  , reset: function ( size ) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function ( method, startEvent, completeEvent ) {
      var that = this
        , complete = function () {
            if (startEvent == 'show') that.reset()
            that.$element.trigger(completeEvent)
          }

      this.$element
        .trigger(startEvent)
        [method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  	}

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
  	}

  }

  /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}( window.jQuery );
/* ==========================================================
 * bootstrap-carousel.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.carousel.defaults, options)
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function () {
      this.interval = setInterval($.proxy(this.next, this), this.options.interval)
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function () {
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger('slide')
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      } else {
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.trigger('slide')
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = typeof option == 'object' && option
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-typeahead.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Typeahead = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(val)
      this.$element.change();
      return this.hide()
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        if (that.matcher(item)) return item
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}( window.jQuery );
var Markdown;

if (typeof exports === "object" && typeof require === "function") // we're in a CommonJS (e.g. Node.js) module
    Markdown = exports;
else
    Markdown = {};
    
// The following text is included for historical reasons, but should
// be taken with a pinch of salt; it's not all true anymore.

//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//


//
// Usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Markdown.Converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//

(function () {

    function identity(x) { return x; }
    function returnFalse(x) { return false; }

    function HookCollection() { }

    HookCollection.prototype = {

        chain: function (hookname, func) {
            var original = this[hookname];
            if (!original)
                throw new Error("unknown hook " + hookname);

            if (original === identity)
                this[hookname] = func;
            else
                this[hookname] = function (text) {
                    var args = Array.prototype.slice.call(arguments, 0);
                    args[0] = original.apply(null, args);
                    return func.apply(null, args);
                };
        },
        set: function (hookname, func) {
            if (!this[hookname])
                throw new Error("unknown hook " + hookname);
            this[hookname] = func;
        },
        addNoop: function (hookname) {
            this[hookname] = identity;
        },
        addFalse: function (hookname) {
            this[hookname] = returnFalse;
        }
    };

    Markdown.HookCollection = HookCollection;

    // g_urls and g_titles allow arbitrary user-entered strings as keys. This
    // caused an exception (and hence stopped the rendering) when the user entered
    // e.g. [push] or [__proto__]. Adding a prefix to the actual key prevents this
    // (since no builtin property starts with "s_"). See
    // http://meta.stackoverflow.com/questions/64655/strange-wmd-bug
    // (granted, switching from Array() to Object() alone would have left only __proto__
    // to be a problem)
    function SaveHash() { }
    SaveHash.prototype = {
        set: function (key, value) {
            this["s_" + key] = value;
        },
        get: function (key) {
            return this["s_" + key];
        }
    };

    Markdown.Converter = function () {
        var pluginHooks = this.hooks = new HookCollection();
        
        // given a URL that was encountered by itself (without markup), should return the link text that's to be given to this link
        pluginHooks.addNoop("plainLinkText");
        
        // called with the orignal text as given to makeHtml. The result of this plugin hook is the actual markdown source that will be cooked
        pluginHooks.addNoop("preConversion");
        
        // called with the text once all normalizations have been completed (tabs to spaces, line endings, etc.), but before any conversions have
        pluginHooks.addNoop("postNormalization");
        
        // Called with the text before / after creating block elements like code blocks and lists. Note that this is called recursively
        // with inner content, e.g. it's called with the full text, and then only with the content of a blockquote. The inner
        // call will receive outdented text.
        pluginHooks.addNoop("preBlockGamut");
        pluginHooks.addNoop("postBlockGamut");
        
        // called with the text of a single block element before / after the span-level conversions (bold, code spans, etc.) have been made
        pluginHooks.addNoop("preSpanGamut");
        pluginHooks.addNoop("postSpanGamut");
        
        // called with the final cooked HTML code. The result of this plugin hook is the actual output of makeHtml
        pluginHooks.addNoop("postConversion");

        //
        // Private state of the converter instance:
        //

        // Global hashes, used by various utility routines
        var g_urls;
        var g_titles;
        var g_html_blocks;

        // Used to track when we're inside an ordered or unordered list
        // (see _ProcessListItems() for details):
        var g_list_level;

        this.makeHtml = function (text) {

            //
            // Main function. The order in which other subs are called here is
            // essential. Link and image substitutions need to happen before
            // _EscapeSpecialCharsWithinTagAttributes(), so that any *'s or _'s in the <a>
            // and <img> tags get encoded.
            //

            // This will only happen if makeHtml on the same converter instance is called from a plugin hook.
            // Don't do that.
            if (g_urls)
                throw new Error("Recursive call to converter.makeHtml");
        
            // Create the private state objects.
            g_urls = new SaveHash();
            g_titles = new SaveHash();
            g_html_blocks = [];
            g_list_level = 0;

            text = pluginHooks.preConversion(text);

            // attacklab: Replace ~ with ~T
            // This lets us use tilde as an escape char to avoid md5 hashes
            // The choice of character is arbitray; anything that isn't
            // magic in Markdown will work.
            text = text.replace(/~/g, "~T");

            // attacklab: Replace $ with ~D
            // RegExp interprets $ as a special character
            // when it's in a replacement string
            text = text.replace(/\$/g, "~D");

            // Standardize line endings
            text = text.replace(/\r\n/g, "\n"); // DOS to Unix
            text = text.replace(/\r/g, "\n"); // Mac to Unix

            // Make sure text begins and ends with a couple of newlines:
            text = "\n\n" + text + "\n\n";

            // Convert all tabs to spaces.
            text = _Detab(text);

            // Strip any lines consisting only of spaces and tabs.
            // This makes subsequent regexen easier to write, because we can
            // match consecutive blank lines with /\n+/ instead of something
            // contorted like /[ \t]*\n+/ .
            text = text.replace(/^[ \t]+$/mg, "");
            
            text = pluginHooks.postNormalization(text);

            // Turn block-level HTML blocks into hash entries
            text = _HashHTMLBlocks(text);

            // Strip link definitions, store in hashes.
            text = _StripLinkDefinitions(text);

            text = _RunBlockGamut(text);

            text = _UnescapeSpecialChars(text);

            // attacklab: Restore dollar signs
            text = text.replace(/~D/g, "$$");

            // attacklab: Restore tildes
            text = text.replace(/~T/g, "~");

            text = pluginHooks.postConversion(text);

            g_html_blocks = g_titles = g_urls = null;

            return text;
        };

        function _StripLinkDefinitions(text) {
            //
            // Strips link definitions from text, stores the URLs and titles in
            // hash references.
            //

            // Link defs are in the form: ^[id]: url "optional title"

            /*
            text = text.replace(/
                ^[ ]{0,3}\[(.+)\]:  // id = $1  attacklab: g_tab_width - 1
                [ \t]*
                \n?                 // maybe *one* newline
                [ \t]*
                <?(\S+?)>?          // url = $2
                (?=\s|$)            // lookahead for whitespace instead of the lookbehind removed below
                [ \t]*
                \n?                 // maybe one newline
                [ \t]*
                (                   // (potential) title = $3
                    (\n*)           // any lines skipped = $4 attacklab: lookbehind removed
                    [ \t]+
                    ["(]
                    (.+?)           // title = $5
                    [")]
                    [ \t]*
                )?                  // title is optional
                (?:\n+|$)
            /gm, function(){...});
            */

            text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,
                function (wholeMatch, m1, m2, m3, m4, m5) {
                    m1 = m1.toLowerCase();
                    g_urls.set(m1, _EncodeAmpsAndAngles(m2));  // Link IDs are case-insensitive
                    if (m4) {
                        // Oops, found blank lines, so it's not a title.
                        // Put back the parenthetical statement we stole.
                        return m3;
                    } else if (m5) {
                        g_titles.set(m1, m5.replace(/"/g, "&quot;"));
                    }

                    // Completely remove the definition from the text
                    return "";
                }
            );

            return text;
        }

        function _HashHTMLBlocks(text) {

            // Hashify HTML blocks:
            // We only want to do this for block-level HTML tags, such as headers,
            // lists, and tables. That's because we still want to wrap <p>s around
            // "paragraphs" that are wrapped in non-block-level tags, such as anchors,
            // phrase emphasis, and spans. The list of tags we're looking for is
            // hard-coded:
            var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del"
            var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math"

            // First, look for nested blocks, e.g.:
            //   <div>
            //     <div>
            //     tags for inner block must be indented.
            //     </div>
            //   </div>
            //
            // The outermost tags must start at the left margin for this to match, and
            // the inner nested divs must be indented.
            // We need to do this before the next, more liberal match, because the next
            // match will start at the first `<div>` and stop at the first `</div>`.

            // attacklab: This regex can be expensive when it fails.

            /*
            text = text.replace(/
                (                       // save in $1
                    ^                   // start of line  (with /m)
                    <($block_tags_a)    // start tag = $2
                    \b                  // word break
                                        // attacklab: hack around khtml/pcre bug...
                    [^\r]*?\n           // any number of lines, minimally matching
                    </\2>               // the matching end tag
                    [ \t]*              // trailing spaces/tabs
                    (?=\n+)             // followed by a newline
                )                       // attacklab: there are sentinel newlines at end of document
            /gm,function(){...}};
            */
            text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, hashElement);

            //
            // Now match more liberally, simply from `\n<tag>` to `</tag>\n`
            //

            /*
            text = text.replace(/
                (                       // save in $1
                    ^                   // start of line  (with /m)
                    <($block_tags_b)    // start tag = $2
                    \b                  // word break
                                        // attacklab: hack around khtml/pcre bug...
                    [^\r]*?             // any number of lines, minimally matching
                    .*</\2>             // the matching end tag
                    [ \t]*              // trailing spaces/tabs
                    (?=\n+)             // followed by a newline
                )                       // attacklab: there are sentinel newlines at end of document
            /gm,function(){...}};
            */
            text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, hashElement);

            // Special case just for <hr />. It was easier to make a special case than
            // to make the other regex more complicated.  

            /*
            text = text.replace(/
                \n                  // Starting after a blank line
                [ ]{0,3}
                (                   // save in $1
                    (<(hr)          // start tag = $2
                        \b          // word break
                        ([^<>])*?
                    \/?>)           // the matching end tag
                    [ \t]*
                    (?=\n{2,})      // followed by a blank line
                )
            /g,hashElement);
            */
            text = text.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, hashElement);

            // Special case for standalone HTML comments:

            /*
            text = text.replace(/
                \n\n                                            // Starting after a blank line
                [ ]{0,3}                                        // attacklab: g_tab_width - 1
                (                                               // save in $1
                    <!
                    (--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)   // see http://www.w3.org/TR/html-markup/syntax.html#comments and http://meta.stackoverflow.com/q/95256
                    >
                    [ \t]*
                    (?=\n{2,})                                  // followed by a blank line
                )
            /g,hashElement);
            */
            text = text.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, hashElement);

            // PHP and ASP-style processor instructions (<?...?> and <%...%>)

            /*
            text = text.replace(/
                (?:
                    \n\n            // Starting after a blank line
                )
                (                   // save in $1
                    [ ]{0,3}        // attacklab: g_tab_width - 1
                    (?:
                        <([?%])     // $2
                        [^\r]*?
                        \2>
                    )
                    [ \t]*
                    (?=\n{2,})      // followed by a blank line
                )
            /g,hashElement);
            */
            text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, hashElement);

            return text;
        }

        function hashElement(wholeMatch, m1) {
            var blockText = m1;

            // Undo double lines
            blockText = blockText.replace(/^\n+/, "");

            // strip trailing blank lines
            blockText = blockText.replace(/\n+$/g, "");

            // Replace the element text with a marker ("~KxK" where x is its key)
            blockText = "\n\n~K" + (g_html_blocks.push(blockText) - 1) + "K\n\n";

            return blockText;
        }
        
        var blockGamutHookCallback = function (t) { return _RunBlockGamut(t); }

        function _RunBlockGamut(text, doNotUnhash) {
            //
            // These are all the transformations that form block-level
            // tags like paragraphs, headers, and list items.
            //
            
            text = pluginHooks.preBlockGamut(text, blockGamutHookCallback);
            
            text = _DoHeaders(text);

            // Do Horizontal Rules:
            var replacement = "<hr />\n";
            text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, replacement);
            text = text.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, replacement);
            text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, replacement);

            text = _DoLists(text);
            text = _DoCodeBlocks(text);
            text = _DoBlockQuotes(text);
            
            text = pluginHooks.postBlockGamut(text, blockGamutHookCallback);

            // We already ran _HashHTMLBlocks() before, in Markdown(), but that
            // was to escape raw HTML in the original Markdown source. This time,
            // we're escaping the markup we've just created, so that we don't wrap
            // <p> tags around block-level tags.
            text = _HashHTMLBlocks(text);
            text = _FormParagraphs(text, doNotUnhash);

            return text;
        }

        function _RunSpanGamut(text) {
            //
            // These are all the transformations that occur *within* block-level
            // tags like paragraphs, headers, and list items.
            //

            text = pluginHooks.preSpanGamut(text);
            
            text = _DoCodeSpans(text);
            text = _EscapeSpecialCharsWithinTagAttributes(text);
            text = _EncodeBackslashEscapes(text);

            // Process anchor and image tags. Images must come first,
            // because ![foo][f] looks like an anchor.
            text = _DoImages(text);
            text = _DoAnchors(text);

            // Make links out of things like `<http://example.com/>`
            // Must come after _DoAnchors(), because you can use < and >
            // delimiters in inline links like [this](<url>).
            text = _DoAutoLinks(text);
            
            text = text.replace(/~P/g, "://"); // put in place to prevent autolinking; reset now
            
            text = _EncodeAmpsAndAngles(text);
            text = _DoItalicsAndBold(text);

            // Do hard breaks:
            text = text.replace(/  +\n/g, " <br>\n");
            
            text = pluginHooks.postSpanGamut(text);

            return text;
        }

        function _EscapeSpecialCharsWithinTagAttributes(text) {
            //
            // Within tags -- meaning between < and > -- encode [\ ` * _] so they
            // don't conflict with their use in Markdown for code, italics and strong.
            //

            // Build a regex to find HTML tags and comments.  See Friedl's 
            // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.

            // SE: changed the comment part of the regex

            var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;

            text = text.replace(regex, function (wholeMatch) {
                var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
                tag = escapeCharacters(tag, wholeMatch.charAt(1) == "!" ? "\\`*_/" : "\\`*_"); // also escape slashes in comments to prevent autolinking there -- http://meta.stackoverflow.com/questions/95987
                return tag;
            });

            return text;
        }

        function _DoAnchors(text) {
            //
            // Turn Markdown link shortcuts into XHTML <a> tags.
            //
            //
            // First, handle reference-style links: [link text] [id]
            //

            /*
            text = text.replace(/
                (                           // wrap whole match in $1
                    \[
                    (
                        (?:
                            \[[^\]]*\]      // allow brackets nested one level
                            |
                            [^\[]           // or anything else
                        )*
                    )
                    \]

                    [ ]?                    // one optional space
                    (?:\n[ ]*)?             // one optional newline followed by spaces

                    \[
                    (.*?)                   // id = $3
                    \]
                )
                ()()()()                    // pad remaining backreferences
            /g, writeAnchorTag);
            */
            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeAnchorTag);

            //
            // Next, inline-style links: [link text](url "optional title")
            //

            /*
            text = text.replace(/
                (                           // wrap whole match in $1
                    \[
                    (
                        (?:
                            \[[^\]]*\]      // allow brackets nested one level
                            |
                            [^\[\]]         // or anything else
                        )*
                    )
                    \]
                    \(                      // literal paren
                    [ \t]*
                    ()                      // no id, so leave $3 empty
                    <?(                     // href = $4
                        (?:
                            \([^)]*\)       // allow one level of (correctly nested) parens (think MSDN)
                            |
                            [^()\s]
                        )*?
                    )>?                
                    [ \t]*
                    (                       // $5
                        (['"])              // quote char = $6
                        (.*?)               // Title = $7
                        \6                  // matching quote
                        [ \t]*              // ignore any spaces/tabs between closing quote and )
                    )?                      // title is optional
                    \)
                )
            /g, writeAnchorTag);
            */

            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag);

            //
            // Last, handle reference-style shortcuts: [link text]
            // These must come last in case you've also got [link test][1]
            // or [link test](/foo)
            //

            /*
            text = text.replace(/
                (                   // wrap whole match in $1
                    \[
                    ([^\[\]]+)      // link text = $2; can't contain '[' or ']'
                    \]
                )
                ()()()()()          // pad rest of backreferences
            /g, writeAnchorTag);
            */
            text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);

            return text;
        }

        function writeAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
            if (m7 == undefined) m7 = "";
            var whole_match = m1;
            var link_text = m2.replace(/:\/\//g, "~P"); // to prevent auto-linking withing the link. will be converted back after the auto-linker runs
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;

            if (url == "") {
                if (link_id == "") {
                    // lower-case and turn embedded newlines into spaces
                    link_id = link_text.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + link_id;

                if (g_urls.get(link_id) != undefined) {
                    url = g_urls.get(link_id);
                    if (g_titles.get(link_id) != undefined) {
                        title = g_titles.get(link_id);
                    }
                }
                else {
                    if (whole_match.search(/\(\s*\)$/m) > -1) {
                        // Special case for explicit empty url
                        url = "";
                    } else {
                        return whole_match;
                    }
                }
            }
            url = encodeProblemUrlChars(url);
            url = escapeCharacters(url, "*_");
            var result = "<a href=\"" + url + "\"";

            if (title != "") {
                title = attributeEncode(title);
                title = escapeCharacters(title, "*_");
                result += " title=\"" + title + "\"";
            }

            result += ">" + link_text + "</a>";

            return result;
        }

        function _DoImages(text) {
            //
            // Turn Markdown image shortcuts into <img> tags.
            //

            //
            // First, handle reference-style labeled images: ![alt text][id]
            //

            /*
            text = text.replace(/
                (                   // wrap whole match in $1
                    !\[
                    (.*?)           // alt text = $2
                    \]

                    [ ]?            // one optional space
                    (?:\n[ ]*)?     // one optional newline followed by spaces

                    \[
                    (.*?)           // id = $3
                    \]
                )
                ()()()()            // pad rest of backreferences
            /g, writeImageTag);
            */
            text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeImageTag);

            //
            // Next, handle inline images:  ![alt text](url "optional title")
            // Don't forget: encode * and _

            /*
            text = text.replace(/
                (                   // wrap whole match in $1
                    !\[
                    (.*?)           // alt text = $2
                    \]
                    \s?             // One optional whitespace character
                    \(              // literal paren
                    [ \t]*
                    ()              // no id, so leave $3 empty
                    <?(\S+?)>?      // src url = $4
                    [ \t]*
                    (               // $5
                        (['"])      // quote char = $6
                        (.*?)       // title = $7
                        \6          // matching quote
                        [ \t]*
                    )?              // title is optional
                    \)
                )
            /g, writeImageTag);
            */
            text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeImageTag);

            return text;
        }
        
        function attributeEncode(text) {
            // unconditionally replace angle brackets here -- what ends up in an attribute (e.g. alt or title)
            // never makes sense to have verbatim HTML in it (and the sanitizer would totally break it)
            return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        }

        function writeImageTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
            var whole_match = m1;
            var alt_text = m2;
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;

            if (!title) title = "";

            if (url == "") {
                if (link_id == "") {
                    // lower-case and turn embedded newlines into spaces
                    link_id = alt_text.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + link_id;

                if (g_urls.get(link_id) != undefined) {
                    url = g_urls.get(link_id);
                    if (g_titles.get(link_id) != undefined) {
                        title = g_titles.get(link_id);
                    }
                }
                else {
                    return whole_match;
                }
            }
            
            alt_text = escapeCharacters(attributeEncode(alt_text), "*_[]()");
            url = escapeCharacters(url, "*_");
            var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";

            // attacklab: Markdown.pl adds empty title attributes to images.
            // Replicate this bug.

            //if (title != "") {
            title = attributeEncode(title);
            title = escapeCharacters(title, "*_");
            result += " title=\"" + title + "\"";
            //}

            result += " />";

            return result;
        }

        function _DoHeaders(text) {

            // Setext-style headers:
            //  Header 1
            //  ========
            //  
            //  Header 2
            //  --------
            //
            text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,
                function (wholeMatch, m1) { return "<h1>" + _RunSpanGamut(m1) + "</h1>\n\n"; }
            );

            text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,
                function (matchFound, m1) { return "<h2>" + _RunSpanGamut(m1) + "</h2>\n\n"; }
            );

            // atx-style headers:
            //  # Header 1
            //  ## Header 2
            //  ## Header 2 with closing hashes ##
            //  ...
            //  ###### Header 6
            //

            /*
            text = text.replace(/
                ^(\#{1,6})      // $1 = string of #'s
                [ \t]*
                (.+?)           // $2 = Header text
                [ \t]*
                \#*             // optional closing #'s (not counted)
                \n+
            /gm, function() {...});
            */

            text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
                function (wholeMatch, m1, m2) {
                    var h_level = m1.length;
                    return "<h" + h_level + ">" + _RunSpanGamut(m2) + "</h" + h_level + ">\n\n";
                }
            );

            return text;
        }

        function _DoLists(text, isInsideParagraphlessListItem) {
            //
            // Form HTML ordered (numbered) and unordered (bulleted) lists.
            //

            // attacklab: add sentinel to hack around khtml/safari bug:
            // http://bugs.webkit.org/show_bug.cgi?id=11231
            text += "~0";

            // Re-usable pattern to match any entirel ul or ol list:

            /*
            var whole_list = /
                (                                   // $1 = whole list
                    (                               // $2
                        [ ]{0,3}                    // attacklab: g_tab_width - 1
                        ([*+-]|\d+[.])              // $3 = first list item marker
                        [ \t]+
                    )
                    [^\r]+?
                    (                               // $4
                        ~0                          // sentinel for workaround; should be $
                        |
                        \n{2,}
                        (?=\S)
                        (?!                         // Negative lookahead for another list item marker
                            [ \t]*
                            (?:[*+-]|\d+[.])[ \t]+
                        )
                    )
                )
            /g
            */
            var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

            if (g_list_level) {
                text = text.replace(whole_list, function (wholeMatch, m1, m2) {
                    var list = m1;
                    var list_type = (m2.search(/[*+-]/g) > -1) ? "ul" : "ol";

                    var result = _ProcessListItems(list, list_type, isInsideParagraphlessListItem);

                    // Trim any trailing whitespace, to put the closing `</$list_type>`
                    // up on the preceding line, to get it past the current stupid
                    // HTML block parser. This is a hack to work around the terrible
                    // hack that is the HTML block parser.
                    result = result.replace(/\s+$/, "");
                    result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
                    return result;
                });
            } else {
                whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
                text = text.replace(whole_list, function (wholeMatch, m1, m2, m3) {
                    var runup = m1;
                    var list = m2;

                    var list_type = (m3.search(/[*+-]/g) > -1) ? "ul" : "ol";
                    var result = _ProcessListItems(list, list_type);
                    result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
                    return result;
                });
            }

            // attacklab: strip sentinel
            text = text.replace(/~0/, "");

            return text;
        }

        var _listItemMarkers = { ol: "\\d+[.]", ul: "[*+-]" };

        function _ProcessListItems(list_str, list_type, isInsideParagraphlessListItem) {
            //
            //  Process the contents of a single ordered or unordered list, splitting it
            //  into individual list items.
            //
            //  list_type is either "ul" or "ol".

            // The $g_list_level global keeps track of when we're inside a list.
            // Each time we enter a list, we increment it; when we leave a list,
            // we decrement. If it's zero, we're not in a list anymore.
            //
            // We do this because when we're not inside a list, we want to treat
            // something like this:
            //
            //    I recommend upgrading to version
            //    8. Oops, now this line is treated
            //    as a sub-list.
            //
            // As a single paragraph, despite the fact that the second line starts
            // with a digit-period-space sequence.
            //
            // Whereas when we're inside a list (or sub-list), that line will be
            // treated as the start of a sub-list. What a kludge, huh? This is
            // an aspect of Markdown's syntax that's hard to parse perfectly
            // without resorting to mind-reading. Perhaps the solution is to
            // change the syntax rules such that sub-lists must start with a
            // starting cardinal number; e.g. "1." or "a.".

            g_list_level++;

            // trim trailing blank lines:
            list_str = list_str.replace(/\n{2,}$/, "\n");

            // attacklab: add sentinel to emulate \z
            list_str += "~0";

            // In the original attacklab showdown, list_type was not given to this function, and anything
            // that matched /[*+-]|\d+[.]/ would just create the next <li>, causing this mismatch:
            //
            //  Markdown          rendered by WMD        rendered by MarkdownSharp
            //  ------------------------------------------------------------------
            //  1. first          1. first               1. first
            //  2. second         2. second              2. second
            //  - third           3. third                   * third
            //
            // We changed this to behave identical to MarkdownSharp. This is the constructed RegEx,
            // with {MARKER} being one of \d+[.] or [*+-], depending on list_type:
        
            /*
            list_str = list_str.replace(/
                (^[ \t]*)                       // leading whitespace = $1
                ({MARKER}) [ \t]+               // list marker = $2
                ([^\r]+?                        // list item text   = $3
                    (\n+)
                )
                (?=
                    (~0 | \2 ({MARKER}) [ \t]+)
                )
            /gm, function(){...});
            */

            var marker = _listItemMarkers[list_type];
            var re = new RegExp("(^[ \\t]*)(" + marker + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + marker + ")[ \\t]+))", "gm");
            var last_item_had_a_double_newline = false;
            list_str = list_str.replace(re,
                function (wholeMatch, m1, m2, m3) {
                    var item = m3;
                    var leading_space = m1;
                    var ends_with_double_newline = /\n\n$/.test(item);
                    var contains_double_newline = ends_with_double_newline || item.search(/\n{2,}/) > -1;

                    if (contains_double_newline || last_item_had_a_double_newline) {
                        item = _RunBlockGamut(_Outdent(item), /* doNotUnhash = */true);
                    }
                    else {
                        // Recursion for sub-lists:
                        item = _DoLists(_Outdent(item), /* isInsideParagraphlessListItem= */ true);
                        item = item.replace(/\n$/, ""); // chomp(item)
                        if (!isInsideParagraphlessListItem) // only the outer-most item should run this, otherwise it's run multiple times for the inner ones
                            item = _RunSpanGamut(item);
                    }
                    last_item_had_a_double_newline = ends_with_double_newline;
                    return "<li>" + item + "</li>\n";
                }
            );

            // attacklab: strip sentinel
            list_str = list_str.replace(/~0/g, "");

            g_list_level--;
            return list_str;
        }

        function _DoCodeBlocks(text) {
            //
            //  Process Markdown `<pre><code>` blocks.
            //  

            /*
            text = text.replace(/
                (?:\n\n|^)
                (                               // $1 = the code block -- one or more lines, starting with a space/tab
                    (?:
                        (?:[ ]{4}|\t)           // Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width
                        .*\n+
                    )+
                )
                (\n*[ ]{0,3}[^ \t\n]|(?=~0))    // attacklab: g_tab_width
            /g ,function(){...});
            */

            // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
            text += "~0";

            text = text.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
                function (wholeMatch, m1, m2) {
                    var codeblock = m1;
                    var nextChar = m2;

                    codeblock = _EncodeCode(_Outdent(codeblock));
                    codeblock = _Detab(codeblock);
                    codeblock = codeblock.replace(/^\n+/g, ""); // trim leading newlines
                    codeblock = codeblock.replace(/\n+$/g, ""); // trim trailing whitespace

                    codeblock = "<pre><code>" + codeblock + "\n</code></pre>";

                    return "\n\n" + codeblock + "\n\n" + nextChar;
                }
            );

            // attacklab: strip sentinel
            text = text.replace(/~0/, "");

            return text;
        }

        function hashBlock(text) {
            text = text.replace(/(^\n+|\n+$)/g, "");
            return "\n\n~K" + (g_html_blocks.push(text) - 1) + "K\n\n";
        }

        function _DoCodeSpans(text) {
            //
            // * Backtick quotes are used for <code></code> spans.
            // 
            // * You can use multiple backticks as the delimiters if you want to
            //   include literal backticks in the code span. So, this input:
            //     
            //      Just type ``foo `bar` baz`` at the prompt.
            //     
            //   Will translate to:
            //     
            //      <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
            //     
            //   There's no arbitrary limit to the number of backticks you
            //   can use as delimters. If you need three consecutive backticks
            //   in your code, use four for delimiters, etc.
            //
            // * You can use spaces to get literal backticks at the edges:
            //     
            //      ... type `` `bar` `` ...
            //     
            //   Turns to:
            //     
            //      ... type <code>`bar`</code> ...
            //

            /*
            text = text.replace(/
                (^|[^\\])       // Character before opening ` can't be a backslash
                (`+)            // $2 = Opening run of `
                (               // $3 = The code block
                    [^\r]*?
                    [^`]        // attacklab: work around lack of lookbehind
                )
                \2              // Matching closer
                (?!`)
            /gm, function(){...});
            */

            text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
                function (wholeMatch, m1, m2, m3, m4) {
                    var c = m3;
                    c = c.replace(/^([ \t]*)/g, ""); // leading whitespace
                    c = c.replace(/[ \t]*$/g, ""); // trailing whitespace
                    c = _EncodeCode(c);
                    c = c.replace(/:\/\//g, "~P"); // to prevent auto-linking. Not necessary in code *blocks*, but in code spans. Will be converted back after the auto-linker runs.
                    return m1 + "<code>" + c + "</code>";
                }
            );

            return text;
        }

        function _EncodeCode(text) {
            //
            // Encode/escape certain characters inside Markdown code runs.
            // The point is that in code, these characters are literals,
            // and lose their special Markdown meanings.
            //
            // Encode all ampersands; HTML entities are not
            // entities within a Markdown code span.
            text = text.replace(/&/g, "&amp;");

            // Do the angle bracket song and dance:
            text = text.replace(/</g, "&lt;");
            text = text.replace(/>/g, "&gt;");

            // Now, escape characters that are magic in Markdown:
            text = escapeCharacters(text, "\*_{}[]\\", false);

            // jj the line above breaks this:
            //---

            //* Item

            //   1. Subitem

            //            special char: *
            //---

            return text;
        }

        function _DoItalicsAndBold(text) {

            // <strong> must go first:
            text = text.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,
            "$1<strong>$3</strong>$4");

            text = text.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,
            "$1<em>$3</em>$4");

            return text;
        }

        function _DoBlockQuotes(text) {

            /*
            text = text.replace(/
                (                           // Wrap whole match in $1
                    (
                        ^[ \t]*>[ \t]?      // '>' at the start of a line
                        .+\n                // rest of the first line
                        (.+\n)*             // subsequent consecutive lines
                        \n*                 // blanks
                    )+
                )
            /gm, function(){...});
            */

            text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,
                function (wholeMatch, m1) {
                    var bq = m1;

                    // attacklab: hack around Konqueror 3.5.4 bug:
                    // "----------bug".replace(/^-/g,"") == "bug"

                    bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0"); // trim one level of quoting

                    // attacklab: clean up hack
                    bq = bq.replace(/~0/g, "");

                    bq = bq.replace(/^[ \t]+$/gm, "");     // trim whitespace-only lines
                    bq = _RunBlockGamut(bq);             // recurse

                    bq = bq.replace(/(^|\n)/g, "$1  ");
                    // These leading spaces screw with <pre> content, so we need to fix that:
                    bq = bq.replace(
                            /(\s*<pre>[^\r]+?<\/pre>)/gm,
                        function (wholeMatch, m1) {
                            var pre = m1;
                            // attacklab: hack around Konqueror 3.5.4 bug:
                            pre = pre.replace(/^  /mg, "~0");
                            pre = pre.replace(/~0/g, "");
                            return pre;
                        });

                    return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
                }
            );
            return text;
        }

        function _FormParagraphs(text, doNotUnhash) {
            //
            //  Params:
            //    $text - string to process with html <p> tags
            //

            // Strip leading and trailing lines:
            text = text.replace(/^\n+/g, "");
            text = text.replace(/\n+$/g, "");

            var grafs = text.split(/\n{2,}/g);
            var grafsOut = [];
            
            var markerRe = /~K(\d+)K/;

            //
            // Wrap <p> tags.
            //
            var end = grafs.length;
            for (var i = 0; i < end; i++) {
                var str = grafs[i];

                // if this is an HTML marker, copy it
                if (markerRe.test(str)) {
                    grafsOut.push(str);
                }
                else if (/\S/.test(str)) {
                    str = _RunSpanGamut(str);
                    str = str.replace(/^([ \t]*)/g, "<p>");
                    str += "</p>"
                    grafsOut.push(str);
                }

            }
            //
            // Unhashify HTML blocks
            //
            if (!doNotUnhash) {
                end = grafsOut.length;
                for (var i = 0; i < end; i++) {
                    var foundAny = true;
                    while (foundAny) { // we may need several runs, since the data may be nested
                        foundAny = false;
                        grafsOut[i] = grafsOut[i].replace(/~K(\d+)K/g, function (wholeMatch, id) {
                            foundAny = true;
                            return g_html_blocks[id];
                        });
                    }
                }
            }
            return grafsOut.join("\n\n");
        }

        function _EncodeAmpsAndAngles(text) {
            // Smart processing for ampersands and angle brackets that need to be encoded.

            // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
            //   http://bumppo.net/projects/amputator/
            text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");

            // Encode naked <'s
            text = text.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");

            return text;
        }

        function _EncodeBackslashEscapes(text) {
            //
            //   Parameter:  String.
            //   Returns:    The string, with after processing the following backslash
            //               escape sequences.
            //

            // attacklab: The polite way to do this is with the new
            // escapeCharacters() function:
            //
            //     text = escapeCharacters(text,"\\",true);
            //     text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
            //
            // ...but we're sidestepping its use of the (slow) RegExp constructor
            // as an optimization for Firefox.  This function gets called a LOT.

            text = text.replace(/\\(\\)/g, escapeCharacters_callback);
            text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, escapeCharacters_callback);
            return text;
        }

        var charInsideUrl = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",
            charEndingUrl = "[-A-Z0-9+&@#/%=~_|[\\])]",
            autoLinkRegex = new RegExp("(=\"|<)?\\b(https?|ftp)(://" + charInsideUrl + "*" + charEndingUrl + ")(?=$|\\W)", "gi"),
            endCharRegex = new RegExp(charEndingUrl, "i");

        function handleTrailingParens(wholeMatch, lookbehind, protocol, link) {
            if (lookbehind)
                return wholeMatch;
            if (link.charAt(link.length - 1) !== ")")
                return "<" + protocol + link + ">";
            var parens = link.match(/[()]/g);
            var level = 0;
            for (var i = 0; i < parens.length; i++) {
                if (parens[i] === "(") {
                    if (level <= 0)
                        level = 1;
                    else
                        level++;
                }
                else {
                    level--;
                }
            }
            var tail = "";
            if (level < 0) {
                var re = new RegExp("\\){1," + (-level) + "}$");
                link = link.replace(re, function (trailingParens) {
                    tail = trailingParens;
                    return "";
                });
            }
            if (tail) {
                var lastChar = link.charAt(link.length - 1);
                if (!endCharRegex.test(lastChar)) {
                    tail = lastChar + tail;
                    link = link.substr(0, link.length - 1);
                }
            }
            return "<" + protocol + link + ">" + tail;
        }
        
        function _DoAutoLinks(text) {

            // note that at this point, all other URL in the text are already hyperlinked as <a href=""></a>
            // *except* for the <http://www.foo.com> case

            // automatically add < and > around unadorned raw hyperlinks
            // must be preceded by a non-word character (and not by =" or <) and followed by non-word/EOF character
            // simulating the lookbehind in a consuming way is okay here, since a URL can neither and with a " nor
            // with a <, so there is no risk of overlapping matches.
            text = text.replace(autoLinkRegex, handleTrailingParens);

            //  autolink anything like <http://example.com>
            
            var replacer = function (wholematch, m1) { return "<a href=\"" + m1 + "\">" + pluginHooks.plainLinkText(m1) + "</a>"; }
            text = text.replace(/<((https?|ftp):[^'">\s]+)>/gi, replacer);

            // Email addresses: <address@domain.foo>
            /*
            text = text.replace(/
                <
                (?:mailto:)?
                (
                    [-.\w]+
                    \@
                    [-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+
                )
                >
            /gi, _DoAutoLinks_callback());
            */

            /* disabling email autolinking, since we don't do that on the server, either
            text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
                function(wholeMatch,m1) {
                    return _EncodeEmailAddress( _UnescapeSpecialChars(m1) );
                }
            );
            */
            return text;
        }

        function _UnescapeSpecialChars(text) {
            //
            // Swap back in all the special characters we've hidden.
            //
            text = text.replace(/~E(\d+)E/g,
                function (wholeMatch, m1) {
                    var charCodeToReplace = parseInt(m1);
                    return String.fromCharCode(charCodeToReplace);
                }
            );
            return text;
        }

        function _Outdent(text) {
            //
            // Remove one level of line-leading tabs or spaces
            //

            // attacklab: hack around Konqueror 3.5.4 bug:
            // "----------bug".replace(/^-/g,"") == "bug"

            text = text.replace(/^(\t|[ ]{1,4})/gm, "~0"); // attacklab: g_tab_width

            // attacklab: clean up hack
            text = text.replace(/~0/g, "")

            return text;
        }

        function _Detab(text) {
            if (!/\t/.test(text))
                return text;

            var spaces = ["    ", "   ", "  ", " "],
            skew = 0,
            v;

            return text.replace(/[\n\t]/g, function (match, offset) {
                if (match === "\n") {
                    skew = offset + 1;
                    return match;
                }
                v = (offset - skew) % 4;
                skew = offset + 1;
                return spaces[v];
            });
        }

        //
        //  attacklab: Utility functions
        //

        var _problemUrlChars = /(?:["'*()[\]:]|~D)/g;

        // hex-encodes some unusual "problem" chars in URLs to avoid URL detection problems 
        function encodeProblemUrlChars(url) {
            if (!url)
                return "";

            var len = url.length;

            return url.replace(_problemUrlChars, function (match, offset) {
                if (match == "~D") // escape for dollar
                    return "%24";
                if (match == ":") {
                    if (offset == len - 1 || /[0-9\/]/.test(url.charAt(offset + 1)))
                        return ":"
                }
                return "%" + match.charCodeAt(0).toString(16);
            });
        }


        function escapeCharacters(text, charsToEscape, afterBackslash) {
            // First we have to escape the escape characters so that
            // we can build a character class out of them
            var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";

            if (afterBackslash) {
                regexString = "\\\\" + regexString;
            }

            var regex = new RegExp(regexString, "g");
            text = text.replace(regex, escapeCharacters_callback);

            return text;
        }


        function escapeCharacters_callback(wholeMatch, m1) {
            var charCodeToEscape = m1.charCodeAt(0);
            return "~E" + charCodeToEscape + "E";
        }

    }; // end of the Markdown.Converter constructor

})();

(function () {
    var output, Converter;
    if (typeof exports === "object" && typeof require === "function") { // we're in a CommonJS (e.g. Node.js) module
        output = exports;
        Converter = require("./Markdown.Converter").Converter;
    } else {
        output = window.Markdown;
        Converter = output.Converter;
    }
        
    output.getSanitizingConverter = function () {
        var converter = new Converter();
        converter.hooks.chain("postConversion", sanitizeHtml);
        converter.hooks.chain("postConversion", balanceTags);
        return converter;
    }

    function sanitizeHtml(html) {
        return html.replace(/<[^>]*>?/gi, sanitizeTag);
    }

    // (tags that can be opened/closed) | (tags that stand alone)
    var basic_tag_whitelist = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i;
    // <a href="url..." optional title>|</a>
    var a_white = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i;

    // <img src="url..." optional width  optional height  optional alt  optional title
    var img_white = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;

    function sanitizeTag(tag) {
        if (tag.match(basic_tag_whitelist) || tag.match(a_white) || tag.match(img_white))
            return tag;
        else
            return "";
    }

    /// <summary>
    /// attempt to balance HTML tags in the html string
    /// by removing any unmatched opening or closing tags
    /// IMPORTANT: we *assume* HTML has *already* been 
    /// sanitized and is safe/sane before balancing!
    /// 
    /// adapted from CODESNIPPET: A8591DBA-D1D3-11DE-947C-BA5556D89593
    /// </summary>
    function balanceTags(html) {

        if (html == "")
            return "";

        var re = /<\/?\w+[^>]*(\s|$|>)/g;
        // convert everything to lower case; this makes
        // our case insensitive comparisons easier
        var tags = html.toLowerCase().match(re);

        // no HTML tags present? nothing to do; exit now
        var tagcount = (tags || []).length;
        if (tagcount == 0)
            return html;

        var tagname, tag;
        var ignoredtags = "<p><img><br><li><hr>";
        var match;
        var tagpaired = [];
        var tagremove = [];
        var needsRemoval = false;

        // loop through matched tags in forward order
        for (var ctag = 0; ctag < tagcount; ctag++) {
            tagname = tags[ctag].replace(/<\/?(\w+).*/, "$1");
            // skip any already paired tags
            // and skip tags in our ignore list; assume they're self-closed
            if (tagpaired[ctag] || ignoredtags.search("<" + tagname + ">") > -1)
                continue;

            tag = tags[ctag];
            match = -1;

            if (!/^<\//.test(tag)) {
                // this is an opening tag
                // search forwards (next tags), look for closing tags
                for (var ntag = ctag + 1; ntag < tagcount; ntag++) {
                    if (!tagpaired[ntag] && tags[ntag] == "</" + tagname + ">") {
                        match = ntag;
                        break;
                    }
                }
            }

            if (match == -1)
                needsRemoval = tagremove[ctag] = true; // mark for removal
            else
                tagpaired[match] = true; // mark paired
        }

        if (!needsRemoval)
            return html;

        // delete all orphaned tags from the string

        var ctag = 0;
        html = html.replace(re, function (match) {
            var res = tagremove[ctag] ? "" : match;
            ctag++;
            return res;
        });
        return html;
    }
})();

// Askbot adapter to markdown converter;
var getAskbotMarkdownConverter = function() {
    askbot['controllers'] = askbot['controllers'] || {};
    var converter = askbot['controllers']['markdownConverter'];
    if (!converter) {
        converter = new AskbotMarkdownConverter();
        askbot['controllers']['markdownConverter'] = converter;
    }
    return converter;
};

var AskbotMarkdownConverter = function() {
    this._converter = new Markdown.getSanitizingConverter();
};

AskbotMarkdownConverter.prototype.makeHtml = function (text) {
    var makeHtmlBase = this._converter.makeHtml;
    if (askbot['settings']['mathjaxEnabled'] === false){
        return makeHtmlBase(text);
    } 
    else {
        MathJax.Hub.queue.Push(
            function(){
                $('#previewer').html(makeHtmlBase(text));
            }
        );
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'previewer']);
        return $('#previewer').html();
    }
};

var Attacklab = Attacklab || {};

Attacklab.wmdBase = function(){

	// A few handy aliases for readability.
	var wmd  = self.Attacklab;
	var doc  = self.document;
	var re   = self.RegExp;
	var nav  = self.navigator;

	// Some namespaces.
	wmd.Util = {};
	wmd.Position = {};
	wmd.Command = {};
	wmd.Global = {};

	var util = wmd.Util;
	var position = wmd.Position;
	var command = wmd.Command;
	var global = wmd.Global;


	// Used to work around some browser bugs where we can't use feature testing.
    global.isChrome = /chrome/.test(nav.userAgent.toLowerCase());
	global.isIE = /msie/.test(nav.userAgent.toLowerCase());
	global.isIE_5or6 = /msie 6/.test(nav.userAgent.toLowerCase()) || /msie 5/.test(nav.userAgent.toLowerCase());
	global.isIE_7plus = global.isIE && !global.isIE_5or6;
	global.isOpera = /opera/.test(nav.userAgent.toLowerCase());
	global.isKonqueror = /konqueror/.test(nav.userAgent.toLowerCase());

	var toolbar_strong_label = gettext('bold') + " <strong> Ctrl-B";
    var toolbar_emphasis_label = gettext('italic') + " <em> Ctrl-I";
    var toolbar_hyperlink_label = gettext('link') + " <a> Ctrl-L";
    var toolbar_blockquote_label = gettext('quote') + " <blockquote> Ctrl-.";
    var toolbar_code_label = gettext('preformatted text') + " <pre><code> Ctrl-K";
    var toolbar_image_label = gettext('image') + " <img> Ctrl-G";
    var toolbar_attachment_label = gettext('attachment') + " Ctrl-F";
    var toolbar_numbered_label = gettext('numbered list') + " <ol> Ctrl-O";
    var toolbar_bulleted_label = gettext('bulleted list') + " <ul> Ctrl-U";
    var toolbar_heading_label = gettext('heading') + " <h1>/<h2> Ctrl-H";
    var toolbar_horizontal_label = gettext('horizontal bar') + " <hr> Ctrl-R";
    var toolbar_undo_label = gettext('undo') + " Ctrl-Z";
    var toolbar_redo_label = gettext('redo') + " Ctrl-Y";

	// -------------------------------------------------------------------
	//  YOUR CHANGES GO HERE
	//
	// I've tried to localize the things you are likely to change to
	// this area.
	// -------------------------------------------------------------------

	// The text that appears on the upper part of the dialog box when
	// entering links.
	var imageDialogText = "<p style='margin-top: 0px'>" + gettext('enter image url') + '</p>';
	var linkDialogText = "<p style='margin-top: 0px'>" + gettext('enter url') + '</p>';
    var fileDialogText = "<p>" + gettext('upload file attachment') + '</p>';
	// The default text that appears in the dialog input box when entering
	// links.
	var imageDefaultText = "http://";
	var linkDefaultText = "http://";

	// The location of your button images relative to the base directory.
	var imageDirectory = "images/";

	// Some intervals in ms.  These can be adjusted to reduce the control's load.
	var previewPollInterval = 500;
	var pastePollInterval = 100;

	// The link and title for the help button
	var helpLink = "http://wmd-editor.com/";
	var helpHoverTitle = "WMD website";
	var helpTarget = "_blank";
    var localUploadFileName = null;

	// -------------------------------------------------------------------
	//  END OF YOUR CHANGES
	// -------------------------------------------------------------------

	// A collection of the important regions on the page.
	// Cached so we don't have to keep traversing the DOM.
	wmd.PanelCollection = function(){
		this.buttonBar = doc.getElementById(util.makeId("wmd-button-bar"));
		this.preview = doc.getElementById(util.makeId("previewer"));
		this.output = doc.getElementById(util.makeId("wmd-output"));
		this.input = doc.getElementById(util.makeId("editor"));
	};

	// This PanelCollection object can't be filled until after the page
	// has loaded.
	wmd.panels = undefined;

	// Internet explorer has problems with CSS sprite buttons that use HTML
	// lists.  When you click on the background image "button", IE will
	// select the non-existent link text and discard the selection in the
	// textarea.  The solution to this is to cache the textarea selection
	// on the button's mousedown event and set a flag.  In the part of the
	// code where we need to grab the selection, we check for the flag
	// and, if it's set, use the cached area instead of querying the
	// textarea.
	//
	// This ONLY affects Internet Explorer (tested on versions 6, 7
	// and 8) and ONLY on button clicks.  Keyboard shortcuts work
	// normally since the focus never leaves the textarea.
	wmd.ieCachedRange = null;		// cached textarea selection
	wmd.ieRetardedClick = false;	// flag

	// Returns true if the DOM element is visible, false if it's hidden.
	// Checks if display is anything other than none.
	util.isVisible = function (elem) {

	    if (window.getComputedStyle) {
	        // Most browsers
			return window.getComputedStyle(elem, null).getPropertyValue("display") !== "none";
		}
		else if (elem.currentStyle) {
		    // IE
			return elem.currentStyle.display !== "none";
		}
	};


	// Adds a listener callback to a DOM element which is fired on a specified
	// event.
	util.addEvent = function(elem, event, listener){
		if (elem) {
            if (elem.attachEvent) {
                // IE only.  The "on" is mandatory.
                elem.attachEvent("on" + event, listener);
            } else {
                // Other browsers.
                elem.addEventListener(event, listener, false);
            }
        }
	};


	// Removes a listener callback from a DOM element which is fired on a specified
	// event.
	util.removeEvent = function(elem, event, listener){
		if (elem.detachEvent) {
			// IE only.  The "on" is mandatory.
			elem.detachEvent("on" + event, listener);
		}
		else {
			// Other browsers.
			elem.removeEventListener(event, listener, false);
		}
	};

	// Converts \r\n and \r to \n.
	util.fixEolChars = function(text){
		text = text.replace(/\r\n/g, "\n");
		text = text.replace(/\r/g, "\n");
		return text;
	};

	// Extends a regular expression.  Returns a new RegExp
	// using pre + regex + post as the expression.
	// Used in a few functions where we have a base
	// expression and we want to pre- or append some
	// conditions to it (e.g. adding "$" to the end).
	// The flags are unchanged.
	//
	// regex is a RegExp, pre and post are strings.
	util.extendRegExp = function(regex, pre, post){

		if (pre === null || pre === undefined)
		{
			pre = "";
		}
		if(post === null || post === undefined)
		{
			post = "";
		}

		var pattern = regex.toString();
		var flags;

		// Replace the flags with empty space and store them.
		pattern = pattern.replace(/\/([gim]*)$/, "");
		flags = re.$1;

		// Remove the slash delimiters on the regular expression.
		pattern = pattern.replace(/(^\/|\/$)/g, "");
		pattern = pre + pattern + post;

		return new re(pattern, flags);
	};


	// Sets the image for a button passed to the WMD editor.
	// Returns a new element with the image attached.
	// Adds several style properties to the image.
	util.createImage = function(img){

		var imgPath = imageDirectory + img;

		var elem = doc.createElement("img");
		elem.className = "wmd-button wmd-image-button";
		elem.src = imgPath;

		return elem;
	};


// This simulates a modal dialog box and asks for the URL when you
// click the hyperlink or image buttons.
//
// text: The html for the input box.
// defaultInputText: The default value that appears in the input box.
// makeLinkMarkdown: The function which is executed when the prompt is dismissed, either via OK or Cancel
util.prompt = function(text, defaultInputText, makeLinkMarkdown, dialogType){

    // These variables need to be declared at this level since they are used
    // in multiple functions.
    var dialog;// The dialog box.
    var background;// The background beind the dialog box.
    var input;// The text box where you enter the hyperlink.

    if (defaultInputText === undefined) {
        defaultInputText = "";
    }

    // Used as a keydown event handler. Esc dismisses the prompt.
    // Key code 27 is ESC.
    var checkEscape = function(key){
        var code = (key.charCode || key.keyCode);
        if (code === 27) {
            close(true);
        }
    };

    // Dismisses the hyperlink input box.
    // isCancel is true if we don't care about the input text.
    // isCancel is false if we are going to keep the text.
    var close = function(isCancel){
        util.removeEvent(doc.body, "keydown", checkEscape);
        var text = input.value;

        if (isCancel){
            text = null;
        }
        else{
            // Fixes common pasting errors.
            text = text.replace('http://http://', 'http://');
            text = text.replace('http://https://', 'https://');
            text = text.replace('http://ftp://', 'ftp://');

            if (text.indexOf('http://') === -1 && text.indexOf('ftp://') === -1 && text.indexOf('https://') === -1) {
                if (dialogType == 'link'){
                    //add http only to urls
                    text = 'http://' + text;
                }
            }
        }

        dialog.parentNode.removeChild(dialog);
        background.parentNode.removeChild(background);
        makeLinkMarkdown(text);
        return false;
    };

    // Creates the background behind the hyperlink text entry box.
    // Most of this has been moved to CSS but the div creation and
    // browser-specific hacks remain here.
    var createBackground = function(){

        background = doc.createElement("div");
        background.className = "wmd-prompt-background";
        style = background.style;
        style.position = "absolute";
        style.top = "0";

        style.zIndex = "1000";

        // Some versions of Konqueror don't support transparent colors
        // so we make the whole window transparent.
        //
        // Is this necessary on modern konqueror browsers?
        if (global.isKonqueror) {
            style.backgroundColor = "transparent";
        } else if (global.isIE) {
            style.filter = "alpha(opacity=50)";
        } else {
            style.opacity = "0.5";
        }

        var pageSize = position.getPageSize();
        style.height = pageSize[1] + "px";

        if(global.isIE) {
            style.left = doc.documentElement.scrollLeft;
            style.width = doc.documentElement.clientWidth;
        } else {
            style.left = "0";
            style.width = "100%";
        }

        doc.body.appendChild(background);
    };

    // Create the text input box form/window.
    var createDialog = function(){

        // The main dialog box.
        dialog = doc.createElement("div");
        dialog.className = "wmd-prompt-dialog";
        dialog.style.padding = "10px;";
        dialog.style.position = "fixed";
        dialog.style.width = "400px";
        dialog.style.zIndex = "1001";

        // The dialog text.
        var question = doc.createElement("div");
        question.innerHTML = text;
        question.style.padding = "5px";
        dialog.appendChild(question);

        // The web form container for the text box and buttons.
        var form = doc.createElement("form");
        form.onsubmit = function(){ return close(false); };
        style = form.style;
        style.padding = "0";
        style.margin = "0";
        style.cssFloat = "left";
        style.width = "100%";
        style.textAlign = "center";
        style.position = "relative";
        dialog.appendChild(form);

        // The input text box
        input = doc.createElement("input");
        if(dialogType == 'image' || dialogType == 'file'){
            input.id = util.makeId("image-url");
        }
        input.type = "text";
        if (dialogType == 'file'){
            input.disabled = "disabled";
        };

        input.value = defaultInputText;
        style = input.style;
        style.display = "block";
        style.width = "80%";
        style.marginLeft = style.marginRight = "auto";
        form.appendChild(input);

        //EF. fucus at the end of the input box
        //putCursorAtEnd($(input));

        // The upload file input
        if(dialogType == 'image' || dialogType == 'file'){
            var upload_container = $('<div></div>');
            var upload_input = $('<input type="file" />');
            upload_input.attr('name', 'file-upload');
            upload_input.attr('id', 'file-upload');
            upload_input.attr('size', 26);

            var spinner = $('<img />');
            spinner.attr('id', 'loading');
            spinner.attr('src', mediaUrl("media/images/indicator.gif"));
            spinner.css('display', 'none');

            var startUploadHandler = function(){
                localUploadFileName = $(this).val();//this is a local var
                /*
                 * startUploadHandler is passed into the ajaxFileUpload
                 * in order to re-install the onchange handler
                 * because the jquery extension ajaxFileUpload removes the handler
                 */
                var options = {
                    spinner: spinner,
                    uploadInputId: 'file-upload',
                    urlInput: $(input),
                    startUploadHandler: startUploadHandler
                };
                return ajaxFileUpload(options);
                //$('#image-url'), startUploadHandler);
            };

            upload_input.change(startUploadHandler);

            upload_container.append(upload_input);
            upload_container.append($('<br/>'));

            upload_container.append(spinner);

            upload_container.css('padding', '5px');
            $(form).append(upload_container);
        }

        // The ok button
        var okButton = doc.createElement("input");
        okButton.type = "button";
        okButton.onclick = function(){
            var isCancel = false;
            if ($.trim($(input).val()) === ''){
                isCancel = true;
            }
            return close(isCancel);
        };
        okButton.value = "OK";
        style = okButton.style;
        style.margin = "10px";
        style.display = "inline";
        style.width = "7em";

        // The cancel button
        var cancelButton = doc.createElement("input");
        cancelButton.type = "button";
        cancelButton.onclick = function(){ return close(true); };
        cancelButton.value = "Cancel";
        style = cancelButton.style;
        style.margin = "10px";
        style.display = "inline";
        style.width = "7em";

        // The order of these buttons is different on macs.
        if (/mac/.test(nav.platform.toLowerCase())) {
            form.appendChild(cancelButton);
            form.appendChild(okButton);
        }
        else {
            form.appendChild(okButton);
            form.appendChild(cancelButton);
        }

        util.addEvent(doc.body, "keydown", checkEscape);
        dialog.style.top = "50%";
        dialog.style.left = "50%";
        dialog.style.display = "block";
        if(global.isIE_5or6){
            dialog.style.position = "absolute";
            dialog.style.top = doc.documentElement.scrollTop + 200 + "px";
            dialog.style.left = "50%";
        }
        doc.body.appendChild(dialog);

        // This has to be done AFTER adding the dialog to the form if you
        // want it to be centered.
        dialog.style.marginTop = -(position.getHeight(dialog) / 2) + "px";
        dialog.style.marginLeft = -(position.getWidth(dialog) / 2) + "px";

        $(document).trigger('askbot.afterCreateWMDPrompt', [dialog]);
    };

    createBackground();

    // Why is this in a zero-length timeout?
    // Is it working around a browser bug?
    setTimeout(function(){
        createDialog();
        var defTextLen = defaultInputText.length;
        if (input.type == 'text' && input.selectionStart !== undefined) {
            input.selectionStart = 0;
            input.selectionEnd = defTextLen;
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(false);
            range.moveStart("character", -defTextLen);
            range.moveEnd("character", defTextLen);
            range.select();
        }

        input.focus();
    }, 0);
};


	// UNFINISHED
	// The assignment in the while loop makes jslint cranky.
	// I'll change it to a better loop later.
	position.getTop = function(elem, isInner){
		var result = elem.offsetTop;
		if (!isInner) {
        while (elem.offsetParent) {
            elem = elem.offsetParent;
            result += elem.offsetTop;
        }
		}
		return result;
	};

	position.getHeight = function (elem) {
		return elem.offsetHeight || elem.scrollHeight;
	};

	position.getWidth = function (elem) {
		return elem.offsetWidth || elem.scrollWidth;
	};

	position.getPageSize = function(){

		var scrollWidth, scrollHeight;
		var innerWidth, innerHeight;

		// It's not very clear which blocks work with which browsers.
		if (self.innerHeight && self.scrollMaxY) {
			scrollWidth = doc.body.scrollWidth;
			scrollHeight = self.innerHeight + self.scrollMaxY;
		} else if (doc.body.scrollHeight > doc.body.offsetHeight){
			scrollWidth = doc.body.scrollWidth;
			scrollHeight = doc.body.scrollHeight;
		} else {
			scrollWidth = doc.body.offsetWidth;
			scrollHeight = doc.body.offsetHeight;
		}

		if (self.innerHeight) {
			// Non-IE browser
			innerWidth = self.innerWidth;
			innerHeight = self.innerHeight;
		} else if (doc.documentElement && doc.documentElement.clientHeight){
			// Some versions of IE (IE 6 w/ a DOCTYPE declaration)
			innerWidth = doc.documentElement.clientWidth;
			innerHeight = doc.documentElement.clientHeight;
		} else if(doc.body) {
			// Other versions of IE
			innerWidth = doc.body.clientWidth;
			innerHeight = doc.body.clientHeight;
		}

        var maxWidth = Math.max(scrollWidth, innerWidth);
        var maxHeight = Math.max(scrollHeight, innerHeight);
        return [maxWidth, maxHeight, innerWidth, innerHeight];
	};

	// Watches the input textarea, polling at an interval and runs
	// a callback function if anything has changed.
	wmd.inputPoller = function(callback, interval){

		var pollerObj = this;
		var inputArea = wmd.panels.input;

		// Stored start, end and text.  Used to see if there are changes to the input.
		var lastStart;
		var lastEnd;
		var markdown;

		var killHandle; // Used to cancel monitoring on destruction.
		// Checks to see if anything has changed in the textarea.
		// If so, it runs the callback.
		this.tick = function(){

			if (!util.isVisible(inputArea)) {
				return;
			}

			// Update the selection start and end, text.
			if (inputArea.selectionStart || inputArea.selectionStart === 0) {
				var start = inputArea.selectionStart;
				var end = inputArea.selectionEnd;
				if (start != lastStart || end != lastEnd) {
					lastStart = start;
					lastEnd = end;

					if (markdown != inputArea.value) {
						markdown = inputArea.value;
						return true;
					}
				}
			}
			return false;
		};


		var doTickCallback = function(){

			if (!util.isVisible(inputArea)) {
				return;
			}

			// If anything has changed, call the function.
			if (pollerObj.tick()) {
				callback();
			}
		};

		// Set how often we poll the textarea for changes.
		var assignInterval = function(){
			// previewPollInterval is set at the top of the namespace.
			killHandle = setInterval(doTickCallback, interval);
		};

		this.destroy = function(){
			clearInterval(killHandle);
		};

		assignInterval();
	};

	// Handles pushing and popping TextareaStates for undo/redo commands.
	// I should rename the stack variables to list.
	wmd.undoManager = function(callback){

		var undoObj = this;
		var undoStack = []; // A stack of undo states
		var stackPtr = 0; // The index of the current state
		var mode = "none";
		var lastState; // The last state
		var poller;
		var timer; // The setTimeout handle for cancelling the timer
		var inputStateObj;

		// Set the mode for later logic steps.
		var setMode = function(newMode, noSave){

			if (mode != newMode) {
				mode = newMode;
				if (!noSave) {
					saveState();
				}
			}

			if (!global.isIE || mode != "moving") {
				timer = setTimeout(refreshState, 1);
			}
			else {
				inputStateObj = null;
			}
		};

		var refreshState = function(){
			inputStateObj = new wmd.TextareaState();
			poller.tick();
			timer = undefined;
		};

		this.setCommandMode = function(){
			mode = "command";
			saveState();
			timer = setTimeout(refreshState, 0);
		};

		this.canUndo = function(){
			return stackPtr > 1;
		};

		this.canRedo = function(){
			if (undoStack[stackPtr + 1]) {
				return true;
			}
			return false;
		};

		// Removes the last state and restores it.
		this.undo = function(){

			if (undoObj.canUndo()) {
				if (lastState) {
					// What about setting state -1 to null or checking for undefined?
					lastState.restore();
					lastState = null;
				}
				else {
					undoStack[stackPtr] = new wmd.TextareaState();
					undoStack[--stackPtr].restore();

					if (callback) {
						callback();
					}
				}
			}

			mode = "none";
			wmd.panels.input.focus();
			refreshState();
		};

		// Redo an action.
		this.redo = function(){

			if (undoObj.canRedo()) {

				undoStack[++stackPtr].restore();

				if (callback) {
					callback();
				}
			}

			mode = "none";
			wmd.panels.input.focus();
			refreshState();
		};

		// Push the input area state to the stack.
		var saveState = function(){

			var currState = inputStateObj || new wmd.TextareaState();

			if (!currState) {
				return false;
			}
			if (mode == "moving") {
				if (!lastState) {
					lastState = currState;
				}
				return;
			}
			if (lastState) {
				if (undoStack[stackPtr - 1].text != lastState.text) {
					undoStack[stackPtr++] = lastState;
				}
				lastState = null;
			}
			undoStack[stackPtr++] = currState;
			undoStack[stackPtr + 1] = null;
			if (callback) {
				callback();
			}
		};

		var handleCtrlYZ = function(event){

			var handled = false;

			if (event.ctrlKey || event.metaKey) {

				// IE and Opera do not support charCode.
				var keyCode = event.charCode || event.keyCode;
				var keyCodeChar = String.fromCharCode(keyCode);

				switch (keyCodeChar) {

					case "y":
						undoObj.redo();
						handled = true;
						break;

					case "z":
						if (!event.shiftKey) {
							undoObj.undo();
						}
						else {
							undoObj.redo();
						}
						handled = true;
						break;
				}
			}

			if (handled) {
				if (event.preventDefault) {
					event.preventDefault();
				}
				if (event) {
					event.returnValue = false;
				}
				return;
			}
		};

		// Set the mode depending on what is going on in the input area.
		var handleModeChange = function(event){

			if (!event.ctrlKey && !event.metaKey) {

				var keyCode = event.keyCode;

				if ((keyCode >= 33 && keyCode <= 40) || (keyCode >= 63232 && keyCode <= 63235)) {
					// 33 - 40: page up/dn and arrow keys
					// 63232 - 63235: page up/dn and arrow keys on safari
					setMode("moving");
				}
				else if (keyCode == 8 || keyCode == 46 || keyCode == 127) {
					// 8: backspace
					// 46: delete
					// 127: delete
					setMode("deleting");
				}
				else if (keyCode == 13) {
					// 13: Enter
					setMode("newlines");
				}
				else if (keyCode == 27) {
					// 27: escape
					setMode("escape");
				}
				else if ((keyCode < 16 || keyCode > 20) && keyCode != 91) {
					// 16-20 are shift, etc.
					// 91: left window key
					// I think this might be a little messed up since there are
					// a lot of nonprinting keys above 20.
					setMode("typing");
				}
			}
		};

		var setEventHandlers = function(){

			util.addEvent(wmd.panels.input, "keypress", function(event){
				// keyCode 89: y
				// keyCode 90: z
				if ((event.ctrlKey || event.metaKey) && (event.keyCode == 89 || event.keyCode == 90)) {
					event.preventDefault();
				}
			});

			var handlePaste = function(){
				if (global.isIE || (inputStateObj && inputStateObj.text != wmd.panels.input.value)) {
					if (timer === undefined) {
						mode = "paste";
						saveState();
						refreshState();
					}
				}
			};

			// pastePollInterval is specified at the beginning of this namespace.
			poller = new wmd.inputPoller(handlePaste, pastePollInterval);

			util.addEvent(wmd.panels.input, "keydown", handleCtrlYZ);
			util.addEvent(wmd.panels.input, "keydown", handleModeChange);

			util.addEvent(wmd.panels.input, "mousedown", function(){
				setMode("moving");
			});
			wmd.panels.input.onpaste = handlePaste;
			wmd.panels.input.ondrop = handlePaste;
		};

		var init = function(){
			setEventHandlers();
			refreshState();
			saveState();
		};

		this.destroy = function(){
			if (poller) {
				poller.destroy();
			}
		};

		init();
	};

	// I think my understanding of how the buttons and callbacks are stored in the array is incomplete.
	wmd.editor = function(previewRefreshCallback){

		if (!previewRefreshCallback) {
			previewRefreshCallback = function(){};
		}

		var inputBox = wmd.panels.input;

		var offsetHeight = 0;

		var editObj = this;

		var mainDiv;
		var mainSpan;

		var div; // This name is pretty ambiguous.  I should rename this.

		// Used to cancel recurring events from setInterval.
		var creationHandle;

		var undoMgr; // The undo manager

        var isButtonUsed = function(button){
            var buttons = $.trim(wmd.wmd_env.buttons).split(/\s+/);
            return $.inArray(button, buttons) !== -1;
        };

		// Perform the button's action.
		var doClick = function(button){

			inputBox.focus();

			if (button.textOp) {

				if (undoMgr) {
					undoMgr.setCommandMode();
				}

				var state = new wmd.TextareaState();

				if (!state) {
					return;
				}

				var chunks = state.getChunks();

				// Some commands launch a "modal" prompt dialog.  Javascript
				// can't really make a modal dialog box and the WMD code
				// will continue to execute while the dialog is displayed.
				// This prevents the dialog pattern I'm used to and means
				// I can't do something like this:
				//
				// var link = CreateLinkDialog();
				// makeMarkdownLink(link);
				//
				// Instead of this straightforward method of handling a
				// dialog I have to pass any code which would execute
				// after the dialog is dismissed (e.g. link creation)
				// in a function parameter.
				//
				// Yes this is awkward and I think it sucks, but there's
				// no real workaround.  Only the image and link code
				// create dialogs and require the function pointers.
				var fixupInputArea = function(){

					inputBox.focus();

					if (chunks) {
						state.setChunks(chunks);
					}

					state.restore();
					previewRefreshCallback();
				};

				var noCleanup = button.textOp(chunks, fixupInputArea);

				if(!noCleanup) {
					fixupInputArea();
				}

			}

			if (button.execute) {
				button.execute(editObj);
			}
		};

		var setUndoRedoButtonStates = function(){
			if(undoMgr){
				setupButton(document.getElementById(util.makeId("wmd-undo-button")), undoMgr.canUndo());
				setupButton(document.getElementById(util.makeId("wmd-redo-button")), undoMgr.canRedo());
			}
		};

		var setupButton = function(button, isEnabled) {

			var normalYShift = "0px";
			var disabledYShift = "-20px";
			var highlightYShift = "-40px";

			if(isEnabled) {
				button.style.backgroundPosition = button.XShift + " " + normalYShift;
				button.onmouseover = function(){
					this.style.backgroundPosition = this.XShift + " " + highlightYShift;
				};

				button.onmouseout = function(){
					this.style.backgroundPosition = this.XShift + " " + normalYShift;
				};

				// IE tries to select the background image "button" text (it's
				// implemented in a list item) so we have to cache the selection
				// on mousedown.
				if(global.isIE) {
					button.onmousedown =  function() {
						wmd.ieRetardedClick = true;
						wmd.ieCachedRange = document.selection.createRange();
					};
				}

				if (!button.isHelp)
				{
					button.onclick = function() {
						if (this.onmouseout) {
							this.onmouseout();
						}
						doClick(this);
						return false;
					};
				}
			}
			else {
				button.style.backgroundPosition = button.XShift + " " + disabledYShift;
				button.onmouseover = button.onmouseout = button.onclick = function(){};
			}
		};

		var makeSpritedButtonRow = function(){
			var buttonBar = document.getElementById(util.makeId("wmd-button-bar"));
            buttonBar.className = 'wmd-button-bar';
			var normalYShift = "0px";
			var disabledYShift = "-20px";
			var highlightYShift = "-40px";

			var buttonRow = document.createElement("ul");
            buttonRow.className = 'wmd-button-row';
			buttonRow.id = util.makeId("wmd-button-row");
			buttonRow = buttonBar.appendChild(buttonRow);

            if (isButtonUsed('bold')){
                var boldButton = document.createElement("li");
                boldButton.className = "wmd-button wmd-bold-button";
                boldButton.id = util.makeId("wmd-bold-button");
                boldButton.title = toolbar_strong_label;
                boldButton.XShift = "0px";
                boldButton.textOp = command.doBold;
                setupButton(boldButton, true);
                buttonRow.appendChild(boldButton);
            }

            if (isButtonUsed('italic')){
                var italicButton = document.createElement("li");
                italicButton.className = "wmd-button wmd-italic-button";
                italicButton.id = util.makeId("wmd-italic-button");
                italicButton.title = toolbar_emphasis_label;
                italicButton.XShift = "-20px";
                italicButton.textOp = command.doItalic;
                setupButton(italicButton, true);
                buttonRow.appendChild(italicButton);
            }

            if (
                isButtonUsed('link') ||
                isButtonUsed('blockquote') ||
                isButtonUsed('code') ||
                isButtonUsed('image') ||
                isButtonUsed('attachment')
            ) {
                var spacer1 = document.createElement("li");
                spacer1.className = "wmd-spacer wmd-spacer1";
                spacer1.id = util.makeId("wmd-spacer1");
                buttonRow.appendChild(spacer1);
            }

            if (isButtonUsed('link')){
                var linkButton = document.createElement("li");
                linkButton.className = "wmd-button wmd-link-button";
                linkButton.id = util.makeId("wmd-link-button");
                linkButton.title = toolbar_hyperlink_label;
                linkButton.XShift = "-40px";
                linkButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'link');
                };
                setupButton(linkButton, true);
                buttonRow.appendChild(linkButton);
            }

            if (isButtonUsed('blockquote')){
                var quoteButton = document.createElement("li");
                quoteButton.className = "wmd-button wmd-quote-button";
                quoteButton.id = util.makeId("wmd-quote-button");
                quoteButton.title = toolbar_blockquote_label;
                quoteButton.XShift = "-60px";
                quoteButton.textOp = command.doBlockquote;
                setupButton(quoteButton, true);
                buttonRow.appendChild(quoteButton);
            }

            if (isButtonUsed('code')){
                var codeButton = document.createElement("li");
                codeButton.className = "wmd-button wmd-code-button";
                codeButton.id = util.makeId("wmd-code-button");
                codeButton.title = toolbar_code_label;
                codeButton.XShift = "-80px";
                codeButton.textOp = command.doCode;
                setupButton(codeButton, true);
                buttonRow.appendChild(codeButton);
            }

            if (isButtonUsed('image')){
                var imageButton = document.createElement("li");
                imageButton.className = "wmd-button wmd-image-button";
                imageButton.id = util.makeId("wmd-image-button");
                imageButton.title = toolbar_image_label;
                imageButton.XShift = "-100px";
                imageButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'image');
                };
                setupButton(imageButton, true);
                buttonRow.appendChild(imageButton);
            }

            if (isButtonUsed('attachment')){
                var attachmentButton = document.createElement("li");
                attachmentButton.className = "wmd-button wmd-attachment-button";
                attachmentButton.id = util.makeId("wmd-attachment-button");
                attachmentButton.title = toolbar_attachment_label;
                attachmentButton.XShift = "-120px";
                attachmentButton.textOp = function(chunk, postProcessing){
                    return command.doLinkOrImage(chunk, postProcessing, 'file');
                };
                setupButton(attachmentButton, true);
                buttonRow.appendChild(attachmentButton);
            }

            if (
                isButtonUsed('ol') ||
                isButtonUsed('ul') ||
                isButtonUsed('heading') ||
                isButtonUsed('hr')
            ) {
                var spacer2 = document.createElement("li");
                spacer2.className = "wmd-spacer wmd-spacer2";
                spacer2.id = util.makeId("wmd-spacer2");
                buttonRow.appendChild(spacer2);
            }

            if (isButtonUsed('ol')) {
                var olistButton = document.createElement("li");
                olistButton.className = "wmd-button wmd-olist-button";
                olistButton.id = util.makeId("wmd-olist-button");
                olistButton.title = toolbar_numbered_label;
                olistButton.XShift = "-140px";
                olistButton.textOp = function(chunk, postProcessing){
                    command.doList(chunk, postProcessing, true);
                };
                setupButton(olistButton, true);
                buttonRow.appendChild(olistButton);
            }

            if (isButtonUsed('ul')) {
                var ulistButton = document.createElement("li");
                ulistButton.className = "wmd-button wmd-ulist-button";
                ulistButton.id = util.makeId("wmd-ulist-button");
                ulistButton.title = toolbar_bulleted_label;
                ulistButton.XShift = "-160px";
                ulistButton.textOp = function(chunk, postProcessing){
                    command.doList(chunk, postProcessing, false);
                };
                setupButton(ulistButton, true);
                buttonRow.appendChild(ulistButton);
            }

            if (isButtonUsed('heading')) {
                var headingButton = document.createElement("li");
                headingButton.className = "wmd-button wmd-heading-button";
                headingButton.id = util.makeId("wmd-heading-button");
                headingButton.title = toolbar_heading_label;
                headingButton.XShift = "-180px";
                headingButton.textOp = command.doHeading;
                setupButton(headingButton, true);
                buttonRow.appendChild(headingButton);
            }

            if (isButtonUsed('hr')) {
                var hrButton = document.createElement("li");
                hrButton.className = "wmd-button wmd-hr-button";
                hrButton.id = util.makeId("wmd-hr-button");
                hrButton.title = toolbar_horizontal_label;
                hrButton.XShift = "-200px";
                hrButton.textOp = command.doHorizontalRule;
                setupButton(hrButton, true);
                buttonRow.appendChild(hrButton);
            }

            if (isButtonUsed('undo')){
                var spacer3 = document.createElement("li");
                spacer3.className = "wmd-spacer wmd-spacer3";
                spacer3.id = util.makeId("wmd-spacer3");
                buttonRow.appendChild(spacer3);

                var undoButton = document.createElement("li");
                undoButton.className = "wmd-button wmd-undo-button";
                undoButton.id = util.makeId("wmd-undo-button");
                undoButton.title = toolbar_undo_label;
                undoButton.XShift = "-220px";
                undoButton.execute = function(manager){
                    manager.undo();
                };
                setupButton(undoButton, true);
                buttonRow.appendChild(undoButton);

                var redoButton = document.createElement("li");
                redoButton.className = "wmd-button wmd-redo-button";
                redoButton.id = util.makeId("wmd-redo-button");
                redoButton.title = toolbar_redo_label;
                if (/win/.test(nav.platform.toLowerCase())) {
                    redoButton.title = toolbar_redo_label;
                }
                else {
                    // mac and other non-Windows platforms
                    redoButton.title = gettext('redo') + " - Ctrl+Shift+Z";
                }
                redoButton.XShift = "-240px";
                redoButton.execute = function(manager){
                    manager.redo();
                };
                setupButton(redoButton, true);
                buttonRow.appendChild(redoButton);
			    setUndoRedoButtonStates();
            }
			/*
			var helpButton = document.createElement("li");
			helpButton.className = "wmd-button wmd-help-button";
			helpButton.id = util.makeId("wmd-help-button");
			helpButton.XShift = "-240px";
			helpButton.isHelp = true;

			var helpAnchor = document.createElement("a");
			helpAnchor.href = helpLink;
			helpAnchor.target = helpTarget
			helpAnchor.title = helpHoverTitle;
			helpButton.appendChild(helpAnchor);

			setupButton(helpButton, true);
			buttonRow.appendChild(helpButton);
			*/
		};

		var setupEditor = function(){

			if (/\?noundo/.test(doc.location.href)) {
				wmd.nativeUndo = true;
			}

			if (!wmd.nativeUndo && isButtonUsed('undo')) {
				undoMgr = new wmd.undoManager(function(){
					previewRefreshCallback();
					setUndoRedoButtonStates();
				});
			}

			makeSpritedButtonRow();


			var keyEvent = "keydown";
			if (global.isOpera) {
				keyEvent = "keypress";
			}

			util.addEvent(inputBox, keyEvent, function(key){

				// Check to see if we have a button key and, if so execute the callback.
				if (key.ctrlKey || key.metaKey) {

					var keyCode = key.charCode || key.keyCode;
					var keyCodeStr = String.fromCharCode(keyCode).toLowerCase();

					// Bugfix for messed up DEL and .
					if (keyCode === 46) {
						keyCodeStr = "";
					}
					if (keyCode === 190) {
						keyCodeStr = ".";
					}

					switch(keyCodeStr) {
						case "b":
							doClick(document.getElementById(util.makeId("wmd-bold-button")));
							break;
						case "i":
							doClick(document.getElementById(util.makeId("wmd-italic-button")));
							break;
						case "l":
							doClick(document.getElementById(util.makeId("wmd-link-button")));
							break;
						case ".":
							doClick(document.getElementById(util.makeId("wmd-quote-button")));
							break;
						case "k":
							doClick(document.getElementById(util.makeId("wmd-code-button")));
							break;
						case "g":
							doClick(document.getElementById(util.makeId("wmd-image-button")));
							break;
						case "o":
							doClick(document.getElementById(util.makeId("wmd-olist-button")));
							break;
						case "u":
							doClick(document.getElementById(util.makeId("wmd-ulist-button")));
							break;
						case "h":
							doClick(document.getElementById(util.makeId("wmd-heading-button")));
							break;
						case "r":
							doClick(document.getElementById(util.makeId("wmd-hr-button")));
							break;
						case "y":
							doClick(document.getElementById(util.makeId("wmd-redo-button")));
							break;
						case "z":
							if(key.shiftKey) {
								doClick(document.getElementById(util.makeId("wmd-redo-button")));
							}
							else {
								doClick(document.getElementById(util.makeId("wmd-undo-button")));
							}
							break;
						default:
							return;
					}


					if (key.preventDefault) {
						key.preventDefault();
					}

					if (event) {
						event.returnValue = false;
					}
				}
			});

			// Auto-indent on shift-enter
			util.addEvent(inputBox, "keyup", function(key){
				if (key.shiftKey && !key.ctrlKey && !key.metaKey) {
					var keyCode = key.charCode || key.keyCode;
					// Character 13 is Enter
					if (keyCode === 13) {
						fakeButton = {};
						fakeButton.textOp = command.doAutoindent;
						doClick(fakeButton);
					}
				}
			});

			if (inputBox.form) {
				var submitCallback = inputBox.form.onsubmit;
				inputBox.form.onsubmit = function(){
					convertToHtml();
					if (submitCallback) {
						return submitCallback.apply(this, arguments);
					}
				};
			}
		};

		// Convert the contents of the input textarea to HTML in the output/preview panels.
		var convertToHtml = function(){

			if (wmd.showdown) {
				var markdownConverter = getAskbotMarkdownConverter();
			}
			var text = inputBox.value;

			var callback = function(){
				inputBox.value = text;
        //value is assigned here
			};

			if (!/markdown/.test(wmd.wmd_env.output.toLowerCase())) {
				if (markdownConverter) {
					inputBox.value = markdownConverter.makeHtml(text);
          //value is assigned here
					setTimeout(callback, 0);
				}
			}
			return true;
		};


		this.undo = function(){
			if (undoMgr) {
				undoMgr.undo();
			}
		};

		this.redo = function(){
			if (undoMgr) {
				undoMgr.redo();
			}
		};

		// This is pretty useless.  The setupEditor function contents
		// should just be copied here.
		var init = function(){
			setupEditor();
		};

		this.destroy = function(){
			if (undoMgr) {
				undoMgr.destroy();
			}
			if (div.parentNode) {
				div.parentNode.removeChild(div);
			}
			if (inputBox) {
				inputBox.style.marginTop = "";
			}
			clearInterval(creationHandle);
		};

		init();
	};

	// The input textarea state/contents.
	// This is used to implement undo/redo by the undo manager.
	wmd.TextareaState = function(){

		// Aliases
		var stateObj = this;
		var inputArea = wmd.panels.input;

		this.init = function() {

			if (!util.isVisible(inputArea)) {
				return;
			}

			this.setInputAreaSelectionStartEnd();
			this.scrollTop = inputArea.scrollTop;
			if (!this.text && inputArea.selectionStart || inputArea.selectionStart === 0) {
				this.text = inputArea.value;
			}

		};

		// Sets the selected text in the input box after we've performed an
		// operation.
		this.setInputAreaSelection = function(){

			if (!util.isVisible(inputArea)) {
				return;
			}

			if (inputArea.selectionStart !== undefined && !global.isOpera) {

				inputArea.focus();
				inputArea.selectionStart = stateObj.start;
				inputArea.selectionEnd = stateObj.end;
				inputArea.scrollTop = stateObj.scrollTop;
			}
			else if (doc.selection) {

				if (doc.activeElement && doc.activeElement !== inputArea) {
					return;
				}

				inputArea.focus();
				var range = inputArea.createTextRange();
				range.moveStart("character", -inputArea.value.length);
				range.moveEnd("character", -inputArea.value.length);
				range.moveEnd("character", stateObj.end);
				range.moveStart("character", stateObj.start);
				range.select();
			}
		};

		this.setInputAreaSelectionStartEnd = function(){

			if (inputArea.selectionStart || inputArea.selectionStart === 0) {

				stateObj.start = inputArea.selectionStart;
				stateObj.end = inputArea.selectionEnd;
			}
			else if (doc.selection) {

				stateObj.text = util.fixEolChars(inputArea.value);

				// IE loses the selection in the textarea when buttons are
				// clicked.  On IE we cache the selection and set a flag
				// which we check for here.
				var range;
				if(wmd.ieRetardedClick && wmd.ieCachedRange) {
					range = wmd.ieCachedRange;
					wmd.ieRetardedClick = false;
				}
				else {
					range = doc.selection.createRange();
				}

				var fixedRange = util.fixEolChars(range.text);
				var marker = "\x07";
				var markedRange = marker + fixedRange + marker;
				range.text = markedRange;
				var inputText = util.fixEolChars(inputArea.value);

				range.moveStart("character", -markedRange.length);
				range.text = fixedRange;

				stateObj.start = inputText.indexOf(marker);
				stateObj.end = inputText.lastIndexOf(marker) - marker.length;

				var len = stateObj.text.length - util.fixEolChars(inputArea.value).length;

				if (len) {
					range.moveStart("character", -fixedRange.length);
					while (len--) {
						fixedRange += "\n";
						stateObj.end += 1;
					}
					range.text = fixedRange;
				}

				this.setInputAreaSelection();
			}
		};

		// Restore this state into the input area.
		this.restore = function(){

			if (stateObj.text !== undefined && stateObj.text != inputArea.value) {
				inputArea.value = stateObj.text;
        //value is assigned here
			}
			this.setInputAreaSelection();
			inputArea.scrollTop = stateObj.scrollTop;
		};

		// Gets a collection of HTML chunks from the inptut textarea.
		this.getChunks = function(){

			var chunk = new wmd.Chunks();

			chunk.before = util.fixEolChars(stateObj.text.substring(0, stateObj.start));
			chunk.startTag = "";
			chunk.selection = util.fixEolChars(stateObj.text.substring(stateObj.start, stateObj.end));
			chunk.endTag = "";
			chunk.after = util.fixEolChars(stateObj.text.substring(stateObj.end));
			chunk.scrollTop = stateObj.scrollTop;

			return chunk;
		};

		// Sets the TextareaState properties given a chunk of markdown.
		this.setChunks = function(chunk){

			chunk.before = chunk.before + chunk.startTag;
			chunk.after = chunk.endTag + chunk.after;

			if (global.isOpera) {
				chunk.before = chunk.before.replace(/\n/g, "\r\n");
				chunk.selection = chunk.selection.replace(/\n/g, "\r\n");
				chunk.after = chunk.after.replace(/\n/g, "\r\n");
			}

			this.start = chunk.before.length;
			this.end = chunk.before.length + chunk.selection.length;
			this.text = chunk.before + chunk.selection + chunk.after;
			this.scrollTop = chunk.scrollTop;
		};

		this.init();
	};

	// before: contains all the text in the input box BEFORE the selection.
	// after: contains all the text in the input box AFTER the selection.
	wmd.Chunks = function(){
	};

	// startRegex: a regular expression to find the start tag
	// endRegex: a regular expresssion to find the end tag
	wmd.Chunks.prototype.findTags = function(startRegex, endRegex){

		var chunkObj = this;
		var regex;

		if (startRegex) {

			regex = util.extendRegExp(startRegex, "", "$");

			this.before = this.before.replace(regex,
				function(match){
					chunkObj.startTag = chunkObj.startTag + match;
					return "";
				});

			regex = util.extendRegExp(startRegex, "^", "");

			this.selection = this.selection.replace(regex,
				function(match){
					chunkObj.startTag = chunkObj.startTag + match;
					return "";
				});
		}

		if (endRegex) {

			regex = util.extendRegExp(endRegex, "", "$");

			this.selection = this.selection.replace(regex,
				function(match){
					chunkObj.endTag = match + chunkObj.endTag;
					return "";
				});

			regex = util.extendRegExp(endRegex, "^", "");

			this.after = this.after.replace(regex,
				function(match){
					chunkObj.endTag = match + chunkObj.endTag;
					return "";
				});
		}
	};

	// If remove is false, the whitespace is transferred
	// to the before/after regions.
	//
	// If remove is true, the whitespace disappears.
	wmd.Chunks.prototype.trimWhitespace = function(remove){

		this.selection = this.selection.replace(/^(\s*)/, "");

		if (!remove) {
			this.before += re.$1;
		}

		this.selection = this.selection.replace(/(\s*)$/, "");

		if (!remove) {
			this.after = re.$1 + this.after;
		}
	};


	wmd.Chunks.prototype.skipLines = function(nLinesBefore, nLinesAfter, findExtraNewlines){

		if (nLinesBefore === undefined) {
			nLinesBefore = 1;
		}

		if (nLinesAfter === undefined) {
			nLinesAfter = 1;
		}

		nLinesBefore++;
		nLinesAfter++;

		var regexText;
		var replacementText;

        if (global.isChrome) {//Chrome bug workaround
            'X'.match(/()./);
        }

		this.selection = this.selection.replace(/(^\n*)/, "");
		this.startTag = this.startTag + re.$1;
		this.selection = this.selection.replace(/(\n*$)/, "");
		this.endTag = this.endTag + re.$1;
		this.startTag = this.startTag.replace(/(^\n*)/, "");
		this.before = this.before + re.$1;
		this.endTag = this.endTag.replace(/(\n*$)/, "");
		this.after = this.after + re.$1;

		if (this.before) {

			regexText = replacementText = "";

			while (nLinesBefore--) {
				regexText += "\\n?";
				replacementText += "\n";
			}

			if (findExtraNewlines) {
				regexText = "\\n*";
			}
			this.before = this.before.replace(new re(regexText + "$", ""), replacementText);
		}

		if (this.after) {

			regexText = replacementText = "";

			while (nLinesAfter--) {
				regexText += "\\n?";
				replacementText += "\n";
			}
			if (findExtraNewlines) {
				regexText = "\\n*";
			}

			this.after = this.after.replace(new re(regexText, ""), replacementText);
		}
	};

	// The markdown symbols - 4 spaces = code, > = blockquote, etc.
	command.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";

	// Remove markdown symbols from the chunk selection.
	command.unwrap = function(chunk){
		var txt = new re("([^\\n])\\n(?!(\\n|" + command.prefixes + "))", "g");
		chunk.selection = chunk.selection.replace(txt, "$1 $2");
	};

	command.wrap = function(chunk, len){
		command.unwrap(chunk);
		var regex = new re("(.{1," + len + "})( +|$\\n?)", "gm");

		chunk.selection = chunk.selection.replace(regex, function(line, marked){
			if (new re("^" + command.prefixes, "").test(line)) {
				return line;
			}
			return marked + "\n";
		});

		chunk.selection = chunk.selection.replace(/\s+$/, "");
	};

	command.doBold = function(chunk, postProcessing){
		return command.doBorI(chunk, postProcessing, 2, gettext("strong text"));
	};

	command.doItalic = function(chunk, postProcessing){
		return command.doBorI(chunk, postProcessing, 1, gettext("emphasized text"));
	};

	// chunk: The selected region that will be enclosed with */**
	// nStars: 1 for italics, 2 for bold
	// insertText: If you just click the button without highlighting text, this gets inserted
	command.doBorI = function(chunk, postProcessing, nStars, insertText){

		// Get rid of whitespace and fixup newlines.
		chunk.trimWhitespace();
		chunk.selection = chunk.selection.replace(/\n{2,}/g, "\n");

		// Look for stars before and after.  Is the chunk already marked up?
		chunk.before.search(/(\**$)/);
		var starsBefore = re.$1;

		chunk.after.search(/(^\**)/);
		var starsAfter = re.$1;

		var prevStars = Math.min(starsBefore.length, starsAfter.length);

		// Remove stars if we have to since the button acts as a toggle.
		if ((prevStars >= nStars) && (prevStars != 2 || nStars != 1)) {
			chunk.before = chunk.before.replace(re("[*]{" + nStars + "}$", ""), "");
			chunk.after = chunk.after.replace(re("^[*]{" + nStars + "}", ""), "");
		}
		else if (!chunk.selection && starsAfter) {
			// It's not really clear why this code is necessary.  It just moves
			// some arbitrary stuff around.
			chunk.after = chunk.after.replace(/^([*_]*)/, "");
			chunk.before = chunk.before.replace(/(\s?)$/, "");
			var whitespace = re.$1;
			chunk.before = chunk.before + starsAfter + whitespace;
		}
		else {

			// In most cases, if you don't have any selected text and click the button
			// you'll get a selected, marked up region with the default text inserted.
			if (!chunk.selection && !starsAfter) {
				chunk.selection = insertText;
			}

			// Add the true markup.
			var markup = nStars <= 1 ? "*" : "**"; // shouldn't the test be = ?
			chunk.before = chunk.before + markup;
			chunk.after = markup + chunk.after;
		}

		return;
	};

	command.stripLinkDefs = function(text, defsToAdd){

		text = text.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,
			function(totalMatch, id, link, newlines, title){
				defsToAdd[id] = totalMatch.replace(/\s*$/, "");
				if (newlines) {
					// Strip the title and return that separately.
					defsToAdd[id] = totalMatch.replace(/["(](.+?)[")]$/, "");
					return newlines + title;
				}
				return "";
			});

		return text;
	};

	command.addLinkDef = function(chunk, linkDef){

		var refNumber = 0; // The current reference number
		var defsToAdd = {}; //
		// Start with a clean slate by removing all previous link definitions.
		chunk.before = command.stripLinkDefs(chunk.before, defsToAdd);
		chunk.selection = command.stripLinkDefs(chunk.selection, defsToAdd);
		chunk.after = command.stripLinkDefs(chunk.after, defsToAdd);

		var defs = "";
		var regex = /(\[(?:\[[^\]]*\]|[^\[\]])*\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;

		var addDefNumber = function(def){
			refNumber++;
			def = def.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + refNumber + "]:");
			defs += "\n" + def;
		};

		var getLink = function(wholeMatch, link, id, end){

			if (defsToAdd[id]) {
				addDefNumber(defsToAdd[id]);
				return link + refNumber + end;

			}
			return wholeMatch;
		};

		chunk.before = chunk.before.replace(regex, getLink);

		if (linkDef) {
			addDefNumber(linkDef);
		}
		else {
			chunk.selection = chunk.selection.replace(regex, getLink);
		}

		var refOut = refNumber;

		chunk.after = chunk.after.replace(regex, getLink);

		if (chunk.after) {
			chunk.after = chunk.after.replace(/\n*$/, "");
		}
		if (!chunk.after) {
			chunk.selection = chunk.selection.replace(/\n*$/, "");
		}

		chunk.after += "\n\n" + defs;

		return refOut;
	};

	command.doLinkOrImage = function(chunk, postProcessing, itemType){

		chunk.trimWhitespace();
		chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);

		if (chunk.endTag.length > 1) {

			chunk.startTag = chunk.startTag.replace(/!?\[/, "");
			chunk.endTag = "";
			command.addLinkDef(chunk, null);

		}
		else {

			if (/\n\n/.test(chunk.selection)) {
				command.addLinkDef(chunk, null);
				return;
			}

			// The function to be executed when you enter a link and press OK or Cancel.
			// Marks up the link and adds the ref.
    var makeLinkMarkdown = function(link){

        if (link !== null) {

            chunk.startTag = chunk.endTag = "";
            //var linkDef = " [999]: " + link;

            //var num = command.addLinkDef(chunk, linkDef);
            chunk.startTag = (itemType == 'image') ? "![" : "[";
            chunk.endTag = "](" + link + ")";

            if (!chunk.selection) {
                if (itemType == 'image') {
                    chunk.selection = gettext("image description");
                }
                else if (itemType == 'file'){
                    chunk.selection = localUploadFileName || gettext("file name");
                    localUploadFileName = null;
                }
                else {
                    chunk.selection = gettext("link text");
                }
            }
        }
        else {
            if (itemType == 'image' || itemType == 'file'){
                return;
            }
        }
        postProcessing();
    };
    if (itemType == 'image') {
        // add forth param to identify image window
        util.prompt(imageDialogText, imageDefaultText, makeLinkMarkdown, 'image');
    }
    else if (itemType == 'file'){
        util.prompt(fileDialogText, '', makeLinkMarkdown, 'file');
    }
    else {
        util.prompt(linkDialogText, linkDefaultText, makeLinkMarkdown, 'link');
    }
    return true;
    }
};

	util.makeAPI = function(){
		wmd.wmd = {};
		wmd.wmd.editor = wmd.editor;
		wmd.wmd.previewManager = wmd.previewManager;
	};

    util.makeId = function(idToken) {
        if (wmd.wmd_env['idSeed']) {
            return askbotMakeId(idToken, wmd.wmd_env['idSeed']);
        }
        return idToken;
    };

	util.startEditor = function(start_now, buttons, idSeed){

        wmd.wmd_env['idSeed'] = idSeed;

		if (wmd.wmd_env.autostart === false) {
			util.makeAPI();
			return;
		}

        if (buttons){
            wmd.wmd_env.buttons = buttons;
        }

		var edit;		// The editor (buttons + input + outputs) - the main object.
		var previewMgr;	// The preview manager.

		// Fired after the page has fully loaded.
		var loadListener = function(){

			wmd.panels = new wmd.PanelCollection();
			if (!wmd.panels.input) {
				return;
			}

			previewMgr = new wmd.previewManager();
			var previewRefreshCallback = previewMgr.refresh;

			edit = new wmd.editor(previewRefreshCallback);

			previewMgr.refresh(true);

		};

        if (start_now){
            loadListener();
        } else {
		    util.addEvent(window, "load", loadListener);
        }
	};

	wmd.previewManager = function(){

		var managerObj = this;
		var converter;
		var poller;
		var timeout;
		var elapsedTime;
		var oldInputText;
		var htmlOut;
		var maxDelay = 3000;
		var startType = "delayed"; // The other legal value is "manual"

		// Adds event listeners to elements and creates the input poller.
		var setupEvents = function(inputElem, listener){

			util.addEvent(inputElem, "input", listener);
			inputElem.onpaste = listener;
			inputElem.ondrop = listener;

			util.addEvent(inputElem, "keypress", listener);
			util.addEvent(inputElem, "keydown", listener);
			// previewPollInterval is set at the top of this file.
			poller = new wmd.inputPoller(listener, previewPollInterval);
		};

		var getDocScrollTop = function(){

			var result = 0;

			if (window.innerHeight) {
				result = pageYOffset;
			}
			else
				if (doc.documentElement && doc.documentElement.scrollTop) {
					result = doc.documentElement.scrollTop;
				}
				else
					if (doc.body) {
						result = doc.body.scrollTop;
					}

			return result;
		};

		var makePreviewHtml = function(){

			// If there are no registered preview and output panels
			// there is nothing to do.
			if (!wmd.panels.preview && !wmd.panels.output) {
				return;
			}

			var text = wmd.panels.input.value;
			if (text && text == oldInputText) {
				return; // Input text hasn't changed.
			}
			else {
				oldInputText = text;
			}

			var prevTime = new Date().getTime();

			if (!converter) {
                converter = getAskbotMarkdownConverter();
			}

			if (converter) {
				text = converter.makeHtml(text);
			}

			// Calculate the processing time of the HTML creation.
			// It's used as the delay time in the event listener.
			var currTime = new Date().getTime();
			elapsedTime = currTime - prevTime;

			pushPreviewHtml(text);
			htmlOut = text;
		};

		// setTimeout is already used.  Used as an event listener.
		var applyTimeout = function(){

			if (timeout) {
				clearTimeout(timeout);
				timeout = undefined;
			}

			if (startType !== "manual") {

				var delay = 0;

				if (startType === "delayed") {
					delay = elapsedTime;
				}

				if (delay > maxDelay) {
					delay = maxDelay;
				}
				timeout = setTimeout(makePreviewHtml, delay);
			}
		};

		var getScaleFactor = function(panel){
			if (panel.scrollHeight <= panel.clientHeight) {
				return 1;
			}
			return panel.scrollTop / (panel.scrollHeight - panel.clientHeight);
		};

		var setPanelScrollTops = function(){

			if (wmd.panels.preview) {
				wmd.panels.preview.scrollTop = (wmd.panels.preview.scrollHeight - wmd.panels.preview.clientHeight) * getScaleFactor(wmd.panels.preview);
			}

			if (wmd.panels.output) {
				wmd.panels.output.scrollTop = (wmd.panels.output.scrollHeight - wmd.panels.output.clientHeight) * getScaleFactor(wmd.panels.output);
			}
		};

		this.refresh = function(requiresRefresh){

			if (requiresRefresh) {
				oldInputText = "";
				makePreviewHtml();
			}
			else {
				applyTimeout();
			}
		};

		this.processingTime = function(){
			return elapsedTime;
		};

		// The output HTML
		this.output = function(){
			return htmlOut;
		};

		// The mode can be "manual" or "delayed"
		this.setUpdateMode = function(mode){
			startType = mode;
			managerObj.refresh();
		};

		var isFirstTimeFilled = true;

		var pushPreviewHtml = function(text){

			var emptyTop = position.getTop(wmd.panels.input) - getDocScrollTop();

			// Send the encoded HTML to the output textarea/div.
			if (wmd.panels.output) {
				// The value property is only defined if the output is a textarea.
				if (wmd.panels.output.value !== undefined) {
					wmd.panels.output.value = text;
          //value is assigned here
					wmd.panels.output.readOnly = true;
				}
				// Otherwise we are just replacing the text in a div.
				// Send the HTML wrapped in <pre><code>
				else {
					var newText = text.replace(/&/g, "&amp;");
					newText = newText.replace(/</g, "&lt;");
					wmd.panels.output.innerHTML = "<pre><code>" + newText + "</code></pre>";
				}
			}

			if (wmd.panels.preview) {
				wmd.panels.preview.innerHTML = text;
			}

			setPanelScrollTops();

			if (isFirstTimeFilled) {
				isFirstTimeFilled = false;
				return;
			}

			var fullTop = position.getTop(wmd.panels.input) - getDocScrollTop();

			if (global.isIE) {
				setTimeout(function(){
					scrollBy(0, fullTop - emptyTop);
				}, 0);
			}
			else {
				scrollBy(0, fullTop - emptyTop);
			}
		};

		var init = function(){
			if (!wmd.panels.input) {
				return;
			}

			setupEvents(wmd.panels.input, applyTimeout);
			makePreviewHtml();

			if (wmd.panels.preview) {
				wmd.panels.preview.scrollTop = 0;
			}
			if (wmd.panels.output) {
				wmd.panels.output.scrollTop = 0;
			}
		};

		this.destroy = function(){
			if (poller) {
				poller.destroy();
			}
		};

		init();
	};

	// When making a list, hitting shift-enter will put your cursor on the next line
	// at the current indent level.
	command.doAutoindent = function(chunk, postProcessing){

		chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n");
		chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
		chunk.before = chunk.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");

		if(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(chunk.before)){
			if(command.doList){
				command.doList(chunk);
			}
		}
		if(/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(chunk.before)){
			if(command.doBlockquote){
				command.doBlockquote(chunk);
			}
		}
		if(/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)){
			if(command.doCode){
				command.doCode(chunk);
			}
		}
	};

	command.doBlockquote = function(chunk, postProcessing){

		chunk.selection = chunk.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,
			function(totalMatch, newlinesBefore, text, newlinesAfter){
				chunk.before += newlinesBefore;
				chunk.after = newlinesAfter + chunk.after;
				return text;
			});

		chunk.before = chunk.before.replace(/(>[ \t]*)$/,
			function(totalMatch, blankLine){
				chunk.selection = blankLine + chunk.selection;
				return "";
			});

		chunk.selection = chunk.selection.replace(/^(\s|>)+$/ ,"");
		chunk.selection = chunk.selection || "Blockquote";

		if(chunk.before){
			chunk.before = chunk.before.replace(/\n?$/,"\n");
		}
		if(chunk.after){
			chunk.after = chunk.after.replace(/^\n?/,"\n");
		}

		chunk.before = chunk.before.replace(/(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*$)/,
			function(totalMatch){
				chunk.startTag = totalMatch;
				return "";
			});

		chunk.after = chunk.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,
			function(totalMatch){
				chunk.endTag = totalMatch;
				return "";
			});

		var replaceBlanksInTags = function(useBracket){

			var replacement = useBracket ? "> " : "";

			if(chunk.startTag){
				chunk.startTag = chunk.startTag.replace(/\n((>|\s)*)\n$/,
					function(totalMatch, markdown){
						return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
					});
			}
			if(chunk.endTag){
				chunk.endTag = chunk.endTag.replace(/^\n((>|\s)*)\n/,
					function(totalMatch, markdown){
						return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
					});
			}
		};

		if(/^(?![ ]{0,3}>)/m.test(chunk.selection)){
			command.wrap(chunk, wmd.wmd_env.lineLength - 2);
			chunk.selection = chunk.selection.replace(/^/gm, "> ");
			replaceBlanksInTags(true);
			chunk.skipLines();
		}
		else{
			chunk.selection = chunk.selection.replace(/^[ ]{0,3}> ?/gm, "");
			command.unwrap(chunk);
			replaceBlanksInTags(false);

			if(!/^(\n|^)[ ]{0,3}>/.test(chunk.selection) && chunk.startTag){
				chunk.startTag = chunk.startTag.replace(/\n{0,2}$/, "\n\n");
			}

			if(!/(\n|^)[ ]{0,3}>.*$/.test(chunk.selection) && chunk.endTag){
				chunk.endTag=chunk.endTag.replace(/^\n{0,2}/, "\n\n");
			}
		}

		if(!/\n/.test(chunk.selection)){
			chunk.selection = chunk.selection.replace(/^(> *)/,
			function(wholeMatch, blanks){
				chunk.startTag += blanks;
				return "";
			});
		}
	};

	command.doCode = function(chunk, postProcessing){

		var hasTextBefore = /\S[ ]*$/.test(chunk.before);
		var hasTextAfter = /^[ ]*\S/.test(chunk.after);

		// Use 'four space' markdown if the selection is on its own
		// line or is multiline.
		if((!hasTextAfter && !hasTextBefore) || /\n/.test(chunk.selection)){

			chunk.before = chunk.before.replace(/[ ]{4}$/,
				function(totalMatch){
					chunk.selection = totalMatch + chunk.selection;
					return "";
				});

			var nLinesBack = 1;
			var nLinesForward = 1;

			if(/\n(\t|[ ]{4,}).*\n$/.test(chunk.before)){
				nLinesBack = 0;
			}
			if(/^\n(\t|[ ]{4,})/.test(chunk.after)){
				nLinesForward = 0;
			}

			chunk.skipLines(nLinesBack, nLinesForward);

			if(!chunk.selection){
				chunk.startTag = "    ";
				chunk.selection = gettext("enter code here");
			}
			else {
				if(/^[ ]{0,3}\S/m.test(chunk.selection)){
					chunk.selection = chunk.selection.replace(/^/gm, "    ");
				}
				else{
					chunk.selection = chunk.selection.replace(/^[ ]{4}/gm, "");
				}
			}
		}
		else{
			// Use backticks (`) to delimit the code block.

			chunk.trimWhitespace();
			chunk.findTags(/`/, /`/);

			if(!chunk.startTag && !chunk.endTag){
				chunk.startTag = chunk.endTag="`";
				if(!chunk.selection){
					chunk.selection = gettext("enter code here");
				}
			}
			else if(chunk.endTag && !chunk.startTag){
				chunk.before += chunk.endTag;
				chunk.endTag = "";
			}
			else{
				chunk.startTag = chunk.endTag="";
			}
		}
	};

	command.doList = function(chunk, postProcessing, isNumberedList){

		// These are identical except at the very beginning and end.
		// Should probably use the regex extension function to make this clearer.
		var previousItemsRegex = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
		var nextItemsRegex = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;

		// The default bullet is a dash but others are possible.
		// This has nothing to do with the particular HTML bullet,
		// it's just a markdown bullet.
		var bullet = "-";

		// The number in a numbered list.
		var num = 1;

		// Get the item prefix - e.g. " 1. " for a numbered list, " - " for a bulleted list.
		var getItemPrefix = function(){
			var prefix;
			if(isNumberedList){
				prefix = " " + num + ". ";
				num++;
			}
			else{
				prefix = " " + bullet + " ";
			}
			return prefix;
		};

		// Fixes the prefixes of the other list items.
		var getPrefixedItem = function(itemText){

			// The numbering flag is unset when called by autoindent.
			if(isNumberedList === undefined){
				isNumberedList = /^\s*\d/.test(itemText);
			}

			// Renumber/bullet the list element.
			itemText = itemText.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm,
				function( _ ){
					return getItemPrefix();
				});

			return itemText;
		};

		chunk.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);

		if(chunk.before && !/\n$/.test(chunk.before) && !/^\n/.test(chunk.startTag)){
			chunk.before += chunk.startTag;
			chunk.startTag = "";
		}

		if(chunk.startTag){

			var hasDigits = /\d+[.]/.test(chunk.startTag);
			chunk.startTag = "";
			chunk.selection = chunk.selection.replace(/\n[ ]{4}/g, "\n");
			command.unwrap(chunk);
			chunk.skipLines();

			if(hasDigits){
				// Have to renumber the bullet points if this is a numbered list.
				chunk.after = chunk.after.replace(nextItemsRegex, getPrefixedItem);
			}
			if(isNumberedList == hasDigits){
				return;
			}
		}

		var nLinesUp = 1;

		chunk.before = chunk.before.replace(previousItemsRegex,
			function(itemText){
				if(/^\s*([*+-])/.test(itemText)){
					bullet = re.$1;
				}
				nLinesUp = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
				return getPrefixedItem(itemText);
			});

		if(!chunk.selection){
			chunk.selection = gettext("List item");
		}

		var prefix = getItemPrefix();

		var nLinesDown = 1;

		chunk.after = chunk.after.replace(nextItemsRegex,
			function(itemText){
				nLinesDown = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
				return getPrefixedItem(itemText);
			});

		chunk.trimWhitespace(true);
		chunk.skipLines(nLinesUp, nLinesDown, true);
		chunk.startTag = prefix;
		var spaces = prefix.replace(/./g, " ");
		command.wrap(chunk, wmd.wmd_env.lineLength - spaces.length);
		chunk.selection = chunk.selection.replace(/\n/g, "\n" + spaces);

	};

	command.doHeading = function(chunk, postProcessing){

		// Remove leading/trailing whitespace and reduce internal spaces to single spaces.
		chunk.selection = chunk.selection.replace(/\s+/g, " ");
		chunk.selection = chunk.selection.replace(/(^\s+|\s+$)/g, "");

		// If we clicked the button with no selected text, we just
		// make a level 2 hash header around some default text.
		if(!chunk.selection){
			chunk.startTag = "## ";
			chunk.selection = gettext("Heading");
			chunk.endTag = " ##";
			return;
		}

		var headerLevel = 0;		// The existing header level of the selected text.

		// Remove any existing hash heading markdown and save the header level.
		chunk.findTags(/#+[ ]*/, /[ ]*#+/);
		if(/#+/.test(chunk.startTag)){
			headerLevel = re.lastMatch.length;
		}
		chunk.startTag = chunk.endTag = "";

		// Try to get the current header level by looking for - and = in the line
		// below the selection.
		chunk.findTags(null, /\s?(-+|=+)/);
		if(/=+/.test(chunk.endTag)){
			headerLevel = 1;
		}
		if(/-+/.test(chunk.endTag)){
			headerLevel = 2;
		}

		// Skip to the next line so we can create the header markdown.
		chunk.startTag = chunk.endTag = "";
		chunk.skipLines(1, 1);

		// We make a level 2 header if there is no current header.
		// If there is a header level, we substract one from the header level.
		// If it's already a level 1 header, it's removed.
		var headerLevelToCreate = headerLevel == 0 ? 2 : headerLevel - 1;

		if(headerLevelToCreate > 0){

			// The button only creates level 1 and 2 underline headers.
			// Why not have it iterate over hash header levels?  Wouldn't that be easier and cleaner?
			var headerChar = headerLevelToCreate >= 2 ? "-" : "=";
			var len = chunk.selection.length;
			if(len > wmd.wmd_env.lineLength){
				len = wmd.wmd_env.lineLength;
			}
			chunk.endTag = "\n";
			while(len--){
				chunk.endTag += headerChar;
			}
		}
	};

	command.doHorizontalRule = function(chunk, postProcessing){
		chunk.startTag = "----------\n";
		chunk.selection = "";
		chunk.skipLines(2, 1, true);
	}
};


Attacklab.wmd_env = {};
Attacklab.account_options = {};
Attacklab.wmd_defaults = {version:1, output:"Markdown", lineLength:40, delayLoad:false};

if (askbot['settings']['editorType'] == 'markdown' && !Attacklab.wmd) {
	Attacklab.wmd = function() {
		Attacklab.loadEnv = function() {
			var mergeEnv = function(env) {
				if(!env) {
					return;
				}

				for(var key in env) {
					Attacklab.wmd_env[key] = env[key];
				}
			};

			mergeEnv(Attacklab.wmd_defaults);
			mergeEnv(Attacklab.account_options);
			mergeEnv(window["wmd_options"]);
			Attacklab.full = true;

			var defaultButtons = "bold italic link blockquote code image attachment ol ul heading hr";
			Attacklab.wmd_env.buttons = Attacklab.wmd_env.buttons || defaultButtons;
		};
		Attacklab.loadEnv();

	};

	Attacklab.wmd();
	Attacklab.wmdBase();
	Attacklab.Util.startEditor();
};

/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}var validator=$.data(this[0],'validator');if(validator){return validator;}validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}this.submit(function(event){if(validator.settings.debug)event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}return false;}return true;}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}return handle();}else{validator.focusInvalid();return false;}});}return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}if(params.constructor!=Array){params=[params];}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)this.element(element);else if(element.parentNode.name in this.submitted)this.element(element.parentNode);},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0]);}$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",delegate).validateDelegate(":radio, :checkbox, select, option","click",delegate);if(this.settings.invalidHandler)$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}if(dependencyMismatch)return;if(this.objectLength(rules))this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)return arguments[i];}return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}if(!this.labelContainer.append(label).length)this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))return this.findByName(element.name).filter(':checked').length;}return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}if(rules.messages){delete rules.messages;}return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=(previous.message=response||validator.defaultMessage(element,"remote"));errors[element.name]=$.isFunction(message)?message(value):message;validator.showErrors(errors);}previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))return"dependency-mismatch";if(/[^0-9-]+/.test(value))return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)nDigit-=9;}nCheck+=nDigit;bEven=!bEven;}return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}return(pendingRequests[port]=ajax.apply(this,arguments));}return ajax.apply(this,arguments);};})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);
/* google prettify.js from google code */
var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function () {function L(a) {function m(a) {var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:'0'<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a) {if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a) {for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
[],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c) {var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function (a,f) {return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a) {for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c) {var j=f[c];j==='('?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function (a) {a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p) {var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))) {s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p) {g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+')')}return RegExp(n.join("|"),l?"gi":"g")}function M(a) {function m(a) {switch(a.nodeType) {case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h) {m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m) {function e(a) {for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n) {var f=g[n],b=r[f],o=void 0,c;if(typeof b===
"string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])) {b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c) {c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function () {for(var e=a.concat(m),
l=[],p={},d=0,g=e.length;d<g;++d) {var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a) {var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
"");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m) {function e(a) {switch(a.nodeType) {case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p) {var b=a.nodeValue,d=b.match(t);if(d) {var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a) {function b(a,d) {var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f) {var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m) {for(var e=m.length;--e>=0;) {var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m) {if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a) {var m=
a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;) {for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;) {var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))) {k&&(j=j.replace(m,"\r"));i.nodeValue=
j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w) {"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function (a,m,e) {var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function (a) {function m() {for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++) {var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0) {var k=k.match(g),f,b;if(b=
!k) {b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0) {b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function () {return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();

/*
Scripts for cnprog.com
Project Name: Lanai
All Rights Resevred 2008. CNPROG.COM
*/
var lanai = {
    /**
     * Finds any <pre><code></code></pre> tags which aren't registered for
     * pretty printing, adds the appropriate class name and invokes prettify.
     */
    highlightSyntax: function () {
        var styled = false;
        $('pre code').parent().each(function () {
            if (!$(this).hasClass('prettyprint')) {
                $(this).addClass('prettyprint');
                styled = true;
            }
        });

        if (styled) {
            prettyPrint();
        }
    }
};

//todo: clean-up now there is utils:WaitIcon
function appendLoader(element) {
    loading = gettext('loading...');
    element.append('<img class="ajax-loader" ' +
        'src="' + mediaUrl('media/images/indicator.gif') + '" title="' +
        loading +
        '" alt="' +
        loading +
    '" />');
}

function removeLoader() {
    $('img.ajax-loader').remove();
}

function setSubmitButtonDisabled(form, isDisabled) {
    form.find('input[type="submit"]').attr('disabled', isDisabled);
}

function enableSubmitButton(form) {
    setSubmitButtonDisabled(form, false);
}

function disableSubmitButton(form) {
    setSubmitButtonDisabled(form, true);
}

function setupFormValidation(form, validationRules, validationMessages, onSubmitCallback) {
    enableSubmitButton(form);
    var placementLocation = askbot.settings.errorPlacement;
    var placementClass = placementLocation ? ' ' + placementLocation : '';
    form.validate({
        debug: true,
        rules: (validationRules ? validationRules : {}),
        messages: (validationMessages ? validationMessages : {}),
        errorElement: 'span',
        errorClass: 'form-error' + placementClass,
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            var formGroup = $(element).closest('.form-group');
            formGroup.removeClass('has-error');
            formGroup.find('.form-error').remove();
        },
        errorPlacement: function (error, element) {
            //bs3 error placement
            var label = element.closest('.form-group').find('label');
            if (placementLocation === 'in-label') {
                label.html(error);
                return;
            } else if (placementLocation === 'after-label') {
                var errorLabel = element.closest('.form-group').find('.form-error');
                if (errorLabel.length) {
                    errorLabel.replaceWith(error);
                } else {
                    label.after(error);
                }
                return;
            }

            //old askbot error placement
            var span = element.next().find('.form-error');
            if (span.length === 0) {
                span = element.parent().find('.form-error');
                if (span.length === 0) {
                    //for resizable textarea
                    var element_id = element.attr('id');
                    $('label[for="' + element_id + '"]').after(error);
                }
            } else {
                span.replaceWith(error);
            }
        },
        submitHandler: function (form_dom) {
            disableSubmitButton($(form_dom));

            if (onSubmitCallback) {
                onSubmitCallback(form_dom);
            } else {
                form_dom.submit();
            }
        }
    });
}

var validateTagLength = function (value) {
    var tags = getUniqueWords(value);
    var are_tags_ok = true;
    $.each(tags, function (index, value) {
        if (value.length > askbot.settings.maxTagLength) {
            are_tags_ok = false;
        }
    });
    return are_tags_ok;
};
var validateTagCount = function (value) {
    var tags = getUniqueWords(value);
    return (tags.length <= askbot.settings.maxTagsPerPost);
};

$.validator.addMethod('limit_tag_count', validateTagCount);
$.validator.addMethod('limit_tag_length', validateTagLength);

var CPValidator = (function () {
    return {
        getQuestionFormRules: function () {
            return {
                tags: {
                    required: askbot.settings.tagsAreRequired,
                    maxlength: 105,
                    limit_tag_count: true,
                    limit_tag_length: true
                },
                text: {
                    required: !!askbot.settings.minQuestionBodyLength,
                    minlength: askbot.settings.minQuestionBodyLength
                },
                title: {
                    required: true,
                    minlength: askbot.settings.minTitleLength
                }
            };
        },
        getQuestionFormMessages: function () {
            return {
                tags: {
                    required: ' ' + gettext('tags cannot be empty'),
                    maxlength: askbot.messages.tagLimits,
                    limit_tag_count: askbot.messages.maxTagsPerPost,
                    limit_tag_length: askbot.messages.maxTagLength
                },
                text: {
                    required: ' ' + gettext('details are required'),
                    minlength: interpolate(
                                    ngettext(
                                        'details must have > %s character',
                                        'details must have > %s characters',
                                        askbot.settings.minQuestionBodyLength
                                    ),
                                    [askbot.settings.minQuestionBodyLength]
                                )
                },
                title: {
                    required: ' ' + gettext('enter your question'),
                    minlength: interpolate(
                                    ngettext(
                                        '%(question)s must have > %(length)s character',
                                        '%(question)s must have > %(length)s characters',
                                        askbot.settings.minTitleLength
                                    ),
                                    {
                                        'question': askbot.messages.questionSingular,
                                        'length': askbot.settings.minTitleLength
                                    },
                                    true
                                )
                }
            };
        },
        getAnswerFormRules: function () {
            return {
                text: {
                    required: true,
                    minlength: askbot.settings.minAnswerBodyLength
                }
            };
        },
        getAnswerFormMessages: function () {
            return {
                text: {
                    required: ' ' + gettext('content cannot be empty'),
                    minlength: interpolate(
                                    ngettext(
                                        '%(answer)s must be > %(length)s character',
                                        '%(answer)s must be > %(length)s characters',
                                        askbot.settings.minAnswerBodyLength
                                    ),
                                    {
                                        'answer': askbot.messages.answerSingular,
                                        'length': askbot.settings.minAnswerBodyLength
                                    },
                                    true
                                )
                }
            };
        }
    };
})();

/**
 * @constructor
 */
var ThreadUsersDialog = function () {
    SimpleControl.call(this);
    this._heading_text = 'Add heading with the setHeadingText()';
};
inherits(ThreadUsersDialog, SimpleControl);

ThreadUsersDialog.prototype.setHeadingText = function (text) {
    this._heading_text = text;
};

ThreadUsersDialog.prototype.showUsers = function (html) {
    this._dialog.setContent(html);
    this._dialog.show();
};

ThreadUsersDialog.prototype.startShowingUsers = function () {
    var me = this;
    var threadId = this._threadId;
    var url = this._url;
    $.ajax({
        type: 'GET',
        data: {'thread_id': threadId},
        dataType: 'json',
        url: url,
        cache: false,
        success: function (data) {
            if (data.success) {
                me.showUsers(data.html);
            } else {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ThreadUsersDialog.prototype.decorate = function (element) {
    this._element = element;
    ThreadUsersDialog.superClass_.decorate.call(this, element);
    this._threadId = element.data('threadId');
    this._url = element.data('url');
    var dialog = new ModalDialog();
    dialog.setRejectButtonText('');
    dialog.setAcceptButtonText(gettext('Back to the question'));
    dialog.setHeadingText(this._heading_text);
    dialog.setAcceptHandler(function () { dialog.hide(); });
    var dialog_element = dialog.getElement();
    $(dialog_element).find('.modal-footer').css('text-align', 'center');
    $('body').append(dialog_element);
    this._dialog = dialog;
    var me = this;
    this.setHandler(function () {
        me.startShowingUsers();
    });
};

var MergeQuestionsDialog = function () {
    ModalDialog.call(this);
    this._tags = [];
    this._prevQuestionId = undefined;
};
inherits(MergeQuestionsDialog, ModalDialog);

MergeQuestionsDialog.prototype.show = function () {
    MergeQuestionsDialog.superClass_.show.call(this);
    this._idInput.focus();
};

MergeQuestionsDialog.prototype.getStartMergingHandler = function () {
    var me = this;
    return function () {
        $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: askbot.urls.mergeQuestions,
            data: JSON.stringify({
                from_id: me.getFromId(),
                to_id: me.getToId()
            }),
            success: function (data) {
                window.location.reload();
            }
        });
    };
};

MergeQuestionsDialog.prototype.setPreview = function (data) {
    this._previewTitle.html(data.title);
    this._previewBody.html(data.summary);
    for (var i = 0; i < this._tags.length; i++) {
        this._tags[i].dispose();
    }
    for (i = 0; i < data.tags.length; i++) {
        var tag = new Tag();
        tag.setLinkable(false);
        tag.setName(data.tags[i]);
        this._previewTags.append(tag.getElement());
        this._tags.push(tag);
    }
    this._preview.fadeIn();
};

MergeQuestionsDialog.prototype.clearIdInput = function () {
    this._idInput.val('');
};

MergeQuestionsDialog.prototype.clearPreview = function () {
    for (var i = 0; i < this._tags.length; i++) {
        this._tags[i].dispose();
    }
    this._previewTitle.html('');
    this._previewBody.html('');
    this._previewTags.html('');
    this.setAcceptButtonText(gettext('Load preview'));
    this._preview.hide();
};

MergeQuestionsDialog.prototype.getFromId = function () {
    return this._fromId;
};

MergeQuestionsDialog.prototype.getToId = function () {
    return this._idInput.val();
};

MergeQuestionsDialog.prototype.getPrevToId = function () {
    return this._prevQuestionId;
};

MergeQuestionsDialog.prototype.setPrevToId = function (toId) {
    this._prevQuestionId = toId;
};

MergeQuestionsDialog.prototype.getLoadPreviewHandler = function () {
    var me = this;
    return function () {
        var prevId = me.getPrevToId();
        var curId = me.getToId();
        // here I am disabling eqeqeq because it looks like there's a type coercion going on, can't be sure
        // so skipping it
        /*jshint eqeqeq:false*/
        if (curId) {// && curId != prevId) {
        /*jshint eqeqeq:true*/
            $.ajax({
                type: 'GET',
                cache: false,
                dataType: 'json',
                url: askbot.urls.apiV1Questions + curId + '/',
                success: function (data) {
                    me.setPreview(data);
                    me.setPrevToId(curId);
                    me.setAcceptButtonText(gettext('Merge'));
                    me.setPreviewLoaded(true);
                    return false;
                },
                error: function () {
                    me.clearPreview();
                    me.setAcceptButtonText(gettext('Load preview'));
                    me.setPreviewLoaded(false);
                    return false;
                }
            });
        }
    };
};

MergeQuestionsDialog.prototype.setPreviewLoaded = function(isLoaded) {
    this._isPreviewLoaded = isLoaded;
};

MergeQuestionsDialog.prototype.isPreviewLoaded = function() {
    return this._isPreviewLoaded;
};

MergeQuestionsDialog.prototype.getAcceptHandler = function() {
    var me = this;
    return function() {
        var handler;
        if (me.isPreviewLoaded()) {
            handler = me.getStartMergingHandler();
        } else {
            handler = me.getLoadPreviewHandler();
        }
        handler();
        return false;
    };
};

MergeQuestionsDialog.prototype.getRejectHandler = function() {
    var me = this;
    return function() {
        me.clearPreview();
        me.clearIdInput();
        me.setPreviewLoaded(false);
        me.hide();
    };
};

MergeQuestionsDialog.prototype.createDom = function () {
    //make content
    var content = this.makeElement('div');
    var label = this.makeElement('label');
    label.attr('for', 'question_id');
    label.html(gettext(askbot.messages.enterDuplicateQuestionId));
    content.append(label);
    var input = this.makeElement('input');
    input.attr('type', 'text');
    input.attr('name', 'question_id');
    content.append(input);
    this._idInput = input;

    var preview = this.makeElement('div');
    content.append(preview);
    this._preview = preview;
    preview.hide();

    var title = this.makeElement('h3');
    preview.append(title);
    this._previewTitle = title;

    var tags = this.makeElement('div');
    tags.addClass('tags');
    this._preview.append(tags);
    this._previewTags = tags;

    var clr = this.makeElement('div');
    clr.addClass('clearfix');
    this._preview.append(clr);

    var body = this.makeElement('div');
    body.addClass('body');
    this._preview.append(body);
    this._previewBody = body;

    var previewHandler = this.getLoadPreviewHandler();
    var enterHandler = makeKeyHandler(13, previewHandler);
    input.keydown(enterHandler);
    input.blur(previewHandler);

    this.setContent(content);

    this.setClass('merge-questions');
    this.setRejectButtonText(gettext('Cancel'));
    this.setAcceptButtonText(gettext('Load preview'));
    this.setHeadingText(askbot.messages.mergeQuestions);
    this.setRejectHandler(this.getRejectHandler());
    this.setAcceptHandler(this.getAcceptHandler());

    MergeQuestionsDialog.superClass_.createDom.call(this);
    this._element.hide();

    this._fromId = $('.js-question').data('postId');
    //have to do this on document since _element is not in the DOM yet
    $(document).trigger('askbot.afterMergeQuestionsDialogCreateDom', [this]);
};

/**
 * @constructor
 */
var DraftPost = function () {
    WrappedElement.call(this);
};
inherits(DraftPost, WrappedElement);

/**
 * @return {string}
 */
DraftPost.prototype.getUrl = function () {
    throw 'Not Implemented';
};

/**
 * @return {boolean}
 */
DraftPost.prototype.shouldSave = function () {
    throw 'Not Implemented';
};

/**
 * @return {object} data dict
 */
DraftPost.prototype.getData = function () {
    throw 'Not Implemented';
};

DraftPost.prototype.backupData = function () {
    this._old_data = this.getData();
};

DraftPost.prototype.showNotification = function () {
    var note = $('.editor-status span');
    note.hide();
    note.html(gettext('draft saved...'));
    note.fadeIn().delay(3000).fadeOut();
};

DraftPost.prototype.getSaveHandler = function () {
    var me = this;
    return function (save_synchronously) {
        if (me.shouldSave()) {
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                async: save_synchronously ? false : true,
                url: me.getUrl(),
                data: me.getData(),
                success: function (data) {
                    if (data.success && !save_synchronously) {
                        me.showNotification();
                    }
                    me.backupData();
                }
            });
        }
    };
};

DraftPost.prototype.decorate = function (element) {
    this._element = element;
    this.assignContentElements();
    this.backupData();
    setInterval(this.getSaveHandler(), 30000);//auto-save twice a minute
    var me = this;
    window.onbeforeunload = function () {
        var saveHandler = me.getSaveHandler();
        saveHandler(true);
        //var msg = gettext("%s, we've saved your draft, but...");
        //return interpolate(msg, [askbot.data.userName]);
    };
};


/**
 * @contstructor
 */
var DraftQuestion = function () {
    DraftPost.call(this);
};
inherits(DraftQuestion, DraftPost);

DraftQuestion.prototype.getUrl = function () {
    return askbot.urls.saveDraftQuestion;
};

DraftQuestion.prototype.shouldSave = function () {
    var newd = this.getData();
    var oldd = this._old_data;
    return (
        newd.title !== oldd.title ||
        newd.text !== oldd.text ||
        newd.tagnames !== oldd.tagnames
    );
};

DraftQuestion.prototype.getData = function () {
    return {
        'title': this._title_element.val(),
        'text': this._text_element.val(),
        'tagnames': this._tagnames_element.val()
    };
};

DraftQuestion.prototype.assignContentElements = function () {
    this._title_element = $('#id_title');
    this._text_element = $('#editor');
    this._tagnames_element = $('#id_tags');
};

var DraftAnswer = function () {
    DraftPost.call(this);
};
inherits(DraftAnswer, DraftPost);

DraftAnswer.prototype.setThreadId = function (id) {
    this._threadId = id;
};

DraftAnswer.prototype.getUrl = function () {
    return askbot.urls.saveDraftAnswer;
};

DraftAnswer.prototype.shouldSave = function () {
    return this.getData().text !== this._old_data.text;
};

DraftAnswer.prototype.getData = function () {
    return {
        'text': this._textElement.val(),
        'thread_id': this._threadId
    };
};

DraftAnswer.prototype.assignContentElements = function () {
    this._textElement = $('#editor');
};


/**
 * @constructor
 * @extends {SimpleControl}
 * @param {Comment} comment to upvote
 */
var CommentVoteButton = function (comment) {
    SimpleControl.call(this);
    /**
     * @param {Comment}
     */
    this._comment = comment;
    /**
     * @type {boolean}
     */
    this._voted = false;
    /**
     * @type {number}
     */
    this._score = 0;
};
inherits(CommentVoteButton, SimpleControl);
/**
 * @param {number} score
 */
CommentVoteButton.prototype.setScore = function (score) {
    this._score = score;
    if (this._element) {
        this._element.html(score || '');
    }
    this._element.trigger('askbot.afterSetScore', [this, score]);
};
/**
 * @param {boolean} voted
 */
CommentVoteButton.prototype.setVoted = function (voted) {
    this._voted = voted;
    if (this._element && voted) {
        this._element.addClass('upvoted');
    } else if (this._element) {
        this._element.removeClass('upvoted');
    }
};

CommentVoteButton.prototype.getVoteHandler = function () {
    var me = this;
    var comment = this._comment;
    return function () {
        var cancelVote =  me._voted ? true: false;
        var post_id = me._comment.getId();
        var data = {
            cancel_vote: cancelVote,
            post_id: post_id
        };
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            url: askbot.urls.upvote_comment,
            cache: false,
            success: function (data) {
                if (data.success) {
                    me.setScore(data.score);
                    me.setVoted(!cancelVote);
                } else {
                    showMessage(comment.getElement(), data.message, 'after');
                }
            }
        });
    };
};

CommentVoteButton.prototype.decorate = function (element) {
    this._element = element;
    this.setHandler(this.getVoteHandler());

    element = this._element;
    var comment = this._comment;
    /* can't call comment.getElement() here due
     * an issue in the getElement() of comment
     * so use an "illegal" access to comment._element here
     */
    comment._element.mouseenter(function () {
        //outside height may not be known
        //var height = comment.getElement().height();
        //element.height(height);
        element.addClass('hover');
    });
    comment._element.mouseleave(function () {
        element.removeClass('hover');
    });

};

CommentVoteButton.prototype.createDom = function () {
    this._element = this.makeElement('div');
    if (this._score > 0) {
        this._element.html(this._score);
    }
    this._element.addClass('upvote');
    if (this._voted) {
        this._element.addClass('upvoted');
    }
    this.decorate(this._element);
};

/**
 * an updater of the follower count
 */
var updateQuestionFollowerCount = function (evt, data) {
    var fav = $('.js-question-follower-count');
    var count = data.num_followers;
    if (count === 0) {
        fav.text('');
    } else {
        var fmt = ngettext('%s follower', '%s followers', count);
        fav.text(interpolate(fmt, [count]));
    }
};

/**
 * legacy Vote class
 * handles all sorts of vote-like operations
 */
var Vote = (function () {
    // All actions are related to a question
    var questionId;
    //question slug to build redirect urls
    var questionSlug;
    // The object we operate on actually. It can be a question or an answer.
    var postId;
    var questionAuthorId;
    var currentUserId;
    var answerContainerIdPrefix = 'post-id-';
    var voteContainerId = 'vote-buttons';
    var imgIdPrefixAccept = 'answer-img-accept-';
    var imgIdPrefixQuestionVoteup = 'question-img-upvote-';
    var imgIdPrefixQuestionVotedown = 'question-img-downvote-';
    var imgIdPrefixAnswerVoteup = 'answer-img-upvote-';
    var imgIdPrefixAnswerVotedown = 'answer-img-downvote-';
    var voteNumberClass = 'vote-number';
    var offensiveIdPrefixQuestionFlag = 'question-offensive-flag-';
    var removeOffensiveIdPrefixQuestionFlag = 'question-offensive-remove-flag-';
    var removeAllOffensiveIdPrefixQuestionFlag = 'question-offensive-remove-all-flag-';
    var offensiveIdPrefixAnswerFlag = 'answer-offensive-flag-';
    var removeOffensiveIdPrefixAnswerFlag = 'answer-offensive-remove-flag-';
    var removeAllOffensiveIdPrefixAnswerFlag = 'answer-offensive-remove-all-flag-';
    var offensiveClassFlag = 'offensive-flag';
    var questionControlsId = 'question-controls';
    var removeAnswerLinkIdPrefix = 'answer-delete-link-';
    var questionSubscribeUpdates = 'question-subscribe-updates';
    var questionSubscribeSidebar = 'question-subscribe-sidebar';

    var acceptAnonymousMessage = gettext('insufficient privilege');

    var pleaseLogin = ' <a href="' + askbot.urls.user_signin + '">' + gettext('please login') + '</a>';

    //todo: this below is probably not used
    var subscribeAnonymousMessage = gettext('anonymous users cannot subscribe to questions') + pleaseLogin;
    var voteAnonymousMessage = gettext('anonymous users cannot vote') + pleaseLogin;
    //there were a couple of more messages...
    var offensiveAnonymousMessage = gettext('anonymous users cannot flag offensive posts') + pleaseLogin;
    var removeConfirmation = gettext('confirm delete');
    var removeAnonymousMessage = gettext('anonymous users cannot delete/undelete') + pleaseLogin;
    var recoveredMessage = gettext('post recovered');
    var deletedMessage = gettext('post deleted');

    var VoteType = {
        acceptAnswer: 0,
        questionUpVote: 1,
        questionDownVote: 2,
        answerUpVote: 5,
        answerDownVote:6,
        offensiveQuestion: 7,
        removeOffensiveQuestion: 7.5,
        removeAllOffensiveQuestion: 7.6,
        offensiveAnswer: 8,
        removeOffensiveAnswer: 8.5,
        removeAllOffensiveAnswer: 8.6,
        removeQuestion: 9,//deprecate
        removeAnswer: 10,//deprecate
        questionSubscribeUpdates: 11,
        questionUnsubscribeUpdates: 12
    };

    var getQuestionVoteUpButton = function () {
        var questionVoteUpButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixQuestionVoteup + '"]';
        return $(questionVoteUpButton);
    };
    var getQuestionVoteDownButton = function () {
        var questionVoteDownButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixQuestionVotedown + '"]';
        return $(questionVoteDownButton);
    };
    var getAnswerVoteUpButtons = function () {
        var answerVoteUpButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAnswerVoteup + '"]';
        return $(answerVoteUpButton);
    };
    var getAnswerVoteDownButtons = function () {
        var answerVoteDownButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAnswerVotedown + '"]';
        return $(answerVoteDownButton);
    };
    var getAnswerVoteUpButton = function (id) {
        var answerVoteUpButton = 'div.' + voteContainerId + ' div[id="' + imgIdPrefixAnswerVoteup + id + '"]';
        return $(answerVoteUpButton);
    };
    var getAnswerVoteDownButton = function (id) {
        var answerVoteDownButton = 'div.' + voteContainerId + ' div[id="' + imgIdPrefixAnswerVotedown + id + '"]';
        return $(answerVoteDownButton);
    };

    var getOffensiveQuestionFlag = function () {
        var offensiveQuestionFlag = 'span[id^="' + offensiveIdPrefixQuestionFlag + '"]';
        return $(offensiveQuestionFlag);
    };

    var getRemoveOffensiveQuestionFlag = function () {
        var removeOffensiveQuestionFlag = 'span[id^="' + removeOffensiveIdPrefixQuestionFlag + '"]';
        return $(removeOffensiveQuestionFlag);
    };

    var getRemoveAllOffensiveQuestionFlag = function () {
        var removeAllOffensiveQuestionFlag = 'span[id^="' + removeAllOffensiveIdPrefixQuestionFlag + '"]';
        return $(removeAllOffensiveQuestionFlag);
    };

    var getOffensiveAnswerFlags = function () {
        var offensiveQuestionFlag = 'span[id^="' + offensiveIdPrefixAnswerFlag + '"]';
        return $(offensiveQuestionFlag);
    };

    var getRemoveOffensiveAnswerFlag = function () {
        var removeOffensiveAnswerFlag = 'span[id^="' + removeOffensiveIdPrefixAnswerFlag + '"]';
        return $(removeOffensiveAnswerFlag);
    };

    var getRemoveAllOffensiveAnswerFlag = function () {
        var removeAllOffensiveAnswerFlag = 'span[id^="' + removeAllOffensiveIdPrefixAnswerFlag + '"]';
        return $(removeAllOffensiveAnswerFlag);
    };

    var getquestionSubscribeUpdatesCheckbox = function () {
        return $('#' + questionSubscribeUpdates);
    };

    var getquestionSubscribeSidebarCheckbox = function () {
        return $('#' + questionSubscribeSidebar);
    };

    var getremoveAnswersLinks = function () {
        var removeAnswerLinks = 'a[id^="' + removeAnswerLinkIdPrefix + '"]';
        return $(removeAnswerLinks);
    };

    var setVoteImage = function (voteType, undo, object) {
        var flag = undo ? false : true;
        if (object.hasClass('on')) {
            object.removeClass('on');
        } else {
            object.addClass('on');
        }

        if (undo) {
            if (voteType === VoteType.questionUpVote || voteType === VoteType.questionDownVote) {
                $(getQuestionVoteUpButton()).removeClass('on');
                $(getQuestionVoteDownButton()).removeClass('on');
            } else {
                $(getAnswerVoteUpButton(postId)).removeClass('on');
                $(getAnswerVoteDownButton(postId)).removeClass('on');
            }
        }
    };

    var setVoteNumber = function (object, number) {
        var voteNumber = object.parent('div.' + voteContainerId).find('div.' + voteNumberClass);
        $(voteNumber).text(number);
    };

    var bindEvents = function () {
        // accept answers
        var acceptedButtons = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAccept + '"]';
        $(acceptedButtons).unbind('click').click(function (event) {
            Vote.accept($(event.target));
        });

        // question vote up
        var questionVoteUpButton = getQuestionVoteUpButton();
        questionVoteUpButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.questionUpVote);
        });

        var questionVoteDownButton = getQuestionVoteDownButton();
        questionVoteDownButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.questionDownVote);
        });

        var answerVoteUpButton = getAnswerVoteUpButtons();
        answerVoteUpButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.answerUpVote);
        });

        var answerVoteDownButton = getAnswerVoteDownButtons();
        answerVoteDownButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.answerDownVote);
        });

        getOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.offensive(this, VoteType.offensiveQuestion);
        });

        getRemoveOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.remove_offensive(this, VoteType.removeOffensiveQuestion);
        });

        getRemoveAllOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.remove_all_offensive(this, VoteType.removeAllOffensiveQuestion);
        });

        getOffensiveAnswerFlags().unbind('click').click(function (event) {
            Vote.offensive(this, VoteType.offensiveAnswer);
        });

        getRemoveOffensiveAnswerFlag().unbind('click').click(function (event) {
            Vote.remove_offensive(this, VoteType.removeOffensiveAnswer);
        });

        getRemoveAllOffensiveAnswerFlag().unbind('click').click(function (event) {
            Vote.remove_all_offensive(this, VoteType.removeAllOffensiveAnswer);
        });

        getquestionSubscribeUpdatesCheckbox().unbind('click').click(function (event) {
            //despeluchar esto
            if (this.checked) {
                getquestionSubscribeSidebarCheckbox().attr({'checked': true});
                Vote.vote($(event.target), VoteType.questionSubscribeUpdates);
            } else {
                getquestionSubscribeSidebarCheckbox().attr({'checked': false});
                Vote.vote($(event.target), VoteType.questionUnsubscribeUpdates);
            }
        });

        getquestionSubscribeSidebarCheckbox().unbind('click').click(function (event) {
            if (this.checked) {
                getquestionSubscribeUpdatesCheckbox().attr({'checked': true});
                Vote.vote($(event.target), VoteType.questionSubscribeUpdates);
            } else {
                getquestionSubscribeUpdatesCheckbox().attr({'checked': false});
                Vote.vote($(event.target), VoteType.questionUnsubscribeUpdates);
            }
        });

        getremoveAnswersLinks().unbind('click').click(function (event) {
            Vote.remove(this, VoteType.removeAnswer);
        });
    };

    var submit = function (object, voteType, callback) {
        //this function submits votes
        $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: askbot.urls.vote_url,
            data: { type: voteType, postId: postId },
            error: handleFail,
            success: function (data) {
                callback(object, voteType, data);
            }
        });
    };

    var handleFail = function (xhr, msg) {
        alert('Callback invoke error: ' + msg);
    };

    // callback function for Accept Answer action
    var callback_accept = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.allowed == '0' && data.success == '0') {
            showMessage(object, acceptAnonymousMessage);
        } else if (data.allowed == '-1') {
            var message = interpolate(
                gettext('sorry, you cannot %(accept_own_answer)s'),
                {'accept_own_answer': askbot.messages.acceptOwnAnswer},
                true
            );
            showMessage(object, message);
        } else if (data.status == '1') {
            $('#' + answerContainerIdPrefix + postId).removeClass('accepted-answer');
            object.trigger('askbot.unacceptAnswer', [object, data]);
        } else if (data.success == '1') {
            var answers = ('div[id^="' + answerContainerIdPrefix + '"]');
            $(answers).removeClass('accepted-answer');
            $('#' + answerContainerIdPrefix + postId).addClass('accepted-answer');
            object.trigger('askbot.acceptAnswer', [object, data]);
        } else {
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_vote = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.success == '0') {
            showMessage(object, data.message);
            return;
        } else {
            if (data.status == '1') {
                setVoteImage(voteType, true, object);
                object.trigger('askbot.voteDown', [object, data]);
            } else {
                setVoteImage(voteType, false, object);
                object.trigger('askbot.voteUp', [object, data]);
            }
            setVoteNumber(object, data.count);
            if (data.message && data.message.length > 0) {
                showMessage(object, data.message);
            }
            return;
        }
        /*jshint eqeqeq:true */
    };

    var callback_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
            }

            // Change the link text and rebind events
            $(object).find('.question-flag').html(gettext('remove flag'));
            var obj_id = $(object).attr('id');
            $(object).attr('id', obj_id.replace('flag-', 'remove-flag-'));

            getRemoveOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.remove_offensive(this, VoteType.removeOffensiveQuestion);
            });

            getRemoveOffensiveAnswerFlag().unbind('click').click(function (event) {
                Vote.remove_offensive(this, VoteType.removeOffensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
                // Remove "remove all flags link" since there are no more flags to remove
                var remove_all = $(object).siblings('span.offensive-flag[id*="-offensive-remove-all-flag-"]');
                $(remove_all).next('span.sep').remove();
                $(remove_all).remove();
            }
            // Change the link text and rebind events
            $(object).find('.question-flag').html(gettext('flag offensive'));
            var obj_id = $(object).attr('id');
            $(object).attr('id', obj_id.replace('remove-flag-', 'flag-'));

            getOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveQuestion);
            });

            getOffensiveAnswerFlags().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove_all_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
            }
            // remove the link. All flags are gone
            var remove_own = $(object).siblings('span.offensive-flag[id*="-offensive-remove-flag-"]');
            $(remove_own).find('.question-flag').html(gettext('flag offensive'));
            $(remove_own).attr('id', $(remove_own).attr('id').replace('remove-flag-', 'flag-'));

            $(object).next('span.sep').remove();
            $(object).remove();

            getOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveQuestion);
            });

            getOffensiveAnswerFlags().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.success == '1') {
            if (removeActionType == 'delete') {
                postNode.addClass('deleted');
                postRemoveLink.innerHTML = gettext('undelete');
                showMessage(object, deletedMessage);
            } else if (removeActionType == 'undelete') {
                postNode.removeClass('deleted');
                postRemoveLink.innerHTML = gettext('delete');
                showMessage(object, recoveredMessage);
            }
        } else {
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    return {
        init: function (qId, qSlug, questionAuthor, userId) {
            questionId = qId;
            questionSlug = qSlug;
            questionAuthorId = questionAuthor;
            currentUserId = '' + userId;//convert to string
            bindEvents();
        },

        //accept answer
        accept: function (object) {
            object = object.closest('.answer-img-accept');
            postId = object.attr('id').substring(imgIdPrefixAccept.length);
            submit(object, VoteType.acceptAnswer, callback_accept);
        },

        vote: function (object, voteType) {
            object = object.closest('.post-vote');
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                if (voteType === VoteType.questionSubscribeUpdates || voteType === VoteType.questionUnsubscribeUpdates) {
                    getquestionSubscribeSidebarCheckbox().removeAttr('checked');
                    getquestionSubscribeUpdatesCheckbox().removeAttr('checked');
                    showMessage(object, subscribeAnonymousMessage);
                } else {
                    showMessage(
                        $(object),
                        voteAnonymousMessage.replace(
                                '{{QuestionID}}',
                                questionId
                            ).replace(
                                '{{questionSlug}}',
                                questionSlug
                            )
                    );
                }
                return false;
            }
            // up and downvote processor
            if (voteType === VoteType.answerUpVote) {
                postId = object.attr('id').substring(imgIdPrefixAnswerVoteup.length);
            } else if (voteType === VoteType.answerDownVote) {
                postId = object.attr('id').substring(imgIdPrefixAnswerVotedown.length);
            } else {
                postId = questionId;
            }

            submit(object, voteType, callback_vote);
        },
        //flag offensive
        offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_offensive);
        },
        //remove flag offensive
        remove_offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_remove_offensive);
        },
        remove_all_offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_remove_all_offensive);
        },
        //delete question or answer (comments are deleted separately)
        remove: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    removeAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                    );
                return false;
            }
            bits = object.id.split('-');
            postId = bits.pop();/* this seems to be used within submit! */
            postType = bits.shift();

            var do_proceed = false;
            postNode = $('#post-id-' + postId);
            postRemoveLink = object;
            if (postNode.hasClass('deleted')) {
                removeActionType = 'undelete';
                do_proceed = true;
            } else {
                removeActionType = 'delete';
                do_proceed = confirm(removeConfirmation);
            }
            if (do_proceed) {
                submit($(object), voteType, callback_remove);
            }
        }
    };
})();

var questionRetagger = (function () {

    var oldTagsHTML = '';
    var tagInput = null;
    var tagsList = null;
    var retagLink = null;

    var restoreEventHandlers = function () {
        $(document).unbind('click', cancelRetag);
    };

    var cancelRetag = function () {
        tagsList.html(oldTagsHTML);
        tagsList.removeClass('post-retag');
        tagsList.addClass('post-tags');
        restoreEventHandlers();
        initRetagger();
    };

    var drawNewTags = function (new_tags) {
        tagsList.empty();
        if (new_tags === '') {
            return;
        }
        new_tags = new_tags.split(/\s+/);
        var tags_html = '';
        $.each(new_tags, function (index, name) {
            var tag = new Tag();
            tag.setName(name);
            var li = $('<li></li>');
            tagsList.append(li);
            li.append(tag.getElement());
        });
    };

    var doRetag = function () {
        $.ajax({
            type: 'POST',
            url: askbot.urls.retag,
            dataType: 'json',
            data: { tags: getUniqueWords(tagInput.val()).join(' ') },
            success: function (json) {
                if (json.success) {
                    new_tags = getUniqueWords(json.new_tags);
                    oldTagsHtml = '';
                    cancelRetag();
                    drawNewTags(new_tags.join(' '));
                    if (json.message) {
                        notify.show(json.message);
                    }
                } else {
                    cancelRetag();
                    showMessage(tagsList, json.message);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                showMessage(tagsList, gettext('sorry, something is not right here'));
                cancelRetag();
            }
        });
        return false;
    };

    var setupInputEventHandlers = function (input) {
        input.keydown(function (e) {
            if ((e.which && e.which === 27) || (e.keyCode && e.keyCode === 27)) {
                cancelRetag();
            }
        });
        $(document).unbind('click', cancelRetag).click(cancelRetag);
        input.closest('form').click(function (e) {
            e.stopPropagation();
        });
    };

    var createRetagForm = function (old_tags_string) {
        var div = $('<form method="post"></form>');
        tagInput = $('<input id="retag_tags" type="text" autocomplete="off" name="tags" size="30"/>');
        addExtraCssClasses(tagInput, 'textInputClasses');
        //var tagLabel = $('<label for="retag_tags" class="error"></label>');
        //populate input
        var tagAc = new AutoCompleter({
            url: askbot.urls.get_tag_list,
            minChars: 1,
            useCache: true,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        tagAc.decorate(tagInput);
        tagAc._results.on('click', function (e) {
            //click on results should not trigger cancelRetag
            e.stopPropagation();
        });
        tagInput.val(old_tags_string);
        div.append(tagInput);
        //div.append(tagLabel);
        setupInputEventHandlers(tagInput);

        //button = $('<input type="submit" />');
        //button.val(gettext('save tags'));
        //div.append(button);
        //setupButtonEventHandlers(button);
        $(document).trigger('askbot.afterCreateRetagForm', [div]);

        div.validate({//copy-paste from utils.js
            rules: {
                tags: {
                    required: askbot.settings.tagsAreRequired,
                    maxlength: askbot.settings.maxTagsPerPost * askbot.settings.maxTagLength,
                    limit_tag_count: true,
                    limit_tag_length: true
                }
            },
            messages: {
                tags: {
                    required: gettext('tags cannot be empty'),
                    maxlength: askbot.messages.tagLimits,
                    limit_tag_count: askbot.messages.maxTagsPerPost,
                    limit_tag_length: askbot.messages.maxTagLength
                }
            },
            submitHandler: doRetag,
            errorClass: 'retag-error'
        });

        $(document).trigger('askbot.afterSetupValidationRetagForm', [div]);

        return div;
    };

    var getTagsAsString = function (tags_div) {
        var links = tags_div.find('.js-tag-name');
        var tags_str = '';
        links.each(function (index, element) {
            if (index === 0) {
                //this is pretty bad - we should use Tag.getName()
                tags_str = $(element).data('tagName');
            } else {
                tags_str += ' ' + $(element).data('tagName');
            }
        });
        return tags_str;
    };

    var noopHandler = function () {
        tagInput.focus();
        return false;
    };

    var deactivateRetagLink = function () {
        retagLink.unbind('click').click(noopHandler);
        retagLink.unbind('keypress').keypress(noopHandler);
    };

    var startRetag = function () {
        tagsList = $('#question-tags');
        oldTagsHTML = tagsList.html();//save to restore on cancel
        var old_tags_string = getTagsAsString(tagsList);
        var retag_form = createRetagForm(old_tags_string);
        tagsList.html('');
        tagsList.append(retag_form);
        tagsList.removeClass('post-tags');
        tagsList.addClass('post-retag');
        tagInput.focus();
        deactivateRetagLink();
        return false;
    };

    var setupClickAndEnterHandler = function (element, callback) {
        element.unbind('click').click(callback);
        element.unbind('keypress').keypress(function (e) {
            if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                callback();
            }
        });
    };

    var initRetagger = function () {
        setupClickAndEnterHandler(retagLink, startRetag);
    };

    return {
        init: function () {
            retagLink = $('#retag');
            initRetagger();
        }
    };
})();

/**
 * @constructor
 * Controls vor voting for a post
 */
var VoteControls = function () {
    WrappedElement.call(this);
    this._postAuthorId = undefined;
    this._postId = undefined;
};
inherits(VoteControls, WrappedElement);

VoteControls.prototype.setPostId = function (postId) {
    this._postId = postId;
};

VoteControls.prototype.getPostId = function () {
    return this._postId;
};

VoteControls.prototype.setPostAuthorId = function (userId) {
    this._postAuthorId = userId;
};

VoteControls.prototype.setSlug = function (slug) {
    this._slug = slug;
};

VoteControls.prototype.setPostType = function (postType) {
    this._postType = postType;
};

VoteControls.prototype.getPostType = function () {
    return this._postType;
};

VoteControls.prototype.clearVotes = function () {
    this._upvoteButton.removeClass('on');
    this._downvoteButton.removeClass('on');
};

VoteControls.prototype.toggleButton = function (button) {
    if (button.hasClass('on')) {
        button.removeClass('on');
    } else {
        button.addClass('on');
    }
};

VoteControls.prototype.toggleVote = function (voteType) {
    if (voteType === 'upvote') {
        this.toggleButton(this._upvoteButton);
    } else {
        this.toggleButton(this._downvoteButton);
    }
};

VoteControls.prototype.setVoteCount = function (count) {
    this._voteCount.html(count);
};

VoteControls.prototype.updateDisplay = function (voteType, data) {
    /* jshint eqeqeq:false */
    if (data.status == '1') {
        this.clearVotes();
    } else {
        this.toggleVote(voteType);
    }
    this.setVoteCount(data.count);
    if (data.message && data.message.length > 0) {
        showMessage(this._element, data.message);
    }
    /* jshint eqeqeq:true */
};

VoteControls.prototype.getAnonymousMessage = function (message) {
    var pleaseLogin = ' <a href="' + askbot.urls.user_signin + '">' + gettext('please login') + '</a>';
    message += pleaseLogin;
    message = message.replace('{{QuestionID}}', this._postId);
    return message.replace('{{questionSlug}}', this._slug);
};

VoteControls.prototype.getVoteHandler = function (voteType) {
    var me = this;
    return function () {
        if (askbot.data.userIsAuthenticated === false) {
            var message = me.getAnonymousMessage(gettext('anonymous users cannot vote'));
            showMessage(me.getElement(), message);
        } else {
            //this function submits votes
            var voteMap = {
                'question': { 'upvote': 1, 'downvote': 2 },
                'answer': { 'upvote': 5, 'downvote': 6 }
            };
            var legacyVoteType = voteMap[me.getPostType()][voteType];
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                url: askbot.urls.vote_url,
                data: {
                    type: legacyVoteType,
                    postId: me.getPostId()
                },
                error: function () {
                    showMessage(me.getElement(), gettext('sorry, something is not right here'));
                },
                success: function (data) {
                    if (data.success) {
                        me.updateDisplay(voteType, data);
                    } else {
                        showMessage(me.getElement(), data.message);
                    }
                }
            });
        }
    };
};

VoteControls.prototype.decorate = function (element) {
    this._element = element;
    var upvoteButton = element.find('.upvote');
    this._upvoteButton = upvoteButton;
    setupButtonEventHandlers(upvoteButton, this.getVoteHandler('upvote'));
    var downvoteButton = element.find('.downvote');
    this._downvoteButton = downvoteButton;
    setupButtonEventHandlers(downvoteButton, this.getVoteHandler('downvote'));
    this._voteCount = element.find('.vote-number');
};

var DeletePostLink = function () {
    SimpleControl.call(this);
    this._post_id = null;
};
inherits(DeletePostLink, SimpleControl);

DeletePostLink.prototype.setPostId = function (id) {
    this._post_id = id;
};

DeletePostLink.prototype.getPostId = function () {
    return this._post_id;
};

DeletePostLink.prototype.getPostElement = function () {
    return $('#post-id-' + this.getPostId());
};

DeletePostLink.prototype.isPostDeleted = function () {
    return this._post_deleted;
};

DeletePostLink.prototype.setPostDeleted = function (is_deleted) {
    var post = this.getPostElement();
    if (is_deleted === true) {
        post.addClass('deleted');
        this._post_deleted = true;
        this.getElement().html(gettext('undelete'));
    } else if (is_deleted === false) {
        post.removeClass('deleted');
        this._post_deleted = false;
        this.getElement().html(gettext('delete'));
    }
};

DeletePostLink.prototype.getDeleteHandler = function () {
    var me = this;
    var post_id = this.getPostId();
    return function () {
        var data = {
            'post_id': me.getPostId(),
            //todo rename cancel_vote -> undo
            'cancel_vote': me.isPostDeleted() ? true : false
        };
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            url: askbot.urls.delete_post,
            cache: false,
            success: function (data) {
                if (data.success) {
                    me.setPostDeleted(data.is_deleted);
                } else {
                    showMessage(me.getElement(), data.message);
                }
            }
        });
    };
};

DeletePostLink.prototype.decorate = function (element) {
    this._element = element;
    this._post_deleted = this.getPostElement().hasClass('deleted');
    this.setHandler(this.getDeleteHandler());
};

/**
 * @constructor
 * a simple textarea-based editor
 */
var SimpleEditor = function (attrs) {
    WrappedElement.call(this);
    attrs = attrs || {};
    this._rows = attrs.rows || 10;
    this._cols = attrs.cols || 60;
    this._maxlength = attrs.maxlength || 1000;
};
inherits(SimpleEditor, WrappedElement);

SimpleEditor.prototype.focus = function (onFocus) {
    this._textarea.focus();
    if (onFocus) {
        onFocus();
    }
};

SimpleEditor.prototype.putCursorAtEnd = function () {
    putCursorAtEnd(this._textarea);
};

/**
 * a noop function
 */
SimpleEditor.prototype.start = function () {};

SimpleEditor.prototype.setHighlight = function (isHighlighted) {
    if (isHighlighted === true) {
        this._textarea.addClass('highlight');
    } else {
        this._textarea.removeClass('highlight');
    }
};

SimpleEditor.prototype.getText = function () {
    return $.trim(this._textarea.val());
};

SimpleEditor.prototype.getHtml = function () {
    return '<div class="transient-comment"><p>' + this.getText() + '</p></div>';
};

SimpleEditor.prototype.setText = function (text) {
    this._text = text;
    if (this._textarea) {
        this._textarea.val(text);
    }
};

/**
 * a textarea inside a div,
 * the reason for this is that we subclass this
 * in WMD, and that one requires a more complex structure
 */
SimpleEditor.prototype.createDom = function () {
    this._element = getTemplate('.js-simple-editor');
    var textarea = this._element.find('textarea');
    addExtraCssClasses(textarea, 'editorClasses');
    this._textarea = textarea;
    if (this._text) {
        textarea.val(this._text);
    }
    textarea.attr({
        'cols': this._cols,
        'rows': this._rows,
        'maxlength': this._maxlength
    });
};

/**
 * @constructor
 * a wrapper for the WMD editor
 */
var WMD = function () {
    SimpleEditor.call(this);
    this._text = undefined;
    this._enabled_buttons = 'bold italic link blockquote code ' +
        'image attachment ol ul heading hr';
    this._is_previewer_enabled = true;
};
inherits(WMD, SimpleEditor);

//@todo: implement getHtml method that runs text through showdown renderer

WMD.prototype.setEnabledButtons = function (buttons) {
    this._enabled_buttons = buttons;
};

WMD.prototype.setPreviewerEnabled = function (state) {
    this._is_previewer_enabled = state;
    if (this._previewer) {
        this._previewer.hide();
    }
};

WMD.prototype.createDom = function () {
    this._element = this.makeElement('div');
    var clearfix = this.makeElement('div').addClass('clearfix');
    this._element.append(clearfix);

    var wmd_container = this.makeElement('div');
    wmd_container.addClass('wmd-container');
    this._element.append(wmd_container);

    var wmd_buttons = this.makeElement('div')
                        .attr('id', this.makeId('wmd-button-bar'))
                        .addClass('wmd-panel');
    wmd_container.append(wmd_buttons);

    var editor = this.makeElement('textarea')
                        .attr('id', this.makeId('editor'));
    addExtraCssClasses(editor, 'editorClasses');

    wmd_container.append(editor);
    this._textarea = editor;

    if (this._text) {
        editor.val(this._text);
    }

    var previewer = this.makeElement('div')
                        .attr('id', this.makeId('previewer'))
                        .addClass('wmd-preview');
    wmd_container.append(previewer);
    this._previewer = previewer;
    if (this._is_previewer_enabled === false) {
        previewer.hide();
    }
};

WMD.prototype.decorate = function (element) {
    this._element = element;
    this._textarea = element.find('textarea');
    this._previewer = element.find('.wmd-preview');
};

WMD.prototype.start = function () {
    Attacklab.Util.startEditor(true, this._enabled_buttons, this.getIdSeed());
};

/**
 * @constructor
 */
var TinyMCE = function (config) {
    WrappedElement.call(this);
    this._config = config || {};
    this._id = 'editor';//desired id of the textarea
};
inherits(TinyMCE, WrappedElement);

/*
 * not passed onto prototoype on purpose!!!
 */
TinyMCE.onInitHook = function () {
    //set initial content
    var ed = tinyMCE.activeEditor;
    ed.setContent(askbot.data.editorContent || '');
    //if we have spellchecker - enable it by default
    if (inArray('spellchecker', askbot.settings.tinyMCEPlugins)) {
        setTimeout(function () {
            ed.controlManager.setActive('spellchecker', true);
            tinyMCE.execCommand('mceSpellCheck', true);
        }, 1);
    }
};

/* 3 dummy functions to match WMD api */
TinyMCE.prototype.setEnabledButtons = function () {};

TinyMCE.prototype.start = function () {
    //copy the options, because we need to modify them
    var opts = $.extend({}, this._config);
    var me = this;
    var extraOpts = {
        'mode': 'exact',
        'elements': this._id
    };
    opts = $.extend(opts, extraOpts);
    tinyMCE.init(opts);
    $('.mceStatusbar').remove();
};
TinyMCE.prototype.setPreviewerEnabled = function () {};
TinyMCE.prototype.setHighlight = function () {};

TinyMCE.prototype.putCursorAtEnd = function () {
    var ed = tinyMCE.activeEditor;
    //add an empty span with a unique id
    var endId = tinymce.DOM.uniqueId();
    ed.dom.add(ed.getBody(), 'span', {'id': endId}, '');
    //select that span
    var newNode = ed.dom.select('span#' + endId);
    ed.selection.select(newNode[0]);
};

TinyMCE.prototype.focus = function (onFocus) {
    var editorId = this._id;
    var winH = $(window).height();
    var winY = $(window).scrollTop();
    var edY = this._element.offset().top;
    var edH = this._element.height();

    //@todo: the fallacy of this method is timeout - should instead use queue
    //because at the time of calling focus() the editor may not be initialized yet
    setTimeout(
        function () {
            tinyMCE.execCommand('mceFocus', false, editorId);

            //@todo: make this general to all editors

            //if editor bottom is below viewport
            var isBelow = ((edY + edH) > (winY + winH));
            var isAbove = (edY < winY);
            if (isBelow || isAbove) {
                //then center on screen
                $(window).scrollTop(edY - edH / 2 - winY / 2);
            }
            if (onFocus) {
                onFocus();
            }
        },
        100
    );


};

TinyMCE.prototype.setId = function (id) {
    this._id = id;
};

TinyMCE.prototype.setText = function (text) {
    this._text = text;
    if (this.isLoaded()) {
        tinymce.get(this._id).setContent(text);
    }
};

TinyMCE.prototype.getText = function () {
    return tinyMCE.activeEditor.getContent();
};

TinyMCE.prototype.getHtml = TinyMCE.prototype.getText;

TinyMCE.prototype.isLoaded = function () {
    return (tinymce.get(this._id) !== undefined);
};

TinyMCE.prototype.createDom = function () {
    var editorBox = this.makeElement('div');
    editorBox.addClass('wmd-container');
    this._element = editorBox;
    var textarea = this.makeElement('textarea');
    textarea.attr('id', this._id);
    textarea.addClass('editor');
    this._element.append(textarea);
};

TinyMCE.prototype.decorate = function (element) {
    this._element = element;
    this._id = element.attr('id');
};

/**
 * Form for editing and posting new comment
 * supports 3 editors: markdown, tinymce and plain textarea.
 * There is only one instance of this form in use on the question page.
 * It can be attached to any comment on the page, or to a new blank
 * comment.
 */
var EditCommentForm = function () {
    WrappedElement.call(this);
    this._comment = null;
    this._commentsWidget = null;
    this._element = null;
    this._editorReady = false;
    this._text = '';
};
inherits(EditCommentForm, WrappedElement);

EditCommentForm.prototype.hide = function () {
    this._element.hide();
};

EditCommentForm.prototype.show = function () {
    this._element.show();
};

EditCommentForm.prototype.getEditor = function () {
    return this._editor;
};

EditCommentForm.prototype.getEditorType = function () {
    if (askbot.settings.commentsEditorType === 'rich-text') {
        return askbot.settings.editorType;
    } else {
        return 'plain-text';
    }
};

EditCommentForm.prototype.startTinyMCEEditor = function () {
    var editorId = this.makeId('comment-editor');
    var opts = {
        mode: 'exact',
        content_css: mediaUrl('media/style/tinymce/comments-content.css'),
        elements: editorId,
        theme: 'advanced',
        theme_advanced_toolbar_location: 'top',
        theme_advanced_toolbar_align: 'left',
        theme_advanced_buttons1: 'bold, italic, |, link, |, numlist, bullist',
        theme_advanced_buttons2: '',
        theme_advanced_path: false,
        plugins: '',
        width: '100%',
        height: '70'
    };
    var editor = new TinyMCE(opts);
    editor.setId(editorId);
    editor.setText(this._text);
    this._editorBox.prepend(editor.getElement());
    editor.start();
    this._editor = editor;
};

EditCommentForm.prototype.startWMDEditor = function () {
    var editor = new WMD();
    editor.setEnabledButtons('bold italic link code ol ul');
    editor.setPreviewerEnabled(false);
    editor.setText(this._text);
    this._editorBox.prepend(editor.getElement());//attach DOM before start
    editor.start();//have to start after attaching DOM
    this._editor = editor;
};

EditCommentForm.prototype.startSimpleEditor = function () {
    this._editor = new SimpleEditor();
    this._editorBox.prepend(this._editor.getElement());
};

EditCommentForm.prototype.startEditor = function () {
    var editorType = this.getEditorType();
    if (editorType === 'tinymce') {
        this.startTinyMCEEditor();
        //@todo: implement save on enter and character counter in tinyMCE
        return;
    } else if (editorType === 'markdown') {
        this.startWMDEditor();
    } else {
        this.startSimpleEditor();
    }

    //code below is common to SimpleEditor and WMD
    var editor = this._editor;
    var editorElement = this._editor.getElement();

    var limitLength = this.getCommentTruncator();
    editorElement.blur(limitLength);
    editorElement.focus(limitLength);
    editorElement.keyup(limitLength);
    editorElement.keyup(limitLength);

    var updateCounter = this.getCounterUpdater();
    var escapeHandler = makeKeyHandler(27, this.getCancelHandler());
    //todo: try this on the div
    //this should be set on the textarea!
    editorElement.blur(updateCounter);
    editorElement.focus(updateCounter);
    editorElement.keyup(updateCounter);
    editorElement.keyup(escapeHandler);

    if (askbot.settings.saveCommentOnEnter) {
        var save_handler = makeKeyHandler(13, this.getSaveHandler());
        editor.getElement().keydown(save_handler);
    }

    editorElement.trigger('askbot.afterStartEditor', [editor]);
};

EditCommentForm.prototype.getCommentsWidget = function () {
    return this._commentsWidget;
};

/**
 * attaches comment editor to a particular comment
 */
EditCommentForm.prototype.attachTo = function (comment, mode) {
    this._comment = comment;
    this._type = mode;//action: 'add' or 'edit'
    this._commentsWidget = comment.getContainerWidget();
    this._text = comment.getText();
    comment.getElement().after(this.getElement());
    comment.getElement().hide();
    this._commentsWidget.hideOpenEditorButton();//hide add comment button
    //fix up the comment submit button, depending on the mode
    if (this._type === 'add') {
        this._submit_btn.html(gettext('add comment'));
        if (this._minorEditBox) {
            this._minorEditBox.hide();
        }
    } else {
        this._submit_btn.html(gettext('save comment'));
        if (this._minorEditBox) {
            this._minorEditBox.show();
        }
    }
    //enable the editor
    this.getElement().show();
    this.enableForm();
    this.startEditor();
    this._editor.setText(this._text);
    var ed = this._editor;
    var onFocus = function () {
        ed.putCursorAtEnd();
    };
    this._editor.focus(onFocus);
    setupButtonEventHandlers(this._submit_btn, this.getSaveHandler());
    setupButtonEventHandlers(this._cancel_btn, this.getCancelHandler());

    this.getElement().trigger('askbot.afterEditCommentFormAttached', [this, mode]);
};

EditCommentForm.prototype.getCounterUpdater = function () {
    //returns event handler
    var counter = this._text_counter;
    var editor = this._editor;
    var handler = function () {
        var maxCommentLength = askbot.data.maxCommentLength;
        var length = editor.getText().length;
        var length1 = maxCommentLength - 100;

        if (length1 < 0) {
            length1 = Math.round(0.7 * maxCommentLength);
        }
        var length2 = maxCommentLength - 30;
        if (length2 < 0) {
            length2 = Math.round(0.9 * maxCommentLength);
        }

        /* todo make smooth color transition, from gray to red
         * or rather - from start color to end color */
        var color = 'maroon';
        var chars = askbot.settings.minCommentBodyLength;
        var feedback = '';
        if (length === 0) {
            feedback = interpolate(gettext('enter at least %s characters'), [chars]);
        } else if (length < chars) {
            feedback = interpolate(gettext('enter at least %s more characters'), [chars - length]);
        } else {
            if (length > length2) {
                color = '#f00';
            } else if (length > length1) {
                color = '#f60';
            } else {
                color = '#999';
            }
            chars = maxCommentLength - length;
            feedback = '';
            if (chars > 0) {
                feedback = interpolate(gettext('%s characters left'), [chars]);
            } else {
                feedback = gettext('maximum comment length reached');
            }
        }
        counter.html(feedback);
        counter.css('color', color);
        return true;
    };
    return handler;
};

EditCommentForm.prototype.getCommentTruncator = function () {
    var me = this;
    return function () {
        var editor = me.getEditor();
        var text = editor.getText();
        var maxLength = askbot.data.maxCommentLength;
        if (text.length > maxLength) {
            text = text.substr(0, maxLength);
            editor.setText(text);
        }
    };
};

/**
 * @todo: clean up this method so it does just one thing
 */
EditCommentForm.prototype.canCancel = function () {
    if (this._element === null) {
        return true;
    }
    if (this._editor === undefined) {
        return true;
    }
    var ctext = this._editor.getText();
    if ($.trim(ctext) === $.trim(this._text)) {
        return true;
    } else if (this.confirmAbandon()) {
        return true;
    }
    this._editor.focus();
    return false;
};

EditCommentForm.prototype.getCancelHandler = function () {
    var me = this;
    return function (evt) {
        if (me.canCancel()) {
            var widget = me.getCommentsWidget();
            widget.handleDeletedComment();
            me.detach();
            evt.preventDefault();
            $(document).trigger('askbot.afterEditCommentFormCancel', [me]);
        }
        return false;
    };
};

EditCommentForm.prototype.detach = function () {
    if (this._comment === null) {
        return;
    }
    this._comment.getContainerWidget().showOpenEditorButton();
    if (this._comment.isBlank()) {
        this._comment.dispose();
    } else {
        this._comment.getElement().show();
    }
    this.reset();
    this._element = this._element.detach();

    this._editor.dispose();
    this._editor = undefined;

    removeButtonEventHandlers(this._submit_btn);
    removeButtonEventHandlers(this._cancel_btn);
};

EditCommentForm.prototype.createDom = function () {
    this._element = $('<form></form>');
    this._element.attr('class', 'post-comments');

    var div = $('<div></div>');
    this._element.append(div);

    /** a stub container for the editor */
    this._editorBox = div;
    /**
     * editor itself will live at this._editor
     * and will be initialized by the attachTo()
     */

    this._controlsBox = this.makeElement('div');
    this._controlsBox.addClass('edit-comment-buttons');
    div.append(this._controlsBox);

    this._text_counter = $('<span></span>').attr('class', 'counter');
    this._controlsBox.append(this._text_counter);

    this._submit_btn = $('<button></button>');
    addExtraCssClasses(this._submit_btn, 'primaryButtonClasses');
    this._controlsBox.append(this._submit_btn);
    this._cancel_btn = $('<button class="cancel"></button>');
    addExtraCssClasses(this._cancel_btn, 'cancelButtonClasses');
    this._cancel_btn.html(gettext('cancel'));
    this._controlsBox.append(this._cancel_btn);

    //if email alerts are enabled, add a checkbox "suppress_email"
    if (askbot.settings.enableEmailAlerts === true) {
        this._minorEditBox = this.makeElement('div');
        this._minorEditBox.addClass('checkbox');
        this._controlsBox.append(this._minorEditBox);
        var checkBox = this.makeElement('input');
        checkBox.attr('type', 'checkbox');
        checkBox.attr('name', 'suppress_email');
        checkBox.attr('id', 'suppress_email');
        this._minorEditBox.append(checkBox);
        var label = this.makeElement('label');
        label.attr('for', 'suppress_email');
        label.html(gettext('minor edit (don\'t send alerts)'));
        this._minorEditBox.append(label);
    }

};

EditCommentForm.prototype.isEnabled = function () {
    return (this._submit_btn.attr('disabled') !== 'disabled');//confusing! setters use boolean
};

EditCommentForm.prototype.enableForm = function () {
    this._submit_btn.attr('disabled', false);
    this._cancel_btn.attr('disabled', false);
};

EditCommentForm.prototype.disableForm = function () {
    this._submit_btn.attr('disabled', true);
    this._cancel_btn.attr('disabled', true);
};

EditCommentForm.prototype.reset = function () {
    this._comment = null;
    this._text = '';
    this._editor.setText('');
    this.enableForm();
};

EditCommentForm.prototype.confirmAbandon = function () {
    this._editor.focus();
    this._editor.getElement().scrollTop();
    this._editor.setHighlight(true);
    var answer = confirm(
        gettext('Are you sure you don\'t want to post this comment?')
    );
    this._editor.setHighlight(false);
    return answer;
};

EditCommentForm.prototype.getSuppressEmail = function () {
    return this._element.find('input[name="suppress_email"]').is(':checked');
};

EditCommentForm.prototype.setSuppressEmail = function (bool) {
    this._element.find('input[name="suppress_email"]').prop('checked', bool).trigger('change');
};

EditCommentForm.prototype.updateUserPostsData = function(json) {
    //add any posts by the user to the list
    var data = askbot.data.user_posts;
    $.each(json, function(idx, item) {
        if (item.user_id === askbot.data.userId && !data[item.id]) {
            data[item.id] = 1;
        }
    });
};

EditCommentForm.prototype.getSaveHandler = function () {
    var me = this;
    var editor = this._editor;
    return function () {
        var commentData, timestamp, userName;
        if (me.isEnabled() === false) {//prevent double submits
            return false;
        }
        me.disableForm();

        var text = editor.getText();
        if (text.length < askbot.settings.minCommentBodyLength) {
            editor.focus();
            me.enableForm();
            return false;
        }

        //display the comment and show that it is not yet saved
        me.hide();
        me._comment.getElement().show();
        commentData = me._comment.getData();
        timestamp = commentData.comment_added_at || gettext('just now');
        if (me._comment.isBlank()) {
            userName = askbot.data.userName;
        } else {
            userName = commentData.user_display_name;
        }

        me._comment.setContent({
            'html': editor.getHtml(),
            'text': text,
            'user_display_name': userName,
            'comment_added_at': timestamp,
            'user_profile_url': askbot.data.userProfileUrl,
            'user_avatar_url': askbot.data.userCommentAvatarUrl
        });
        me._comment.setDraftStatus(true);
        var postCommentsWidget = me._comment.getContainerWidget();
        if (postCommentsWidget.canAddComment()) {
            postCommentsWidget.showOpenEditorButton();
        }
        var commentsElement = postCommentsWidget.getElement();
        commentsElement.trigger('askbot.beforeCommentSubmit');

        var post_data = {
            comment: text,
            avatar_size: askbot.settings.commentAvatarSize
        };

        if (me._type === 'edit') {
            post_data.comment_id = me._comment.getId();
            post_url = askbot.urls.editComment;
            post_data.suppress_email = me.getSuppressEmail();
            me.setSuppressEmail(false);
        } else {
            post_data.post_type = me._comment.getParentType();
            post_data.post_id = me._comment.getParentId();
            post_url = askbot.urls.postComments;
        }

        $.ajax({
            type: 'POST',
            url: post_url,
            dataType: 'json',
            data: post_data,
            success: function (json) {
                //type is 'edit' or 'add'
                me._comment.setDraftStatus(false);
                if (me._type === 'add') {
                    me._comment.dispose();
                    me.updateUserPostsData(json);
                    me._comment.getContainerWidget().reRenderComments(json);
                } else {
                    me._comment.setContent(json);
                }
                me.detach();
                commentsElement.trigger('askbot.afterCommentSubmitSuccess');
            },
            error: function (xhr, textStatus, errorThrown) {
                me._comment.getElement().show();
                showMessage(me._comment.getElement(), xhr.responseText, 'after');
                me._comment.setDraftStatus(false);
                me.detach();
                me.enableForm();
                commentsElement.trigger('askbot.afterCommentSubmitError');
            }
        });
        return false;
    };
};

var Comment = function (widget, data) {
    WrappedElement.call(this);
    this._container_widget = widget;
    this._data = data || {};
    this._element = null;
    this._is_convertible = askbot.data.userIsAdminOrMod;
    this.convert_link = null;
    this._delete_prompt = gettext('delete this comment');
    this._editorForm = undefined;
    if (data && data.is_deletable) {
        this._deletable = data.is_deletable;
    } else {
        this._deletable = false;
    }
    if (data && data.is_editable) {
        this._editable = data.is_deletable;
    } else {
        this._editable = false;
    }
};
inherits(Comment, WrappedElement);

Comment.prototype.getData = function () {
    return this._data;
};

Comment.prototype.startEditing = function () {
    var form = this._editorForm || new EditCommentForm();
    this._editorForm = form;
    // if new comment:
    if (this.isBlank()) {
        form.attachTo(this, 'add');
    } else {
        form.attachTo(this, 'edit');
    }
    form.show();
};

Comment.prototype.decorate = function (element) {
    this._element = $(element);
    var parent_type = this._element.closest('.comments').data('parentPostType');
    var comment_id = this._element.data('commentId') || undefined;
    this._data = {'id': comment_id};

    this._contentBox = this._element.find('.comment-content');

    var timestamp = this._element.find('.timeago');
    this._dateElement = timestamp;
    this._data.comment_added_at = timestamp.attr('title');
    var userLink = this._element.find('.author');
    this._data.user_display_name = userLink.html();
    // @todo: read other data

    var commentBody = this._element.find('.comment-body');
    if (commentBody.length > 0) {
        this._comment_body = commentBody;
    }

    var delete_img = this._element.find('.js-delete-icon');
    if (delete_img.length > 0) {
        this._deletable = true;
        this._delete_icon = new DeleteIcon(this.deletePrompt);
        this._delete_icon.setHandler(this.getDeleteHandler());
        this._delete_icon.decorate(delete_img);
    }
    var edit_link = this._element.find('.js-edit');
    if (edit_link.length > 0) {
        this._editable = true;
        this._edit_link = new EditLink();
        this._edit_link.setHandler(this.getEditHandler());
        this._edit_link.decorate(edit_link);
    }

    var convert_link = this._element.find('.convert-comment');
    if (this._is_convertible) {
        this._convert_link = new CommentConvertLink(comment_id);
        this._convert_link.decorate(convert_link);
    } else {
        convert_link.remove();
    }

    var deleter = this._element.find('.comment-delete');
    if (deleter.length > 0) {
        this._comment_delete = deleter;
    }

    var vote = new CommentVoteButton(this);
    vote.decorate(this._element.find('.upvote'));
    this._voteButton = vote;

    this._userLink = this._element.find('.author');

    this._element.trigger('askbot.afterCommentDecorate', [this]);
};

Comment.prototype.setDraftStatus = function (isDraft) {
    return;
    //@todo: implement nice feedback about posting in progress
    //maybe it should be an element that lasts at least a second
    //to avoid the possible brief flash
    // if (isDraft === true) {
    //     this._normalBackground = this._element.css('background');
    //     this._element.css('background', 'rgb(255, 243, 195)');
    // } else {
    //     this._element.css('background', this._normalBackground);
    // }
};


Comment.prototype.isBlank = function () {
    return this.getId() === undefined;
};

Comment.prototype.getId = function () {
    return this._data ? this._data.id : undefined;
};

Comment.prototype.hasContent = function () {
    return ('id' in this._data);
    //shortcut for 'user_profile_url' 'html' 'user_display_name' 'comment_age'
};

Comment.prototype.hasText = function () {
    return ('text' in this._data);
};

Comment.prototype.getContainerWidget = function () {
    return this._container_widget;
};

Comment.prototype.getParentType = function () {
    return this._container_widget.getPostType();
};

Comment.prototype.getParentId = function () {
    return this._container_widget.getPostId();
};

/**
 * this function is basically an "updateDom"
 */
Comment.prototype.setContent = function (data) {
    this._data = $.extend(this._data, data);
    data = this._data;
    this._element.data('commentId', data.id);
    this._element.attr('data-comment-id', data.id);

    // 1) create the votes element if it is not there
    var vote = this._voteButton;
    vote.setVoted(data.upvoted_by_user);
    vote.setScore(data.score);

    // 2) maybe adjust deletable status
    //set id of the comment deleter
    if (data.id) {
        var deleter = this._element.find('.comment-delete');
        deleter.attr('id', 'post-' + data.id.toString() + '-delete');
    }

    // 3) set the comment html
    if (EditCommentForm.prototype.getEditorType() === 'tinymce') {
        var theComment = $('<div/>');
        theComment.html(data.html);
        //sanitize, just in case
        this._comment_body.empty();
        this._comment_body.append(theComment);
        this._data.text = data.html;
    } else {
        this._comment_body.empty();
        this._comment_body.html(data.html);
    }

    // 4) update user info
    this._userLink.attr('href', data.user_profile_url);
    this._userLink.html(data.user_display_name);

    // 5) update avatar
    var avatar = this._element.find('.js-avatar-box');
    if (avatar.length) {
        avatar.attr('href', data.user_profile_url);
        var img = avatar.find('.js-avatar');
        img.attr('src', decodeHtml(data.user_avatar_url));//with decoded &amp;
    }

    // 6) update the timestamp
    this._dateElement.html(data.comment_added_at);
    this._dateElement.attr('title', data.comment_added_at);
    this._dateElement.timeago();

    // 7) set comment score
    if (data.score) {
        var votes = this._element.find('.js-score');
        votes.text(data.score);
        votes.attr('id', 'comment-img-upvote-' + data.id.toString());
    }

    // 8) possibly add edit link
    if (this._editable) {
        var oldEditLink = this._edit_link;
        this._edit_link = new EditLink();
        this._edit_link.setHandler(this.getEditHandler());
        oldEditLink.getElement().replaceWith(this._edit_link.getElement());
        oldEditLink.dispose();
    }

    if (this._is_convertible) {
        var oldConvertLink = this._convert_link;
        this._convert_link = new CommentConvertLink(this._data.id);
        oldConvertLink.getElement().replaceWith(this._convert_link.getElement());
        //this has to be here, because if we trigger events inside of the
        //CommentConvertLink functions since the element is not yet in the dom we
        //will never catch the event
        this._convert_link.getElement().trigger('askbot.afterCommentConvertLinkInserted', [this._convert_link]);
        oldConvertLink.dispose();
    }
    //maybe hide edit/delete buttons
    if (data.id) {
        askbot['functions']['renderPostControls'](data.id.toString());
        askbot['functions']['renderPostVoteButtons']('comment', data.id.toString());
    }
    this._element.trigger('askbot.afterCommentSetData', [this, data]);
};

Comment.prototype.dispose = function () {
    if (this._comment_body) {
        this._comment_body.remove();
    }
    if (this._comment_delete) {
        this._comment_delete.remove();
    }
    if (this._user_link) {
        this._user_link.remove();
    }
    if (this._comment_added_at) {
        this._comment_added_at.remove();
    }
    if (this._delete_icon) {
        this._delete_icon.dispose();
    }
    if (this._edit_link) {
        this._edit_link.dispose();
    }
    if (this._convert_link) {
        this._convert_link.dispose();
    }
    this._data = null;
    Comment.superClass_.dispose.call(this);
};

Comment.prototype.getElement = function () {
    Comment.superClass_.getElement.call(this);
    if (this.isBlank() && this.hasContent()) {
        this.setContent();
        if (askbot.settings.mathjaxEnabled === true) {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        }
    }
    return this._element;
};

Comment.prototype.loadText = function (on_load_handler) {
    var me = this;
    $.ajax({
        type: 'GET',
        url: askbot.urls.getComment,
        data: {id: this._data.id},
        success: function (json) {
            if (json.success) {
                me._data.text = json.text;
                on_load_handler();
            } else {
                showMessage(me.getElement(), json.message, 'after');
            }
        },
        error: function (xhr, textStatus, exception) {
            showMessage(me.getElement(), xhr.responseText, 'after');
        }
    });
};

Comment.prototype.getText = function () {
    if (!this.isBlank()) {
        if ('text' in this._data) {
            return this._data.text;
        }
    }
    return '';
};

Comment.prototype.getEditHandler = function () {
    var me = this;
    return function () {
        if (me.hasText()) {
            me.startEditing();
        } else {
            me.loadText(function () { me.startEditing(); });
        }
    };
};

Comment.prototype.getDeleteHandler = function () {
    var comment = this;
    var del_icon = this._delete_icon;
    return function () {
        if (confirm(gettext('confirm delete comment'))) {
            //comment.getElement().hide();
            $.ajax({
                type: 'POST',
                url: askbot.urls.deleteComment,
                data: {
                    comment_id: comment.getId(),
                    avatar_size: askbot.settings.commentAvatarSize
                },
                success: function (json, textStatus, xhr) {
                    var widget = comment.getContainerWidget();
                    comment.dispose();
                    widget.handleDeletedComment();
                },
                error: function (xhr, textStatus, exception) {
                    comment.getElement().show();
                    showMessage(del_icon.getElement(), xhr.responseText);
                },
                dataType: 'json'
            });
        }
    };
};

var PostCommentsWidget = function () {
    WrappedElement.call(this);
    this._denied = false;
};
inherits(PostCommentsWidget, WrappedElement);

PostCommentsWidget.prototype.decorate = function (element) {
    this._element = element;
    this._post_id = element.data('parentPostId');
    this._post_type = element.data('parentPostType');
    //var widget_id = element.attr('id');
    //this._userCanPost = askbot['data'][widget_id]['can_post'];
    this._commentsReversed = askbot.settings.commentsReversed;

    //see if user can comment here
    this._loadCommentsButton = element.find('.js-load-comments-btn');

    if (this._loadCommentsButton.length) {
        if (this._commentsReversed/* || this._userCanPost */) {
            setupButtonEventHandlers(
                this._loadCommentsButton,
                this.getLoadCommentsHandler()
            );
        } else {
            setupButtonEventHandlers(
                this._loadCommentsButton,
                this.getAllowEditHandler()
            );
        }
    }

    this._openEditorButton = element.find('.js-open-editor-btn');
    if (this._openEditorButton.length) {
        setupButtonEventHandlers(
            this._openEditorButton,
            this.getOpenEditorHandler(this._openEditorButton)
        );
    }

    this._isTruncated = this._openEditorButton.hasClass('hidden');

    this._cbox = element.find('.content');
    var comments = [];
    var me = this;
    this._cbox.children('.comment').each(function (index, element) {
        var comment = new Comment(me);
        comments.push(comment);
        comment.decorate(element);
    });
    this._comments = comments;
};

PostCommentsWidget.prototype.handleDeletedComment = function () {
    /* if the widget does not have any comments, set
    the 'empty' class on the widget element */
    if (this._cbox.children('.comment').length === 0) {
        if (this._commentsReversed === false) {
            this._element.siblings('.comment-title').hide();
        }
        this._element.addClass('empty');
    }
};

PostCommentsWidget.prototype.getPostType = function () {
    return this._post_type;
};

PostCommentsWidget.prototype.getPostId = function () {
    return this._post_id;
};

PostCommentsWidget.prototype.getLoadCommentsButton = function () {
    return this._loadCommentsButton;
};

PostCommentsWidget.prototype.getOpenEditorButton = function () {
    return this._openEditorButton;
};

PostCommentsWidget.prototype.hideOpenEditorButton = function () {
    this._openEditorButton.hide();
    this._openEditorButton.addClass('hidden');
};

PostCommentsWidget.prototype.showOpenEditorButton = function () {
    this._openEditorButton.show();
    this._openEditorButton.removeClass('hidden');
};

PostCommentsWidget.prototype.startNewComment = function () {
    //find comment template, clone it's dom
    var comment = new Comment(this);
    var commentElem = getTemplate('.js-comment');
    if (this._commentsReversed) {
        this._cbox.prepend(commentElem);
    } else {
        this._cbox.append(commentElem);
    }
    comment.decorate(commentElem);
    this._element.removeClass('empty');
    this._element.trigger('askbot.beforeCommentStart');
    comment.startEditing();
};

PostCommentsWidget.prototype.canAddComment = function () {
    return this._commentsReversed || this._isTruncated === false;
};

PostCommentsWidget.prototype.userCanPost = function () {
    var data = askbot.data;
    if (data.userIsAuthenticated) {
        //true if admin, post owner or high rep user
        if (data.userIsAdminOrMod) {
            return true;
        } else if (this.getPostId() in data.user_posts) {
            return true;
        }
    }
    return false;
};

PostCommentsWidget.prototype.getAllowEditHandler = function () {
    var me = this;
    return function () {
        me.reloadAllComments(function (json) {
            me.reRenderComments(json);
            //2) change button text to "post a comment"
            me.getLoadCommentsButton().remove();
            me.showOpenEditorButton();
        });
    };
};

PostCommentsWidget.prototype.getOpenEditorHandler = function (button) {
    var me = this;
    return function () {
        //if user can't post, we tell him something and refuse
        var message;
        if (askbot.settings.readOnlyModeEnabled === true) {
            message = askbot.messages.readOnlyMessage;
            showMessage(button, message, 'after');
        } else if (askbot.data.userIsAuthenticated) {
            me.startNewComment();
        } else {
            message = gettext(
                'please sign in or register to post comments'
            );
            showMessage(button, message, 'after');
        }
    };
};

PostCommentsWidget.prototype.getLoadCommentsHandler = function () {
    var me = this;
    return function () {
        me.reloadAllComments(function (json) {
            me.reRenderComments(json);
            me.getLoadCommentsButton().remove();
        });
    };
};


PostCommentsWidget.prototype.reloadAllComments = function (callback) {
    var post_data = {
        post_id: this._post_id,
        post_type: this._post_type,
        avatar_size: askbot.settings.commentAvatarSize
    };
    var me = this;
    $.ajax({
        type: 'GET',
        url: askbot.urls.postComments,
        data: post_data,
        success: function (json) {
            callback(json);
            me._isTruncated = false;
        },
        dataType: 'json'
    });
};

PostCommentsWidget.prototype.reRenderComments = function (json) {
    var me = this;
    me._cbox.trigger('askbot.beforeReRenderComments', [this, json]);
    $.each(this._comments, function (i, item) {
        item.dispose();
    });
    this._comments = [];
    $.each(json, function (i, item) {
        var comment = new Comment(me);
        var commentElem = getTemplate('.js-comment');
        me._cbox.append(commentElem);
        comment.decorate(commentElem);
        comment.setContent(item);
        me._comments.push(comment);
    });
    me._cbox.trigger('askbot.afterReRenderComments', [this, json]);
};


var socialSharing = (function () {

    var SERVICE_DATA = {
        //url - template for the sharing service url, params are for the popup
        identica: {
            url: 'http://identi.ca/notice/new?status_textarea={TEXT}%20{URL}',
            params: 'width=820, height=526,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        twitter: {
            url: 'http://twitter.com/share?url={URL}&ref=twitbtn&text={TEXT}',
            params: 'width=820,height=526,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        facebook: {
            url: 'http://www.facebook.com/sharer.php?u={URL}&ref=fbshare&t={TEXT}',
            params: 'width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        linkedin: {
            url: 'http://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TEXT}',
            params: 'width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1'
        }
    };
    var URL = '';
    var TEXT = '';

    var share_page = function (service_name) {
        if (SERVICE_DATA[service_name]) {
            var url = SERVICE_DATA[service_name].url;
            url = url.replace('{TEXT}', TEXT);
            url = url.replace('{URL}', URL);
            var params = SERVICE_DATA[service_name].params;
            if (!window.open(url, 'sharing', params)) {
                window.location.href = url;
            }
            return false;
            //@todo: change to some other url shortening service
            // $.ajax({
            //     url: "http://json-tinyurl.appspot.com/?&callback=?",
            //     dataType: 'json',
            //     data: {'url':URL},
            //     success: function (data) {
            //         url = url.replace('{URL}', data.tinyurl);
            //     },
            //     error: function (xhr, opts, error) {
            //         url = url.replace('{URL}', URL);
            //     },
            //     complete: function (data) {
            //         url = url.replace('{TEXT}', TEXT);
            //         var params = SERVICE_DATA[service_name].params;
            //         if (!window.open(url, "sharing", params)) {
            //             window.location.href=url;
            //         }
            //     }
            // });
        }
    };

    return {
        init: function () {
            URL = window.location.href;
            var urlBits = URL.split('/');
            URL = urlBits.slice(0, -2).join('/') + '/';
            TEXT = encodeURIComponent($('h1 > a').text());
            var hashtag = encodeURIComponent(
                                askbot.settings.sharingSuffixText
                            );
            TEXT = TEXT.substr(0, 134 - URL.length - hashtag.length);
            TEXT = TEXT + '... ' + hashtag;
            var fb = $('a.facebook-share');
            var tw = $('a.twitter-share');
            var ln = $('a.linkedin-share');
            var ica = $('a.identica-share');
            copyAltToTitle(fb);
            copyAltToTitle(tw);
            copyAltToTitle(ln);
            copyAltToTitle(ica);
            setupButtonEventHandlers(fb, function () { share_page('facebook'); });
            setupButtonEventHandlers(tw, function () { share_page('twitter'); });
            setupButtonEventHandlers(ln, function () { share_page('linkedin'); });
            setupButtonEventHandlers(ica, function () { share_page('identica'); });
        }
    };
})();

/**
 * @constructor
 * @extends {SimpleControl}
 */
var QASwapper = function () {
    SimpleControl.call(this);
    this._ans_id = null;
};
inherits(QASwapper, SimpleControl);

QASwapper.prototype.decorate = function (element) {
    this._element = element;
    this._ans_id = parseInt(element.attr('id').split('-').pop());
    var me = this;
    this.setHandler(function () {
        me.startSwapping();
    });
};

QASwapper.prototype.startSwapping = function () {
    /* jshint loopfunc:true */
    while (true) {
        var title = prompt(gettext('Please enter question title (>10 characters)'));
        if (title.length >= 10) {
            var data = {new_title: title, answer_id: this._ans_id};
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                url: askbot.urls.swap_question_with_answer,
                data: data,
                success: function (data) {
                    window.location.href = data.question_url;
                }
            });
            break;
        }
    }
    /* jshint loopfunc:false */
};

/**
 * @constructor
 * An element that encloses an editor and everything inside it.
 * By default editor is hidden and user sees a box with a prompt
 * suggesting to make a post.
 * When user clicks, editor becomes accessible.
 */
var FoldedEditor = function () {
    WrappedElement.call(this);
};
inherits(FoldedEditor, WrappedElement);

FoldedEditor.prototype.getEditor = function () {
    return this._editor;
};

FoldedEditor.prototype.getEditorInputId = function () {
    return this._element.find('textarea').attr('id');
};

FoldedEditor.prototype.onAfterOpenHandler = function () {
    var editor = this.getEditor();
    if (editor) {
        setTimeout(function () { editor.focus(); }, 500);
    }
};

FoldedEditor.prototype.getOpenHandler = function () {
    var editorBox = this._editorBox;
    var promptBox = this._prompt;
    var externalTrigger = this._externalTrigger;
    var me = this;
    return function () {
        if (askbot.data.userIsReadOnly === true) {
            notify.show(gettext('Sorry, you have only read access'));
        } else {
            promptBox.hide();
            editorBox.show();
            var element = me.getElement();
            element.addClass('unfolded');

            /* make the editor one shot - once it unfolds it's
            * not accepting any events
            */
            element.unbind('click');
            element.unbind('focus');

            /* this function will open the editor
            * and focus cursor on the editor
            */
            me.onAfterOpenHandler();

            /* external trigger is a clickable target
            * placed outside of the this._element
            * that will cause the editor to unfold
            */
            if (externalTrigger) {
                var label = me.makeElement('label');
                label.html(externalTrigger.html());
                //set what the label is for
                label.attr('for', me.getEditorInputId());
                externalTrigger.replaceWith(label);
            }
        }
    };
};

FoldedEditor.prototype.setExternalTrigger = function (element) {
    this._externalTrigger = element;
};

FoldedEditor.prototype.decorate = function (element) {
    this._element = element;
    this._prompt = element.find('.prompt');
    this._editorBox = element.find('.editor-proper');

    var editorType = askbot.settings.editorType;
    var editor;
    if (editorType === 'tinymce') {
        editor = new TinyMCE();
        editor.decorate(element.find('textarea'));
        this._editor = editor;
    } else if (editorType === 'markdown') {
        editor = new WMD();
        editor.decorate(element);
        this._editor = editor;
    }

    var openHandler = this.getOpenHandler();
    element.click(openHandler);
    element.focus(openHandler);
    if (this._externalTrigger) {
        this._externalTrigger.click(openHandler);
    }
};



/**
 * @constructor
 * @todo: change this to generic object description editor
 */
var TagWikiEditor = function () {
    WrappedElement.call(this);
    this._state = 'display';//'edit' or 'display'
    this._content_backup  = '';
    this._is_editor_loaded = false;
    this._enabled_editor_buttons = null;
    this._is_previewer_enabled = false;
};
inherits(TagWikiEditor, WrappedElement);

TagWikiEditor.prototype.backupContent = function () {
    this._content_backup = this._content_box.contents();
};

TagWikiEditor.prototype.setEnabledEditorButtons = function (buttons) {
    this._enabled_editor_buttons = buttons;
};

TagWikiEditor.prototype.setPreviewerEnabled = function (state) {
    this._is_previewer_enabled = state;
    if (this.isEditorLoaded()) {
        this._editor.setPreviewerEnabled(this._is_previewer_enabled);
    }
};

TagWikiEditor.prototype.setContent = function (content) {
    this._content_box.empty();
    this._content_box.append(content);
};

TagWikiEditor.prototype.setState = function (state) {
    if (state === 'edit') {
        this._state = state;
        this._edit_btn.hide();
        this._cancel_btn.show();
        this._save_btn.show();
        this._cancel_sep.show();
    } else if (state === 'display') {
        this._state = state;
        this._edit_btn.show();
        this._cancel_btn.hide();
        this._cancel_sep.hide();
        this._save_btn.hide();
    }
};

TagWikiEditor.prototype.restoreContent = function () {
    var content_box = this._content_box;
    content_box.empty();
    $.each(this._content_backup, function (idx, element) {
        content_box.append(element);
    });
};

TagWikiEditor.prototype.getTagId = function () {
    return this._tag_id;
};

TagWikiEditor.prototype.isEditorLoaded = function () {
    return this._is_editor_loaded;
};

TagWikiEditor.prototype.setEditorLoaded = function () {
    this._is_editor_loaded = true;
    return true;
};

/**
 * loads initial data for the editor input and activates
 * the editor
 */
TagWikiEditor.prototype.startActivatingEditor = function () {
    var editor = this._editor;
    var me = this;
    var data = {
        object_id: me.getTagId(),
        model_name: 'Group'
    };
    $.ajax({
        type: 'GET',
        url: askbot.urls.load_object_description,
        data: data,
        cache: false,
        success: function (data) {
            me.backupContent();
            editor.setText(data);
            me.setContent(editor.getElement());
            me.setState('edit');
            if (me.isEditorLoaded() === false) {
                editor.start();
                me.setEditorLoaded();
            }
        }
    });
};

TagWikiEditor.prototype.saveData = function () {
    var me = this;
    var text = this._editor.getText();
    var data = {
        object_id: me.getTagId(),
        model_name: 'Group',//todo: fixme
        text: text
    };
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: askbot.urls.save_object_description,
        data: data,
        cache: false,
        success: function (data) {
            if (data.success) {
                me.setState('display');
                me.setContent(data.html);
            } else {
                showMessage(me.getElement(), data.message);
            }
        }
    });
};

TagWikiEditor.prototype.cancelEdit = function () {
    this.restoreContent();
    this.setState('display');
};

TagWikiEditor.prototype.decorate = function (element) {
    //expect <div id='group-wiki-{{id}}'><div class="content"/><a class="edit"/></div>
    this._element = element;
    var edit_btn = element.find('.edit-description');
    this._edit_btn = edit_btn;

    //adding two buttons...
    var save_btn = this.makeElement('a');
    save_btn.html(gettext('save'));
    edit_btn.after(save_btn);
    save_btn.hide();
    this._save_btn = save_btn;

    var cancel_btn = this.makeElement('a');
    cancel_btn.html(gettext('cancel'));
    save_btn.after(cancel_btn);
    cancel_btn.hide();
    this._cancel_btn = cancel_btn;

    this._cancel_sep = $('<span> | </span>');
    cancel_btn.before(this._cancel_sep);
    this._cancel_sep.hide();

    this._content_box = element.find('.content');
    this._tag_id = element.attr('id').split('-').pop();

    var me = this;
    var editor;
    if (askbot.settings.editorType === 'markdown') {
        editor = new WMD();
    } else {
        editor = new TinyMCE({//override defaults
            theme_advanced_buttons1: 'bold, italic, |, link, |, numlist, bullist',
            theme_advanced_buttons2: '',
            theme_advanced_path: false,
            plugins: ''
        });
    }
    if (this._enabled_editor_buttons) {
        editor.setEnabledButtons(this._enabled_editor_buttons);
    }
    editor.setPreviewerEnabled(this._is_previewer_enabled);
    this._editor = editor;
    setupButtonEventHandlers(edit_btn, function () { me.startActivatingEditor(); });
    setupButtonEventHandlers(cancel_btn, function () {me.cancelEdit(); });
    setupButtonEventHandlers(save_btn, function () {me.saveData(); });
};

var ImageChanger = function () {
    WrappedElement.call(this);
    this._image_element = undefined;
    this._delete_button = undefined;
    this._save_url = undefined;
    this._delete_url = undefined;
    this._messages = undefined;
};
inherits(ImageChanger, WrappedElement);

ImageChanger.prototype.setImageElement = function (image_element) {
    this._image_element = image_element;
};

ImageChanger.prototype.setMessages = function (messages) {
    this._messages = messages;
};

ImageChanger.prototype.setDeleteButton = function (delete_button) {
    this._delete_button = delete_button;
};

ImageChanger.prototype.setSaveUrl = function (url) {
    this._save_url = url;
};

ImageChanger.prototype.setDeleteUrl = function (url) {
    this._delete_url = url;
};

ImageChanger.prototype.setAjaxData = function (data) {
    this._ajax_data = data;
};

ImageChanger.prototype.showImage = function (image_url) {
    this._image_element.attr('src', image_url);
    this._image_element.show();
};

ImageChanger.prototype.deleteImage = function () {
    this._image_element.attr('src', '');
    this._image_element.css('display', 'none');

    var me = this;
    var delete_url = this._delete_url;
    var data = this._ajax_data;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: delete_url,
        data: data,
        cache: false,
        success: function (data) {
            if (data.success) {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ImageChanger.prototype.saveImageUrl = function (image_url) {
    var me = this;
    var data = this._ajax_data;
    data.image_url = image_url;
    var save_url = this._save_url;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: save_url,
        data: data,
        cache: false,
        success: function (data) {
            if (!data.success) {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ImageChanger.prototype.startDialog = function () {
    //reusing the wmd's file uploader
    var me = this;
    var change_image_text = this._messages.change_image;
    var change_image_button = this._element;
    Attacklab.Util.prompt(
        '<h3>' + gettext('Enter the logo url or upload an image') + '</h3>',
        'http://',
        function (image_url) {
            if (image_url) {
                me.saveImageUrl(image_url);
                me.showImage(image_url);
                change_image_button.html(change_image_text);
                me.showDeleteButton();
            }
        },
        'image'
    );
};

ImageChanger.prototype.showDeleteButton = function () {
    this._delete_button.show();
    this._delete_button.prev().show();
};

ImageChanger.prototype.hideDeleteButton = function () {
    this._delete_button.hide();
    this._delete_button.prev().hide();
};


ImageChanger.prototype.startDeleting = function () {
    if (confirm(gettext('Do you really want to remove the image?'))) {
        this.deleteImage();
        this._element.html(this._messages.add_image);
        this.hideDeleteButton();
        this._delete_button.hide();
        var sep = this._delete_button.prev();
        sep.hide();
    }
};

/**
 * decorates an element that will serve as the image changer button
 */
ImageChanger.prototype.decorate = function (element) {
    this._element = element;
    var me = this;
    setupButtonEventHandlers(
        element,
        function () {
            me.startDialog();
        }
    );
    setupButtonEventHandlers(
        this._delete_button,
        function () {
            me.startDeleting();
        }
    );
};

var UserGroupProfileEditor = function () {
    TagWikiEditor.call(this);
};
inherits(UserGroupProfileEditor, TagWikiEditor);

UserGroupProfileEditor.prototype.toggleEmailModeration = function () {
    var btn = this._moderate_email_btn;
    var group_id = this.getTagId();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {group_id: group_id},
        url: askbot.urls.toggle_group_email_moderation,
        success: function (data) {
            if (data.success) {
                btn.html(data.new_button_text);
            } else {
                showMessage(btn, data.message);
            }
        }
    });
};

UserGroupProfileEditor.prototype.decorate = function (element) {
    this.setEnabledEditorButtons('bold italic link ol ul');
    this.setPreviewerEnabled(false);
    UserGroupProfileEditor.superClass_.decorate.call(this, element);
    var change_logo_btn = element.find('.change-logo');
    this._change_logo_btn = change_logo_btn;

    var moderate_email_toggle = new TwoStateToggle();
    moderate_email_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'moderate_email'
    });
    var moderate_email_btn = element.find('#moderate-email');
    this._moderate_email_btn = moderate_email_btn;
    moderate_email_toggle.decorate(moderate_email_btn);

    var moderate_publishing_replies_toggle = new TwoStateToggle();
    moderate_publishing_replies_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'moderate_answers_to_enquirers'
    });
    var btn = element.find('#moderate-answers-to-enquirers');
    moderate_publishing_replies_toggle.decorate(btn);

    var vip_toggle = new TwoStateToggle();
    vip_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'is_vip'
    });
    btn = element.find('#vip-toggle');
    vip_toggle.decorate(btn);

    var readOnlyToggle = new TwoStateToggle();
    readOnlyToggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'read_only'
    });
    btn = element.find('#read-only-toggle');
    readOnlyToggle.decorate(btn);

    var opennessSelector = new DropdownSelect();
    var selectorElement = element.find('#group-openness-selector');
    opennessSelector.setPostData({
        group_id: this.getTagId(),
        property_name: 'openness'
    });
    opennessSelector.decorate(selectorElement);

    var email_editor = new TextPropertyEditor();
    email_editor.decorate(element.find('#preapproved-emails'));

    var domain_editor = new TextPropertyEditor();
    domain_editor.decorate(element.find('#preapproved-email-domains'));

    var logo_changer = new ImageChanger();
    logo_changer.setImageElement(element.find('.group-logo'));
    logo_changer.setAjaxData({
        group_id: this.getTagId()
    });
    logo_changer.setSaveUrl(askbot.urls.save_group_logo_url);
    logo_changer.setDeleteUrl(askbot.urls.delete_group_logo_url);
    logo_changer.setMessages({
        change_image: gettext('change logo'),
        add_image: gettext('add logo')
    });
    var delete_logo_btn = element.find('.delete-logo');
    logo_changer.setDeleteButton(delete_logo_btn);
    logo_changer.decorate(change_logo_btn);
};

var GroupJoinButton = function () {
    TwoStateToggle.call(this);
};
inherits(GroupJoinButton, TwoStateToggle);

GroupJoinButton.prototype.getPostData = function () {
    return { group_id: this._group_id };
};

GroupJoinButton.prototype.getHandler = function () {
    var me = this;
    return function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: me.getPostData(),
            url: askbot.urls.join_or_leave_group,
            success: function (data) {
                if (data.success) {
                    var level = data.membership_level;
                    var new_state = 'off-state';
                    if (level === 'full' || level === 'pending') {
                        new_state = 'on-state';
                    }
                    me.setState(new_state);
                } else {
                    showMessage(me.getElement(), data.message);
                }
            }
        });
    };
};
GroupJoinButton.prototype.decorate = function (elem) {
    GroupJoinButton.superClass_.decorate.call(this, elem);
    this._group_id = this._element.data('groupId');
};

var TagEditor = function () {
    WrappedElement.call(this);
    this._has_hot_backspace = false;
    this._settings = JSON.parse(askbot.settings.tag_editor);
    /*
    tags: {
        required: askbot.settings.tagsAreRequired,
        maxlength: askbot.settings.maxTagsPerPost * askbot.settings.maxTagLength,
        limit_tag_count: true,
        limit_tag_length: true
    },
    tags: {
        required: ' ' + gettext('tags cannot be empty'),
        maxlength: askbot.messages.tagLimits,
        limit_tag_count: askbot.messages.maxTagsPerPost,
        limit_tag_length: askbot.messages.maxTagLength
    },
    */
};
inherits(TagEditor, WrappedElement);

/* retagger function
    var doRetag = function () {
        $.ajax({
            type: 'POST',
            url: askbot.urls.retag,
            dataType: 'json',
            data: { tags: getUniqueWords(tagInput.val()).join(' ') },
            success: function (json) {
                if (json.success) {
                    new_tags = getUniqueWords(json.new_tags);
                    oldTagsHtml = '';
                    cancelRetag();
                    drawNewTags(new_tags.join(' '));
                    if (json.message) {
                        notify.show(json.message);
                    }
                } else {
                    cancelRetag();
                    showMessage(tagsDiv, json.message);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                showMessage(tagsDiv, gettext('sorry, something is not right here'));
                cancelRetag();
            }
        });
        return false;
    }
*/


TagEditor.prototype.getSelectedTags = function () {
    return $.trim(this._hidden_tags_input.val()).split(/\s+/);
};

TagEditor.prototype.setSelectedTags = function (tag_names) {
    this._hidden_tags_input.val($.trim(tag_names.join(' ')));
};

TagEditor.prototype.addSelectedTag = function (tag_name) {
    var tag_names = this._hidden_tags_input.val();
    this._hidden_tags_input.val(tag_names + ' ' + tag_name);
    $('.acResults').hide();//a hack to hide the autocompleter
};

TagEditor.prototype.isSelectedTagName = function (tag_name) {
    var tag_names = this.getSelectedTags();
    return $.inArray(tag_name, tag_names) !== -1;
};

TagEditor.prototype.removeSelectedTag = function (tag_name) {
    var tag_names = this.getSelectedTags();
    var idx = $.inArray(tag_name, tag_names);
    if (idx !== -1) {
        tag_names.splice(idx, 1);
    }
    this.setSelectedTags(tag_names);
};

TagEditor.prototype.getTagDeleteHandler = function (tag) {
    var me = this;
    return function () {
        me.removeSelectedTag(tag.getName());
        me.clearErrorMessage();
        tag.dispose();
        $('.acResults').hide();//a hack to hide the autocompleter
        me.fixHeight();
    };
};

TagEditor.prototype.cleanTag = function (tag_name, reject_dupe) {
    tag_name = $.trim(tag_name);
    tag_name = tag_name.replace(/\s+/, ' ');

    var force_lowercase = this._settings.force_lowercase_tags;
    if (force_lowercase) {
        tag_name = tag_name.toLowerCase();
    }

    if (reject_dupe && this.isSelectedTagName(tag_name)) {
        throw interpolate(
            gettext('tag "%s" was already added, no need to repeat (press "escape" to delete)'),
            [tag_name]
        );
    }

    var max_tags = this._settings.max_tags_per_post;
    if (this.getSelectedTags().length + 1 > max_tags) {//count current
        throw interpolate(
            ngettext(
                'a maximum of %s tag is allowed',
                'a maximum of %s tags are allowed',
                max_tags
            ),
            [max_tags]
        );
    }

    //generic cleaning
    return cleanTag(tag_name, this._settings);
};

TagEditor.prototype.addTag = function (tag_name) {
    var tag = new Tag();
    tag.setName(tag_name);
    tag.setDeletable(true);
    tag.setLinkable(true);
    tag.setDeleteHandler(this.getTagDeleteHandler(tag));
    this._tags_container.append(tag.getElement());
    this.addSelectedTag(tag_name);
};

TagEditor.prototype.immediateClearErrorMessage = function () {
    this._error_alert.html('');
    this._error_alert.show();
    //this._element.css('margin-top', '18px');//todo: the margin thing is a hack
};

TagEditor.prototype.clearErrorMessage = function (fade) {
    if (fade) {
        var me = this;
        this._error_alert.fadeOut(function () {
            me.immediateClearErrorMessage();
        });
    } else {
        this.immediateClearErrorMessage();
    }
};

TagEditor.prototype.setErrorMessage = function (text) {
    var old_text = this._error_alert.html();
    this._error_alert.html(text);
    if (old_text === '') {
        this._error_alert.hide();
        this._error_alert.fadeIn(100);
    }
    //this._element.css('margin-top', '0');//todo: remove this hack
};

TagEditor.prototype.getAddTagHandler = function () {
    var me = this;
    return function (tag_name) {
        if (me.isSelectedTagName(tag_name)) {
            return;
        }
        try {
            var clean_tag_name = me.cleanTag($.trim(tag_name));
            me.addTag(clean_tag_name);
            me.clearNewTagInput();
            me.fixHeight();
        } catch (error) {
            me.setErrorMessage(error);
            setTimeout(function () {
                me.clearErrorMessage(true);
            }, 1000);
        }
    };
};

TagEditor.prototype.getRawNewTagValue = function () {
    return this._visible_tags_input.val();//without trimming
};

TagEditor.prototype.clearNewTagInput = function () {
    return this._visible_tags_input.val('');
};

TagEditor.prototype.editLastTag = function () {
    //delete rendered tag
    var tc = this._tags_container;
    tc.find('li:last').remove();
    //remove from hidden tags input
    var tags = this.getSelectedTags();
    var last_tag = tags.pop();
    this.setSelectedTags(tags);
    //populate the tag editor
    this._visible_tags_input.val(last_tag);
    putCursorAtEnd(this._visible_tags_input);
};

TagEditor.prototype.setHotBackspace = function (is_hot) {
    this._has_hot_backspace = is_hot;
};

TagEditor.prototype.hasHotBackspace = function () {
    return this._has_hot_backspace;
};

TagEditor.prototype.completeTagInput = function (reject_dupe) {
    var tag_name = $.trim(this._visible_tags_input.val());
    try {
        tag_name = this.cleanTag(tag_name, reject_dupe);
        this.addTag(tag_name);
        this.clearNewTagInput();
    } catch (error) {
        this.setErrorMessage(error);
    }
};

TagEditor.prototype.saveHeight = function () {
    return;
    // var elem = this._visible_tags_input;
    // this._height = elem.offset().top;
};

TagEditor.prototype.fixHeight = function () {
    return;
    // var new_height = this._visible_tags_input.offset().top;
    // //@todo: replace this by real measurement
    // var element_height = parseInt(
    //     this._element.css('height').replace('px', '')
    // );
    // if (new_height > this._height) {
    //     this._element.css('height', element_height + 28);//magic number!!!
    // } else if (new_height < this._height) {
    //     this._element.css('height', element_height - 28);//magic number!!!
    // }
    // this.saveHeight();
};

TagEditor.prototype.closeAutoCompleter = function () {
    this._autocompleter.finish();
};

TagEditor.prototype.getTagInputKeyHandler = function () {
    var new_tags = this._visible_tags_input;
    var me = this;
    return function (e) {
        if (e.shiftKey) {
            return;
        }
        me.saveHeight();
        var key = e.which || e.keyCode;
        var text = me.getRawNewTagValue();

        //space 32, enter 13
        if (key === 32 || key === 13) {
            var tag_name = $.trim(text);
            if (tag_name.length > 0) {
                me.completeTagInput(true);//true for reject dupes
            }
            me.fixHeight();
            return false;
        }

        if (text === '') {
            me.clearErrorMessage();
            me.closeAutoCompleter();
        } else {
            try {
                /* do-nothing validation here
                 * just to report any errors while
                 * the user is typing */
                me.cleanTag(text);
                me.clearErrorMessage();
            } catch (error) {
                me.setErrorMessage(error);
            }
        }

        //8 is backspace
        if (key === 8 && text.length === 0) {
            if (me.hasHotBackspace() === true) {
                me.editLastTag();
                me.setHotBackspace(false);
            } else {
                me.setHotBackspace(true);
            }
        }

        //27 is escape
        if (key === 27) {
            me.clearNewTagInput();
            me.clearErrorMessage();
        }

        if (key !== 8) {
            me.setHotBackspace(false);
        }
        me.fixHeight();
        return false;
    };
};

TagEditor.prototype.decorate = function (element) {
    this._element = element;
    this._hidden_tags_input = element.find('input[name="tags"]');//this one is hidden
    this._tags_container = element.find('ul.tags');
    this._error_alert = $('.tag-editor-error-alert > span');

    var me = this;
    this._tags_container.children().each(function (idx, elem) {
        var tag = new Tag();
        tag.setDeletable(true);
        tag.setLinkable(false);
        tag.decorate($(elem));
        tag.setDeleteHandler(me.getTagDeleteHandler(tag));
    });

    var visible_tags_input = element.find('.new-tags-input');
    this._visible_tags_input = visible_tags_input;
    this.saveHeight();

    var tagsAc = new AutoCompleter({
        url: askbot.urls.get_tag_list,
        onItemSelect: function (item) {
            if (me.isSelectedTagName(item.value) === false) {
                me.completeTagInput();
            } else {
                me.clearNewTagInput();
            }
        },
        minChars: 1,
        useCache: true,
        matchInside: true,
        maxCacheLength: 100,
        delay: 10
    });
    tagsAc.decorate(visible_tags_input);
    this._autocompleter = tagsAc;
    visible_tags_input.keyup(this.getTagInputKeyHandler());

    element.click(function (e) {
        visible_tags_input.focus();
        return false;
    });
};

/**
 * @constructor
 * Category is a select box item
 * that has CategoryEditControls
 */
var Category = function () {
    SelectBoxItem.call(this);
    this._state = 'display';
    this._settings = JSON.parse(askbot.settings.tag_editor);
};
inherits(Category, SelectBoxItem);

Category.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

Category.prototype.getCategoryTree = function () {
    return this._tree;
};

Category.prototype.getName = function () {
    return this.getContent().getContent();
};

Category.prototype.getPath = function () {
    return this._tree.getPathToItem(this);
};

Category.prototype.setState = function (state) {
    this._state = state;
    if (!this._element) {
        return;
    }
    this._input_box.val('');
    if (state === 'display') {
        this.showContent();
        this.hideEditor();
        this.hideEditControls();
    } else if (state === 'editable') {
        this._tree._state = 'editable';//a hack
        this.showContent();
        this.hideEditor();
        this.showEditControls();
    } else if (state === 'editing') {
        this._prev_tree_state = this._tree.getState();
        this._tree._state = 'editing';//a hack
        this._input_box.val(this.getName());
        this.hideContent();
        this.showEditor();
        this.hideEditControls();
    }
};

Category.prototype.hideEditControls = function () {
    this._delete_button.hide();
    this._edit_button.hide();
    this._element.unbind('mouseenter mouseleave');
};

Category.prototype.showEditControls = function () {
    var del = this._delete_button;
    var edit = this._edit_button;
    this._element.hover(
        function () {
            del.show();
            edit.show();
        },
        function () {
            del.hide();
            edit.hide();
        }
    );
};

Category.prototype.showEditControlsNow = function () {
    this._delete_button.show();
    this._edit_button.show();
};

Category.prototype.hideContent = function () {
    this.getContent().getElement().hide();
};

Category.prototype.showContent = function () {
    this.getContent().getElement().show();
};

Category.prototype.showEditor = function () {
    this._input_box.show();
    this._input_box.focus();
    this._save_button.show();
    this._cancel_button.show();
};

Category.prototype.hideEditor = function () {
    this._input_box.hide();
    this._save_button.hide();
    this._cancel_button.hide();
};

Category.prototype.getInput = function () {
    return this._input_box.val();
};

Category.prototype.getDeleteHandler = function () {
    var me = this;
    return function () {
        if (confirm(gettext('Delete category?'))) {
            var tree = me.getCategoryTree();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    tag_name: me.getName(),
                    path: me.getPath()
                }),
                cache: false,
                url: askbot.urls.delete_tag,
                success: function (data) {
                    if (data.success) {
                        //rebuild category tree based on data
                        tree.setData(data.tree_data);
                        //re-open current branch
                        tree.selectPath(tree.getCurrentPath());
                        tree.setState('editable');
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
        return false;
    };
};

Category.prototype.getSaveHandler = function () {
    var me = this;
    var settings = this._settings;
    //here we need old value and new value
    return function () {
        var to_name = me.getInput();
        try {
            to_name = cleanTag(to_name, settings);
            var data = {
                from_name: me.getOriginalName(),
                to_name: to_name,
                path: me.getPath()
            };
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                cache: false,
                url: askbot.urls.rename_tag,
                success: function (data) {
                    if (data.success) {
                        me.setName(to_name);
                        me.setState('editable');
                        me.showEditControlsNow();
                    } else {
                        alert(data.message);
                    }
                }
            });
        } catch (error) {
            alert(error);
        }
        return false;
    };
};

Category.prototype.addControls = function () {
    var input_box = this.makeElement('input');
    this._input_box = input_box;
    this._element.append(input_box);

    var save_button = this.makeButton(
        gettext('save'),
        this.getSaveHandler()
    );
    this._save_button = save_button;
    this._element.append(save_button);

    var me = this;
    var cancel_button = this.makeButton(
        'x',
        function () {
            me.setState('editable');
            me.showEditControlsNow();
            return false;
        }
    );
    this._cancel_button = cancel_button;
    this._element.append(cancel_button);

    var edit_button = this.makeButton(
        gettext('edit'),
        function () {
            //todo: I would like to make only one at a time editable
            //var tree = me.getCategoryTree();
            //tree.closeAllEditors();
            //tree.setState('editable');
            //calc path, then select it
            var tree = me.getCategoryTree();
            tree.selectPath(me.getPath());
            me.setState('editing');
            return false;
        }
    );
    this._edit_button = edit_button;
    this._element.append(edit_button);

    var delete_button = this.makeButton(
        'x', this.getDeleteHandler()
    );
    this._delete_button = delete_button;
    this._element.append(delete_button);
};

Category.prototype.getOriginalName = function () {
    return this._original_name;
};

Category.prototype.createDom = function () {
    Category.superClass_.createDom.call(this);
    this.addControls();
    this.setState('display');
    this._original_name = this.getName();
};

Category.prototype.decorate = function (element) {
    Category.superClass_.decorate.call(this, element);
    this.addControls();
    this.setState('display');
    this._original_name = this.getName();
};

var CategoryAdder = function () {
    WrappedElement.call(this);
    this._state = 'disabled';//waitedit
    this._tree = undefined;//category tree
    this._settings = JSON.parse(askbot.settings.tag_editor);
};
inherits(CategoryAdder, WrappedElement);

CategoryAdder.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

CategoryAdder.prototype.setLevel = function (level) {
    this._level = level;
};

CategoryAdder.prototype.setState = function (state) {
    this._state = state;
    if (!this._element) {
        return;
    }
    if (state === 'waiting') {
        this._element.show();
        this._input.val('');
        this._input.hide();
        this._save_button.hide();
        this._cancel_button.hide();
        this._trigger.show();
    } else if (state === 'editable') {
        this._element.show();
        this._input.show();
        this._input.val('');
        this._input.focus();
        this._save_button.show();
        this._cancel_button.show();
        this._trigger.hide();
    } else if (state === 'disabled') {
        this.setState('waiting');//a little hack
        this._state = 'disabled';
        this._element.hide();
    }
};

CategoryAdder.prototype.cleanCategoryName = function (name) {
    name = $.trim(name);
    if (name === '') {
        throw gettext('category name cannot be empty');
    }
    //if ( this._tree.hasCategory(name) ) {
        //throw interpolate(
        //throw gettext('this category already exists');
        //    [this._tree.getDisplayPathByName(name)]
        //)
    //}
    return cleanTag(name, this._settings);
};

CategoryAdder.prototype.getPath = function () {
    var path = this._tree.getCurrentPath();
    if (path.length > this._level + 1) {
        return path.slice(0, this._level + 1);
    } else {
        return path;
    }
};

CategoryAdder.prototype.getSelectBox = function () {
    return this._tree.getSelectBox(this._level);
};

CategoryAdder.prototype.startAdding = function () {
    var name;
    try {
        name = this._input.val();
        name = this.cleanCategoryName(name);
    } catch (error) {
        alert(error);
        return;
    }

    //don't add dupes to the same level
    var existing_names = this.getSelectBox().getNames();
    if ($.inArray(name, existing_names) !== -1) {
        alert(gettext('already exists at the current level!'));
        return;
    }

    var me = this;
    var tree = this._tree;
    var adder_path = this.getPath();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            path: adder_path,
            new_category_name: name
        }),
        url: askbot.urls.add_tag_category,
        cache: false,
        success: function (data) {
            if (data.success) {
                //rebuild category tree based on data
                tree.setData(data.tree_data);
                tree.selectPath(data.new_path);
                tree.setState('editable');
                me.setState('waiting');
            } else {
                alert(data.message);
            }
        }
    });
};

CategoryAdder.prototype.createDom = function () {
    this._element = this.makeElement('li');
    //add open adder link
    var trigger = this.makeElement('a');
    this._trigger = trigger;
    trigger.html(gettext('add category'));
    this._element.append(trigger);
    //add input box and the add button
    var input = this.makeElement('input');
    this._input = input;
    input.addClass('add-category');
    input.attr('name', 'add_category');
    this._element.append(input);
    //add save category button
    var save_button = this.makeElement('button');
    this._save_button = save_button;
    save_button.html(gettext('save'));
    this._element.append(save_button);

    var cancel_button = this.makeElement('button');
    this._cancel_button = cancel_button;
    cancel_button.html('x');
    this._element.append(cancel_button);

    this.setState(this._state);

    var me = this;
    setupButtonEventHandlers(
        trigger,
        function () { me.setState('editable'); }
    );
    setupButtonEventHandlers(
        save_button,
        function () {
            me.startAdding();
            return false;//prevent form submit
        }
    );
    setupButtonEventHandlers(
        cancel_button,
        function () {
            me.setState('waiting');
            return false;//prevent submit
        }
    );
    //create input box, button and the "activate" link
};

/**
 * @constructor
 * SelectBox subclass to create/edit/delete
 * categories
 */
var CategorySelectBox = function () {
    SelectBox.call(this);
    this._item_class = Category;
    this._category_adder = undefined;
    this._tree = undefined;//cat tree
    this._level = undefined;
};
inherits(CategorySelectBox, SelectBox);

CategorySelectBox.prototype.setState = function (state) {
    this._state = state;
    if (state === 'select') {
        if (this._category_adder) {
            this._category_adder.setState('disabled');
        }
        $.each(this._items, function (idx, item) {
            item.setState('display');
        });
    } else if (state === 'editable') {
        this._category_adder.setState('waiting');
        $.each(this._items, function (idx, item) {
            item.setState('editable');
        });
    }
};

CategorySelectBox.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

CategorySelectBox.prototype.getCategoryTree = function () {
};

CategorySelectBox.prototype.setLevel = function (level) {
    this._level = level;
};

CategorySelectBox.prototype.getNames = function () {
    var names = [];
    $.each(this._items, function (idx, item) {
        names.push(item.getName());
    });
    return names;
};

CategorySelectBox.prototype.appendCategoryAdder = function () {
    var adder = new CategoryAdder();
    adder.setLevel(this._level);
    adder.setCategoryTree(this._tree);
    this._category_adder = adder;
    this._element.append(adder.getElement());
};

CategorySelectBox.prototype.createDom = function () {
    CategorySelectBox.superClass_.createDom();
    if (askbot.data.userIsAdmin) {
        this.appendCategoryAdder();
    }
};

CategorySelectBox.prototype.decorate = function (element) {
    CategorySelectBox.superClass_.decorate.call(this, element);
    this.setState(this._state);
    if (askbot.data.userIsAdmin) {
        this.appendCategoryAdder();
    }
};

/**
 * @constructor
 * turns on/off the category editor
 */
var CategoryEditorToggle = function () {
    TwoStateToggle.call(this);
};
inherits(CategoryEditorToggle, TwoStateToggle);

CategoryEditorToggle.prototype.setCategorySelector = function (sel) {
    this._category_selector = sel;
};

CategoryEditorToggle.prototype.getCategorySelector = function () {
    return this._category_selector;
};

CategoryEditorToggle.prototype.decorate = function (element) {
    CategoryEditorToggle.superClass_.decorate.call(this, element);
};

CategoryEditorToggle.prototype.getDefaultHandler = function () {
    var me = this;
    return function () {
        var editor = me.getCategorySelector();
        if (me.isOn()) {
            me.setState('off-state');
            editor.setState('select');
        } else {
            me.setState('on-state');
            editor.setState('editable');
        }
    };
};

var CategorySelector = function () {
    Widget.call(this);
    this._data = null;
    this._select_handler = function () {};//dummy default
    this._current_path = [0];//path points to selected item in tree
};
inherits(CategorySelector, Widget);

/**
 * propagates state to the individual selectors
 */
CategorySelector.prototype.setState = function (state) {
    this._state = state;
    if (state === 'editing') {
        return;//do not propagate this state
    }
    $.each(this._selectors, function (idx, selector) {
        selector.setState(state);
    });
};

CategorySelector.prototype.getPathToItem = function (item) {
    function findPathToItemInTree(tree, item) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (node[2] === item) {
                return [i];
            }
            var path = findPathToItemInTree(node[1], item);
            if (path.length > 0) {
                path.unshift(i);
                return path;
            }
        }
        return [];
    }
    return findPathToItemInTree(this._data, item);
};

CategorySelector.prototype.applyToDataItems = function (func) {
    function applyToDataItems(tree) {
        $.each(tree, function (idx, item) {
            func(item);
            applyToDataItems(item[1]);
        });
    }
    if (this._data) {
        applyToDataItems(this._data);
    }
};

CategorySelector.prototype.setData = function (data) {
    this._data = data;
    var tree = this;
    function attachCategory(item) {
        var cat = new Category();
        cat.setName(item[0]);
        cat.setCategoryTree(tree);
        item[2] = cat;
    }
    this.applyToDataItems(attachCategory);
};

/**
 * clears contents of selector boxes starting from
 * the given level, in range 0..2
 */
CategorySelector.prototype.clearCategoryLevels = function (level) {
    for (var i = level; i < 3; i++) {
        this._selectors[i].detachAllItems();
    }
};

CategorySelector.prototype.getLeafItems = function (selection_path) {
    //traverse the tree down to items pointed to by the path
    var data = this._data[0];
    for (var i = 1; i < selection_path.length; i++) {
        data = data[1][selection_path[i]];
    }
    return data[1];
};

/**
 * called when a sub-level needs to open
 */
CategorySelector.prototype.populateCategoryLevel = function (source_path) {
    var level = source_path.length - 1;
    if (level >= 3) {
        return;
    }
    //clear all items downstream
    this.clearCategoryLevels(level);

    //populate current selector
    var selector = this._selectors[level];
    var items  = this.getLeafItems(source_path);

    $.each(items, function (idx, item) {
        var category_name = item[0];
        var category_subtree = item[1];
        var category_object = item[2];
        selector.addItemObject(category_object);
        if (category_subtree.length > 0) {
            category_object.addCssClass('tree');
        }
    });

    this.setState(this._state);//update state

    selector.clearSelection();
};

CategorySelector.prototype.selectPath = function (path) {
    var i;
    for (i = 1; i <= path.length; i++) {
        this.populateCategoryLevel(path.slice(0, i));
    }
    for (i = 1; i < path.length; i++) {
        var sel_box = this._selectors[i - 1];
        var category = sel_box.getItemByIndex(path[i]);
        sel_box.selectItem(category);
    }
};

CategorySelector.prototype.getSelectBox = function (level) {
    return this._selectors[level];
};

CategorySelector.prototype.getSelectedPath = function (selected_level) {
    var path = [0];//root, todo: better use names for path???
    /*
     * upper limit capped by current clicked level
     * we ignore all selection above the current level
     */
    for (var i = 0; i < selected_level + 1; i++) {
        var selector = this._selectors[i];
        var item = selector.getSelectedItem();
        if (item) {
            path.push(selector.getItemIndex(item));
        } else {
            return path;
        }
    }
    return path;
};

/** getter and setter are not symmetric */
CategorySelector.prototype.setSelectHandler = function (handler) {
    this._select_handler = handler;
};

CategorySelector.prototype.getSelectHandlerInternal = function () {
    return this._select_handler;
};

CategorySelector.prototype.setCurrentPath = function (path) {
    this._current_path = path;
    return true;
};

CategorySelector.prototype.getCurrentPath = function () {
    return this._current_path;
};

CategorySelector.prototype.getEditorToggle = function () {
    return this._editor_toggle;
};

/*CategorySelector.prototype.closeAllEditors = function () {
    $.each(this._selectors, function (idx, sel) {
        sel._category_adder.setState('wait');
        $.each(sel._items, function (idx2, item) {
            item.setState('editable');
        });
    });
};*/

CategorySelector.prototype.getSelectHandler = function (level) {
    var me = this;
    return function (item_data) {
        if (me.getState() === 'editing') {
            return;//don't navigate when editing
        }
        //1) run the assigned select handler
        var tag_name = item_data.title;
        if (me.getState() === 'select') {
            /* this one will actually select the tag
             * maybe a bit too implicit
             */
            me.getSelectHandlerInternal()(tag_name);
        }
        //2) if appropriate, populate the higher level
        if (level < 2) {
            var current_path = me.getSelectedPath(level);
            me.setCurrentPath(current_path);
            me.populateCategoryLevel(current_path);
        }
    };
};

CategorySelector.prototype.decorate = function (element) {
    this._element = element;
    this._selectors = [];

    var selector0 = new CategorySelectBox();
    selector0.setLevel(0);
    selector0.setCategoryTree(this);
    selector0.decorate(element.find('.cat-col-0'));
    selector0.setSelectHandler(this.getSelectHandler(0));
    this._selectors.push(selector0);

    var selector1 = new CategorySelectBox();
    selector1.setLevel(1);
    selector1.setCategoryTree(this);
    selector1.decorate(element.find('.cat-col-1'));
    selector1.setSelectHandler(this.getSelectHandler(1));
    this._selectors.push(selector1);

    var selector2 = new CategorySelectBox();
    selector2.setLevel(2);
    selector2.setCategoryTree(this);
    selector2.decorate(element.find('.cat-col-2'));
    selector2.setSelectHandler(this.getSelectHandler(2));
    this._selectors.push(selector2);

    if (askbot.data.userIsAdminOrMod) {
        var editor_toggle = new CategoryEditorToggle();
        editor_toggle.setCategorySelector(this);
        var toggle_element = $('.category-editor-toggle');
        toggle_element.show();
        editor_toggle.decorate(toggle_element);
        this._editor_toggle = editor_toggle;
    }

    this.populateCategoryLevel([0]);
};

/**
 * @constructor
 * loads html for the category selector from
 * the server via ajax and activates the
 * CategorySelector on the loaded HTML
 */
var CategorySelectorLoader = function () {
    WrappedElement.call(this);
    this._is_loaded = false;
};
inherits(CategorySelectorLoader, WrappedElement);

CategorySelectorLoader.prototype.setCategorySelector = function (sel) {
    this._category_selector = sel;
};

CategorySelectorLoader.prototype.setLoaded = function (is_loaded) {
    this._is_loaded = is_loaded;
};

CategorySelectorLoader.prototype.isLoaded = function () {
    return this._is_loaded;
};

CategorySelectorLoader.prototype.setEditor = function (editor) {
    this._editor = editor;
};

CategorySelectorLoader.prototype.closeEditor = function () {
    this._editor.hide();
    this._editor_buttons.hide();
    this._display_tags_container.show();
    this._question_body.show();
    this._question_controls.show();
};

CategorySelectorLoader.prototype.openEditor = function () {
    this._editor.show();
    this._editor_buttons.show();
    this._display_tags_container.hide();
    this._question_body.hide();
    this._question_controls.hide();
    var sel = this._category_selector;
    sel.setState('select');
    sel.getEditorToggle().setState('off-state');
};

CategorySelectorLoader.prototype.addEditorButtons = function () {
    this._editor.after(this._editor_buttons);
};

CategorySelectorLoader.prototype.getOnLoadHandler = function () {
    var me = this;
    return function (html) {
        me.setLoaded(true);

        //append loaded html to dom
        var editor = $('<div>' + html + '</div>');
        me.setEditor(editor);
        $('#question-tags').after(editor);

        var selector = askbot.functions.initCategoryTree();
        me.setCategorySelector(selector);

        me.addEditorButtons();
        me.openEditor();
        //add the save button
    };
};

CategorySelectorLoader.prototype.startLoadingHTML = function (on_load) {
    var me = this;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: { template_name: 'widgets/tag_category_selector.html' },
        url: askbot.urls.get_html_template,
        cache: true,
        success: function (data) {
            if (data.success) {
                on_load(data.html);
            } else {
                showMessage(me.getElement(), data.message);
            }
        }
    });
};

CategorySelectorLoader.prototype.getRetagHandler = function () {
    var me = this;
    return function () {
        if (me.isLoaded() === false) {
            me.startLoadingHTML(me.getOnLoadHandler());
        } else {
            me.openEditor();
        }
        return false;
    };
};

CategorySelectorLoader.prototype.drawNewTags = function (new_tags) {
    if (new_tags === '') {
        this._display_tags_container.html('');
        return;
    }
    new_tags = new_tags.split(/\s+/);
    var tags_html = '';
    $.each(new_tags, function (index, name) {
        var tag = new Tag();
        tag.setName(name);
        tags_html += tag.getElement().outerHTML();
    });
    this._display_tags_container.html(tags_html);
};

CategorySelectorLoader.prototype.getSaveHandler = function () {
    var me = this;
    return function () {
        var tagInput = $('input[name="tags"]');
        $.ajax({
            type: 'POST',
            url: askbot.urls.retag,
            dataType: 'json',
            data: { tags: getUniqueWords(tagInput.val()).join(' ') },
            success: function (json) {
                if (json.success) {
                    var new_tags = getUniqueWords(json.new_tags);
                    oldTagsHtml = '';
                    me.closeEditor();
                    me.drawNewTags(new_tags.join(' '));
                } else {
                    me.closeEditor();
                    showMessage(me.getElement(), json.message);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                showMessage(tagsDiv, 'sorry, something is not right here');
                cancelRetag();
            }
        });
        return false;
    };
};

CategorySelectorLoader.prototype.getCancelHandler = function () {
    var me = this;
    return function () {
        me.closeEditor();
    };
};

CategorySelectorLoader.prototype.decorate = function (element) {
    this._element = element;
    this._display_tags_container = $('#question-tags');
    this._question_body = $('.question .post-body');
    this._question_controls = $('#question-controls');

    this._editor_buttons = this.makeElement('div');
    this._done_button = this.makeElement('button');
    this._done_button.html(gettext('save tags'));
    this._editor_buttons.append(this._done_button);

    this._cancel_button = this.makeElement('button');
    this._cancel_button.html(gettext('cancel'));
    this._editor_buttons.append(this._cancel_button);
    this._editor_buttons.find('button').addClass('submit');
    this._editor_buttons.addClass('retagger-buttons');

    //done button
    setupButtonEventHandlers(
        this._done_button,
        this.getSaveHandler()
    );
    //cancel button
    setupButtonEventHandlers(
        this._cancel_button,
        this.getCancelHandler()
    );

    //retag button
    setupButtonEventHandlers(
        element,
        this.getRetagHandler()
    );
};


var AskButton = function () {
    SimpleControl.call(this);
    this._handler = function (evt) {
        if (askbot.data.userIsReadOnly === true) {
            notify.show(gettext('Sorry, you have only read access'));
            evt.preventDefault();
        }
    };
};
inherits(AskButton, SimpleControl);


$(document).ready(function () {
    $('.comments').each(function (index, element) {
        var comments = new PostCommentsWidget();
        comments.decorate($(element));
    });
    $('[id^="swap-question-with-answer-"]').each(function (idx, element) {
        var swapper = new QASwapper();
        swapper.decorate($(element));
    });
    $('[id^="post-id-"]').each(function (idx, element) {
        var deleter = new DeletePostLink();
        //confusingly .question-delete matches the answers too need rename
        var post_id = element.id.split('-').pop();
        deleter.setPostId(post_id);
        deleter.decorate($(element).find('.question-delete'));
    });
    //todo: convert to "control" class
    var publishBtns = $('.answer-publish, .answer-unpublish');
    publishBtns.each(function (idx, btn) {
        setupButtonEventHandlers($(btn), function () {
            var answerId = $(btn).data('answerId');
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {'answer_id': answerId},
                url: askbot.urls.publishAnswer,
                success: function (data) {
                    if (data.success) {
                        window.location.reload(true);
                    } else {
                        showMessage($(btn), data.message);
                    }
                }
            });
        });
    });

    if (askbot.settings.tagSource === 'category-tree') {
        var catSelectorLoader = new CategorySelectorLoader();
        catSelectorLoader.decorate($('#retag'));
    } else {
        questionRetagger.init();
    }
    socialSharing.init();

    var proxyUserNameInput = $('#id_post_author_username');
    var proxyUserEmailInput = $('#id_post_author_email');
    if (proxyUserNameInput.length === 1) {

        var userSelectHandler = function (data) {
            proxyUserEmailInput.val(data.data[0]);
        };

        var fakeUserAc = new AutoCompleter({
            url: '/get-users-info/',//askbot.urls.get_users_info,
            minChars: 1,
            useCache: true,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10,
            onItemSelect: userSelectHandler
        });
        fakeUserAc.decorate(proxyUserNameInput);
    }
    //if groups are enabled - activate share functions
    var groupsInput = $('#share_group_name');
    if (groupsInput.length === 1) {
        var groupsAc = new AutoCompleter({
            url: askbot.urls.getGroupsList,
            promptText: gettext('Group name:'),
            minChars: 1,
            useCache: false,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        groupsAc.decorate(groupsInput);
    }
    var usersInput = $('#share_user_name');
    if (usersInput.length === 1) {
        var usersAc = new AutoCompleter({
            url: '/get-users-info/',
            promptText: askbot.messages.userNamePrompt,
            minChars: 1,
            useCache: false,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        usersAc.decorate(usersInput);
    }

    var showSharedUsers = $('.see-related-users');
    if (showSharedUsers.length) {
        var usersPopup = new ThreadUsersDialog();
        usersPopup.setHeadingText(gettext('Shared with the following users:'));
        usersPopup.decorate(showSharedUsers);
    }
    var showSharedGroups = $('.see-related-groups');
    if (showSharedGroups.length) {
        var groupsPopup = new ThreadUsersDialog();
        groupsPopup.setHeadingText(gettext('Shared with the following groups:'));
        groupsPopup.decorate(showSharedGroups);
    }

    var askButton = new AskButton();
    askButton.decorate($('#askButton'));

    if (askbot.data.userIsThreadModerator) {
        var mergeQuestions = new MergeQuestionsDialog();
        $('body').append(mergeQuestions.getElement());
        var mergeBtn = $('.question-merge');
        setupButtonEventHandlers(mergeBtn, function () {
            mergeQuestions.show();
        });
    }
});
