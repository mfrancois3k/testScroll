const selector = {
    words: Splitting({
        target: '.hero_paragraph_text',
        by: 'words',
    }),
    image: document.querySelector('.hero_background_image'),
    navItems: document.querySelectorAll('.nav_item'),
}

const initLenis = () => {
    const lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update)
    
    gsap.ticker.add((time) => lenis.raf(time * 1000)); 
    gsap.ticker.lagSmoothing(0);
    initScroll()

}

const initScroll = () => {
    gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
    gsap.set('.word', { autoAlpha: 0.4 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
        },
    });

    tl.to('.word', {
        duration: 2,
        autoAlpha: 1,
        stagger: 1,
    })
        .to(
            selector.image,
            {
                duration: 20,
                scale: 0.95,
                autoAlpha: 0,
                yPercent: -5,
            },
            0
        )
        .to(
            [selector.navItems[1], selector.navItems[2]],
            {
                duration: 20,
                yPercent: -100,
                autoAlpha: 0,
            },
            0
        );
};


window.addEventListener('DOMContentLoad', initLenis)


