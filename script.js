//CAR BOUNCE

let myCar = document.querySelectorAll("#animation");
let myLights = document.querySelectorAll("#lights_off");

let tl = new TimelineMax();

tl

    .to(myCar, 2.5, {
        ease: Elastic.easeOut.config(1, 0.3),
        repeat: -1,
        yoyo: true,
        y: -5
    });

//.to(myLights, 2.5, { ease: Power1.easeOut, y: -500 });
TweenMax.staggerTo(myLights, 1, {
    opacity: 0.3,
    ease: SteppedEase.config(1),
    repeat: -1,
    repeatDelay: 0.5,
    delay: -1
}, 0.5);




let myDotty = document.querySelectorAll("#dotty")
var dotTl = new TimelineMax({repeat: -1});

dotTl.to(myDotty, 2.5, {
    ease: Power1.easeInOut,
    alpha:0,
    repeatDelay:4,
    yoyo:true,
    y: 50

});

//ZOOM THE SIGNS

//TweenMax.to(".zoom", 1, {scale:2.5, transformOrigin:"center center"});
let zooms = document.querySelectorAll('svg .zoom');

zooms.forEach(zoom => {
    zoom.addEventListener('mouseenter', (e) => {
        console.log("hit")
        TweenMax.to(e.target, 1, {
            scale: 1.5,
            transformOrigin: "bottom center"
        });
    })
    zoom.addEventListener('mouseleave', (e) => {
        console.log("hit")
        TweenMax.to(e.target, 1, {
            scale: 1,
            transformOrigin: "bottom center"
        });
    })
})

// HOVER ROAD -->

let smallCar = document.querySelector("#carjob1");
smallCar.style.display="block";
//let myJob = document.querySelectorAll("#job1");
let texts = document.querySelectorAll("#timeline text, #timeline .zoom");

const svg = document.querySelector("#timeline");
texts.forEach(t => {
    t.addEventListener('mouseover', moveCar)
    t.addEventListener('click', moveCar)
})
function moveCar(e){

        //console.log(e.target.getBoundingClientRect())
        let pt = svg.createSVGPoint();
        pt.x=e.clientX;
        pt.y=e.clientY;
        let svgPt = pt.matrixTransform(svg.getScreenCTM().inverse())
        console.log(svgPt)
        TweenMax.to(smallCar, 1.5, {
            ease: Power4.easeInOut,
            y: svgPt.y-50
        });

}
//console.log(texts)

//TIMELINE MODAL WINDOWS

function getSingleEvent(EventId) {
    fetch("http://bonitamultimedia.com/wordpress/wp-json/wp/v2/tracks/" + EventId + "/?_embed").then(res => res.json()).then(showSingleEvent);
}


function showSingleEvent(data) {
    console.log(data)
    document.querySelector(".modal-name").textContent = data.title.rendered;
    document.querySelector(".modal-company").textContent = data.acf.company;
    document.querySelector(".modal-activities").textContent = data.acf.activities;
    document.querySelector(".modal-scope").textContent = "Scope: " + data.acf.scope;
    document.querySelector(".modal-dates").textContent = data.acf.dates;
    document.querySelector(".modal-achievements").textContent = data.acf.achievements;
    if (data._embedded) {
        document.querySelector('.modal-image').setAttribute("src", data._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
    } else {
        document.querySelector('.modal-image').setAttribute("src", '');
    }
    document.querySelector('#modal').classList.toggle("hide");
}


let detailsButton = document.querySelector("#job1");
let eduButton = document.querySelector("#edu1");

detailsButton.addEventListener('click', function () {
    //showDetails(theTrack);
    //console.log(detailsButton.dataset.id)
    getSingleEvent(detailsButton.dataset.id);

});

eduButton.addEventListener('click', function () {
    getSingleEvent(eduButton.dataset.id)
});

function hideModal() {
    modal.classList.add('hide');
}

modal.addEventListener('click', hideModal);


// POP UP WINDOW -->
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}



//SMOOTH SCROLL
$(document).ready(function () {
    // Add smooth scrolling to all links
    $(".smooth").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});


//CLASS TOGGLES
	// init controller
	var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 600}});

	// build scenes
	new ScrollMagic.Scene({triggerElement: "#mytimeline"})
					.setClassToggle("#mybackground", "active") // add class toggle
					.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
	new ScrollMagic.Scene({triggerElement: "#projects"})
					.setClassToggle("#myportfolio", "active") // add class toggle
					.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
	new ScrollMagic.Scene({triggerElement: "#contacts"})
					.setClassToggle("#mycontact", "active") // add class toggle
					.addIndicators() // add indicators (requires plugin)
					.addTo(controller);


//SCALE LOGO ON SCROLL


	// init controller
	var controller = new ScrollMagic.Controller();
		// build scene
		var scene = new ScrollMagic.Scene({
							triggerElement: "#mycompetences"
						})
						.setTween(".mylogo", 0.5, { scale: 1, force3D:false, ease: Power4.easeInOut, y: -33, z:0.01}) // trigger a TweenMax.to tween
						.addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
						.addTo(controller);


//PORTFOLIO SECTION

$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');

        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');

        }
    });

    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});
