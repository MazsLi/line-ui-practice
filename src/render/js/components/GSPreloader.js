
import { TweenLite, TimelineLite } from 'gsap/all';

var preloader;

let testOptions = { // example
    radius: 36, // default is (parent.width/10)/2
    dotSize: 10, 
    // dotCount: 10, 
    // boxOpacity: 0.2,
    // boxBorder: "1px solid #AAA",
    // dotClass: 'preloader-dot',
    text: 'download', // boolean or text
    parent: document.body, // preloader parent element
    colors: ["#3AB795", "#A0E8AF", "#86BAA1"], // have as many or as few colors as you want.
    dotRadius: '50%', // 0% to 50% = square to circular 
    // top: '45%',  // top in parent
    // left: '50%', // left in parent
    
}

var GSPreloader = module.exports = function( options = testOptions ) {

    let parent = options.parent || document.body,
    isActive = false,
    animation = new TimelineLite( { paused: true } ),
    element = document.createElement("div"),
    radius = options.radius || ($(parent).width()/10) / 2 || 24,
    dotSize = options.dotSize || 15,
    animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
    createDot = function(rotation) {
        var dot = document.createElement("div");
        element.appendChild(dot);
        TweenLite.set(
            dot, 
            {
                width: dotSize, 
                height: dotSize, 
                transformOrigin: (-radius + "px 0px"), 
                x: radius, 
                backgroundColor: colors[colors.length-1], 
                borderRadius: options.dotRadius || "50%", 
                force3D: true, 
                position: "absolute", 
                rotation: rotation
            }
        )
        dot.className = options.dotClass || "preloader-dot";
        return dot; 
    }, 
    i = options.dotCount || 10,
    rotationIncrement = 360 / i,
    colors = options.colors || ["#61AC27","black"],
    dots = [],
    box = document.createElement("div"),
    tl, dot, closingAnimation, j, text;

    // setup background box
    TweenLite.set(
        box, 
        {
            width: radius * 2 + 70, // 100vw
            height: radius * 2 + 70, 
            borderRadius:"14px", 
            backgroundColor:options.boxColor || "white", 
            border: options.boxBorder || "0px solid #AAA", 
            position:"absolute", 
            xPercent:-50, 
            yPercent:-50, 
            opacity:((options.boxOpacity != null) ? options.boxOpacity : 0.3)
        }
    )
    box.className = options.boxClass || "preloader-box";

    // Create text elecment
    text = document.createElement('div');
    text.innerText = ( typeof options.text === 'string' )? options.text: 'loading';
    text.style.display = 'flex';
    text.style.width = '100%';
    text.style.height = '100%';
    text.style.justifyContent = 'center';
    text.style.alignItems = 'center';
    text.style.wordBreak = 'break-all';
    box.appendChild(text);
    if( !options.text ) text.style.visibility = 'hidden';

    element.appendChild(box);
    parent.appendChild(element);

    TweenLite.set(
        element, 
        { 
            position: "fixed", 
            top: options.top || "45%", 
            left: options.left || "50%", 
            perspective: 600, 
            overflow: "visible", 
            zIndex:2000
        }
    )
    animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);

    while (--i > -1) {
        dot = createDot(i * rotationIncrement);
        dots.unshift(dot);
        animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
        //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
        tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
        for (j = 0; j < colors.length; j++) {
            tl.to( dot,  2.5, { rotation:"-=360", ease:Power2.easeInOut, scale: 1.2 }, j * 2.9 )
            .to( dot, 1.2, { skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut, scale: 1 }, 1.6 + 2.9 * j )
            // text part
            .to( text, .5, { scale: 1.5, color: colors[j]})
            .to( text, .3, { scale: .8, color: colors[j]})
            .to( text, .2, { scale: 1, color: colors[j]});
            
        }
        //stagger its placement into the master timeline
        animation.add(tl, i * 0.07);
    }

    if (TweenLite.render) {
        TweenLite.render(); // trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
    }

    /**
     * active(true) to open the preloader,
     * active(false) to close it,
     * active() to get the current state.
     */
    this.active = function(show) {
    
        if (!arguments.length) return isActive;
    
        if (isActive != show) {
            isActive = show;
            if (closingAnimation) {
                 // in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
                closingAnimation.kill();
            }
            if (isActive) {
                element.style.visibility = "visible";
                TweenLite.set([element, box], {rotation:0});
                animation.play(animationOffset);
                
            } else {
                closingAnimation = new TimelineLite();
                if (animation.time() < animationOffset + 0.3) {
                    animation.pause();
                    closingAnimation.to(
                        element, 
                        1, 
                        { rotation:-360, ease:Power1.easeInOut }
                    ).to( box, 1, { rotation: 360, ease: Power1.easeInOut }, 0 );
                }
                closingAnimation.staggerTo(
                    dots, 0.3, 
                    { scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0
                )
                .to( box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0)
                .call( () => { animation.pause(); closingAnimation = null; } )
                .set( element, {visibility:"hidden"} );
            }
        }
    
        return this;
    }

    this.pause = function() {
        animation.pause();
    }

    // open the preloader
    this.active(true);
    
}

GSPreloader.prototype.toggle = function () {

    this.active( !this.active() );

}

GSPreloader.prototype.pause = function () {
    
    this.pause();

}

//this is the whole preloader class/function
function _GSPreloader(options) {
    options = options || {};
    var parent = options.parent || document.body,
        element = this.element = document.createElement("div"),
        radius = options.radius || 42,
        dotSize = options.dotSize || 15,
        animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
        createDot = function(rotation) {
            var dot = document.createElement("div");
            element.appendChild(dot);
            TweenLite.set(dot, {width:dotSize, height:dotSize, transformOrigin:(-radius + "px 0px"), x: radius, backgroundColor:colors[colors.length-1], borderRadius:"50%", force3D:true, position:"absolute", rotation:rotation});
            dot.className = options.dotClass || "preloader-dot";
            return dot; 
        }, 
        i = options.dotCount || 10,
        rotationIncrement = 360 / i,
        colors = options.colors || ["#61AC27","black"],
        animation = new TimelineLite({paused:true}),
        dots = [],
        isActive = false,
        box = document.createElement("div"),
        tl, dot, closingAnimation, j;
    colors.push(colors.shift());

    // setup background box
    TweenLite.set(
        box, 
        {
            width: radius * 2 + 70, 
            height: radius * 2 + 70, 
            borderRadius:"14px", 
            backgroundColor:options.boxColor || "white", 
            border: options.boxBorder || "1px solid #AAA", 
            position:"absolute", 
            xPercent:-50, 
            yPercent:-50, 
            opacity:((options.boxOpacity != null) ? options.boxOpacity : 0.3)
        }
    )
    box.className = options.boxClass || "preloader-box";
    
    element.appendChild(box);
    parent.appendChild(element);

    TweenLite.set(element, {position:"fixed", top:"45%", left:"50%", perspective:600, overflow:"visible", zIndex:2000});
    animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);
    while (--i > -1) {
        dot = createDot(i * rotationIncrement);
        dots.unshift(dot);
        animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
        //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
        tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
        for (j = 0; j < colors.length; j++) {
        tl.to(dot, 2.5, {rotation:"-=360", ease:Power2.easeInOut}, j * 2.9)
            .to(dot, 1.2, {skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut}, 1.6 + 2.9 * j);
        }
        //stagger its placement into the master timeline
        animation.add(tl, i * 0.07);
    }

    if (TweenLite.render) {
        TweenLite.render(); // trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
    }

    // call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
    this.active = function(show) {
        if (!arguments.length) {
        return isActive;
        }
        if (isActive != show) {
        isActive = show;
        if (closingAnimation) {
            closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
        }
        if (isActive) {
            element.style.visibility = "visible";
            TweenLite.set([element, box], {rotation:0});
            animation.play(animationOffset);
        } else {
            closingAnimation = new TimelineLite();
            if (animation.time() < animationOffset + 0.3) {
            animation.pause();
            closingAnimation.to(element, 1, {rotation:-360, ease:Power1.easeInOut}).to(box, 1, {rotation:360, ease:Power1.easeInOut}, 0);
            }
            closingAnimation.staggerTo(dots, 0.3, {scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0).to(box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0).call(function() { animation.pause(); closingAnimation = null; }).set(element, {visibility:"hidden"});
        }
        }
        return this;
    }
}
  