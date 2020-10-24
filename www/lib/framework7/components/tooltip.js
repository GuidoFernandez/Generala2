(function framework7ComponentLoader(t,e){void 0===e&&(e=!0);document,window;var o=t.$,i=(t.Template7,t.utils),r=(t.device,t.support),n=t.Class,a=(t.Modal,t.ConstructorMethods),s=(t.ModalMethods,function(t){function e(e,n){void 0===n&&(n={}),t.call(this,n,[e]);var a=this,s=i.extend({},e.params.tooltip);a.useModulesParams(s),a.params=i.extend(s,n),void 0===n.offset&&r.touch&&"hover"===a.params.trigger&&(a.params.offset=10);var l=a.params.targetEl;if(!l)return a;var p=o(l);if(0===p.length)return a;if(p[0].f7Tooltip)return p[0].f7Tooltip;var h=o(a.render()).eq(0);i.extend(a,{app:e,$targetEl:p,targetEl:p&&p[0],$el:h,el:h&&h[0],text:a.params.text||"",visible:!1,opened:!1}),p[0].f7Tooltip=a;var f,c={};function d(){a.opened?a.hide():a.show(this)}function u(t){a.opened&&(o(t.target).closest(p).length||o(t.target).closest(a.$el).length)||a.hide()}function v(t){f||(f=!0,c.x="touchstart"===t.type?t.targetTouches[0].pageX:t.pageX,c.y="touchstart"===t.type?t.targetTouches[0].pageY:t.pageY,a.show(this))}function g(t){if(f){var e="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,o="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY;Math.pow(Math.pow(e-c.x,2)+Math.pow(o-c.y,2),.5)>50&&(f=!1,a.hide())}}function m(){f&&(f=!1,a.hide())}function y(){a.show(this)}function E(){a.hide()}function T(){h.hasClass("tooltip-in")||h.removeClass("tooltip-out").remove()}return a.attachEvents=function(){if(h.on("transitionend",T),"click"===a.params.trigger)return p.on("click",d),void o("html").on("click",u);if(r.touch){var t=!!r.passiveListener&&{passive:!0};p.on(e.touchEvents.start,v,t),e.on("touchmove",g),e.on("touchend:passive",m)}else p.on(r.pointerEvents?"pointerenter":"mouseenter",y),p.on(r.pointerEvents?"pointerleave":"mouseleave",E)},a.detachEvents=function(){if(h.off("transitionend",T),"click"===a.params.trigger)return p.off("click",d),void o("html").off("click",u);if(r.touch){var t=!!r.passiveListener&&{passive:!0};p.off(e.touchEvents.start,v,t),e.off("touchmove",g),e.off("touchend:passive",m)}else p.off(r.pointerEvents?"pointerenter":"mouseenter",y),p.off(r.pointerEvents?"pointerleave":"mouseleave",E)},a.useModules(),a.init(),a}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.position=function(t){var e=this.$el,i=this.app,r=this.params.offset||0;e.css({left:"",top:""});var n,a,s,l,p=o(t||this.targetEl),h=[e.width(),e.height()],f=h[0],c=h[1];if(e.css({left:"",top:""}),p&&p.length>0){if(n=p.outerWidth(),a=p.outerHeight(),void 0===n&&void 0===a){var d=p[0].getBoundingClientRect();n=d.width,a=d.height}var u=p.offset();s=u.left-i.left,l=u.top-i.top;var v=p.parents(".page");v.length>0&&(l-=v[0].scrollTop)}var g=[0,0,0],m=g[0],y=g[1],E="top";c+r<l?y=l-c-r:c<i.height-l-a?(E="bottom",y=l+a+r):(E="middle",(y=a/2+l-c/2)<=0?y=8:y+c>=i.height&&(y=i.height-c-8)),"top"===E||"bottom"===E?((m=n/2+s-f/2)<8&&(m=8),m+f>i.width&&(m=i.width-f-8),m<0&&(m=0)):"middle"===E&&((m=s-f)<8||m+f>i.width)&&(m<8&&(m=s+n),m+f>i.width&&(m=i.width-f-8)),e.css({top:y+"px",left:m+"px"})},e.prototype.show=function(t){var e=this.app,i=this.$el,r=this.$targetEl;e.root.append(i),this.position(t);var n=o(t);return this.visible=!0,this.opened=!0,r.trigger("tooltip:show"),i.trigger("tooltip:show"),n.length&&n[0]!==r[0]&&n.trigger("tooltip:show"),this.emit("local::show tooltipShow",this),i.removeClass("tooltip-out").addClass("tooltip-in"),this},e.prototype.hide=function(){var t=this.$el,e=this.$targetEl;return this.visible=!1,this.opened=!1,e.trigger("tooltip:hide"),t.trigger("tooltip:hide"),this.emit("local::hide tooltipHide",this),t.addClass("tooltip-out").removeClass("tooltip-in"),this},e.prototype.render=function(){if(this.params.render)return this.params.render.call(this,this);var t=this.params;return('\n      <div class="tooltip '+(t.cssClass||"")+'">\n        <div class="tooltip-content">'+(t.text||"")+"</div>\n      </div>\n    ").trim()},e.prototype.setText=function(t){return void 0===t||(this.params.text=t,this.text=t,this.$el&&this.$el.children(".tooltip-content").html(t),this.opened&&this.position()),this},e.prototype.init=function(){this.attachEvents()},e.prototype.destroy=function(){this.$targetEl&&!this.destroyed&&(this.$targetEl.trigger("tooltip:beforedestroy"),this.emit("local::beforeDestroy tooltipBeforeDestroy",this),this.$el.remove(),delete this.$targetEl[0].f7Tooltip,this.detachEvents(),i.deleteProps(this),this.destroyed=!0)},e}(n)),l={name:"tooltip",static:{Tooltip:s},create:function(){this.tooltip=a({defaultSelector:".tooltip",constructor:s,app:this,domProp:"f7Tooltip"}),this.tooltip.show=function(t){var e=o(t);if(0!==e.length){var i=e[0].f7Tooltip;if(i)return i.show(e[0]),i}},this.tooltip.hide=function(t){var e=o(t);if(0!==e.length){var i=e[0].f7Tooltip;if(i)return i.hide(),i}},this.tooltip.setText=function(t,e){var i=o(t);if(0!==i.length){var r=i[0].f7Tooltip;if(r)return r.setText(e),r}}},params:{tooltip:{targetEl:null,text:null,cssClass:null,render:null,offset:0,trigger:"hover"}},on:{tabMounted:function(t){var e=this;o(t).find(".tooltip-init").each((function(t,i){var r=o(i).attr("data-tooltip");r&&e.tooltip.create({targetEl:i,text:r})}))},tabBeforeRemove:function(t){o(t).find(".tooltip-init").each((function(t,e){e.f7Tooltip&&e.f7Tooltip.destroy()}))},pageInit:function(t){var e=this;t.$el.find(".tooltip-init").each((function(t,i){var r=o(i).attr("data-tooltip");r&&e.tooltip.create({targetEl:i,text:r})})),"ios"===e.theme&&t.view&&t.view.router.dynamicNavbar&&t.$navbarEl&&t.$navbarEl.length>0&&t.$navbarEl.find(".tooltip-init").each((function(t,i){var r=o(i).attr("data-tooltip");r&&e.tooltip.create({targetEl:i,text:r})}))},pageBeforeRemove:function(t){t.$el.find(".tooltip-init").each((function(t,e){e.f7Tooltip&&e.f7Tooltip.destroy()})),"ios"===this.theme&&t.view&&t.view.router.dynamicNavbar&&t.$navbarEl&&t.$navbarEl.length>0&&t.$navbarEl.find(".tooltip-init").each((function(t,e){e.f7Tooltip&&e.f7Tooltip.destroy()}))}},vnode:{"tooltip-init":{insert:function(t){var e=t.elm,i=o(e).attr("data-tooltip");i&&this.tooltip.create({targetEl:e,text:i})},update:function(t){var e=t.elm;e.f7Tooltip&&t&&t.data&&t.data.attrs&&t.data.attrs["data-tooltip"]&&e.f7Tooltip.setText(t.data.attrs["data-tooltip"])},destroy:function(t){var e=t.elm;e.f7Tooltip&&e.f7Tooltip.destroy()}}}};if(e){if(t.prototype.modules&&t.prototype.modules[l.name])return;t.use(l),t.instance&&(t.instance.useModuleParams(l,t.instance.params),t.instance.useModule(l))}return l}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
