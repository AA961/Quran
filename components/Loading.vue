<template>
    <div class="loader-wrapper">
        <div class="loader book">
            <figure class="page"></figure>
            <figure class="page"></figure>
            <figure class="page"></figure>
        </div>
        <h1>Loading</h1>
    </div>
</template>

<style scoped>
h1 {
    color:var(--primary);
    text-align: center;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 12px;
    position: relative;
}

h1:after {
    position: absolute;
    content: "";
    -webkit-animation: Dots 2s cubic-bezier(0, .39, 1, .68) infinite;
    animation: Dots 2s cubic-bezier(0, .39, 1, .68) infinite;
}

.loader {
    margin: 5% auto 30px;
}

.book {
    border: 1px solid var(--accent);
    width: 80px;
    height: 80px;
    position: relative;
    perspective: 150px;
    border-radius: 3px;
}

.page {
    display: block;
    width: 60px;
    height: 85px;
    border: 1px solid var(--accent);
    border-left: 1px solid var(--primary);
    border-radius: 3px;
    margin: 0;
    position: absolute;
    right: -4px;
    top: -4px;
    overflow: hidden;
    background: var(--primary);
    transform-style: preserve-3d;
    -webkit-transform-origin: left center;
    transform-origin: left center;
}

.book .page:nth-child(1) {
    -webkit-animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.6s infinite;
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.6s infinite;
}

.book .page:nth-child(2) {
    -webkit-animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.45s infinite;
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.45s infinite;
}

.book .page:nth-child(3) {
    -webkit-animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.2s infinite;
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.2s infinite;
}


/* Page turn */

@-webkit-keyframes pageTurn {
    0% {
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }

    20% {
        background: var(--accent);
    }

    40% {
        background: var(--light);
        -webkit-transform: rotateY(-180deg);
        transform: rotateY(-180deg);
    }

    100% {
        background: var(--primary);
        -webkit-transform: rotateY(-180deg);
        transform: rotateY(-180deg);
    }
}

@keyframes pageTurn {
    0% {
        transform: rotateY(0deg);
    }

    20% {
        background: var(--accent);
    }

    40% {
        background: var(--light);
        transform: rotateY(-180deg);
    }

    100% {
        background: var(--primary);
        transform: rotateY(-180deg);
    }
}


/* Dots */

@-webkit-keyframes Dots {
    0% {
        content: "";
    }

    33% {
        content: ".";
    }

    66% {
        content: "..";
    }

    100% {
        content: "...";
    }
}

@keyframes Dots {
    0% {
        content: "";
    }

    33% {
        content: ".";
    }

    66% {
        content: "..";
    }

    100% {
        content: "...";
    }
}
</style>