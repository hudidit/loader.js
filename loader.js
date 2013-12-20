/*
    loader.js
*/
var loader = function(){
    
    var doc = document,
        body= doc.body;
    
    // load scripts/stylesheets synchronously
    // usage: loader.syncLoad( src1, src2, href1, href2, ... )
    function syncLoad(){
        var arg = arguments,
            len = arg.length;
        while( len ){
            create( arg[ len - 1 ] ).append();
            len -- ;
        }
    }
    // load scripts/stylesheets asynchronously
    // usage: loader.asyncLoad( src1, src2, href1, href2, ... )
    function asyncLoad(){
        var arg = arguments,
            arr = [],
            len = arg.length,
            i   = 0;
        while( i < len ){
            (function( i ){
                arr.push( create( arg[i] ) );
            })( i );
            i ++;
        }
        arr.forEach(function(el,index,arr){
            if( index < (len - 1) ){
                el.load(function(){
                    arr[index+1].append();
                });
            }
        });
        arr[0].append();
    }
    
    function create( src ){
        var type = src.split('.').pop(),
            el = {};
        switch( type ){
            case 'js':
                el.t = doc.createElement('script');
                el.t.src = src;
                el.append = function(){
                    doc.body.appendChild( el.t );
                    return this;
                };
                break;
            case 'css':
                el.t = doc.createElement('link');
                el.t.setAttribute('rel','stylesheet');
                el.t.setAttribute('href',src);
                el.append = function(){
                    doc.querySelector('head').appendChild( el.t );
                    return this;
                };
                break;
        }
        el.load = function( fn ){
            el.t.onload = fn;
            return this;
        };
        return el;
    }
    
    this.syncLoad = syncLoad;
    this.asyncLoad = asyncLoad;
    
    return this;
};
    
