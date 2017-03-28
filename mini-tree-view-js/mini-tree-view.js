var minitree = (function () {
    function minitree(data, config) {
        var self = this;
        try {
            this.addIeExtentions();
            this.init(config);
            this.draw(data, 0);
        } 
        catch (e) {
            self.onerror(e.message);

        }
    }


    minitree.prototype.init = function (config) {
        if(this.isNullOrUndefined(config))
            throw new Error("The object config not specified");

        this.container = config.container;        
    }

    minitree.prototype.draw = function (data, level, parent) {
        if (!this.isArray(data))
            throw new Error("The object data must be an array");

        var ul = document.createElement('ul');        
        for (var ii = 0; ii < data.length; ii++) {
            var item = data[ii];

            var leaf = this.createLeaf(item.name, level);
            this.addLeaf(leaf, parent, ul);

            if (this.isArray(item.childs) && item.childs.length > 0)
                this.draw(item.childs, level + 1, leaf);
        }
    }

    minitree.prototype.createLeaf = function (name, level) {
        var leaf = document.createElement('li');
        leaf.innerHTML = name;
        if (level > 0)
            leaf.style.display = "none";

        this.addEventListener(leaf, "click", this.leafClickHandler.bind(this));

        return leaf;
    }

    minitree.prototype.leafClickHandler = function (e) {
        var target = this.getEventTarget(e);
        var uls = target.children;
        if (uls.length > 0) {
            var lis = uls[0].children;
            this.setInvertDisplayStyle(lis);
        }        
    }

    minitree.prototype.setInvertDisplayStyle = function (lis) {
        for (var ii = 0; ii < lis.length; ii++) {
            lis[ii].style.display = lis[ii].style.display === 'none' ? '' : 'none';
        }
    }


    minitree.prototype.getEventTarget = function (e) {
        return (typeof (e.target) !== 'undefined') ? e.target : e.srcElement;
    }

    minitree.prototype.addLeaf = function (leaf, parent, ul) {
        ul.appendChild(leaf);
        if (this.isNullOrUndefined(parent))
            this.container.appendChild(ul);
        else
            parent.appendChild(ul);
    }

    minitree.prototype.addEventListener = function (o, e, f) {
        if ('addEventListener' in window) {
            o.addEventListener(e, f, false);
        } else if ('attachEvent' in window) {//IE
            o.attachEvent('on' + e, f);
        }
    }

    minitree.prototype.onerror = function (msg) {
        console.error(msg);
    }

    minitree.prototype.isArray = function (o) {
        if (!o)
            return false;

        if (typeof(Array.isArray) !== "undefined")
            return Array.isArray;        
            
        if (typeof(o) === 'object')
            return (Object.prototype.toString.call(o) == '[object Array]');

        return false;
    }

    minitree.prototype.isNullOrUndefined = function(o) {
        return(typeof(o) == 'undefined' || o == null)
    }

    minitree.prototype.addIeExtentions = function() {
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function")                    
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }     
    }

    return minitree;
})();
