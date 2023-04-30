<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Cairo');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');

:root {
  --primary: #402e32;
  --secondary: #B87333;
  --accent: #dfe0df;
  --light: #f69333;
}

@font-face {
  font-family: 'Noorehira';
  src: url('@/assets/fonts/noorehira.ttf') format('truetype');


}

@font-face {
  font-family: 'ar-ALHAWE_QURAN';
  src: url('@/assets/fonts/DecoType\ Thuluth\ Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}



h1 {
  font-size: 2rem;
  color: var(--primary);
  font-weight: 600;
}

body {
  background: var(--accent);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.w-100 {
  width: 100%;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.col {
  flex-direction: column;
}

section {
  padding: 2rem 0;

  @media (max-width: 576px) {
    padding: 2rem 0;
  }
}

.container {
  max-width: 1152px;
  padding: 0 15px;
  margin: 0 auto;

  @media (max-width: 414px) {
    padding: 4px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1152px;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-leave-to,
.slide-left-enter {
  transform: translateX(-100%);
}
</style>