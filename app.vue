<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Cairo');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #402e32;
  --secondary: #B87333;
  --accent: #dfe0df;
  --light: #f69333;
}


h1 {
  font-size: 2rem;
  color: var(--primary);
  /* font-weight: 600; */
}

body {
  background: var(--secondary);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
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
    padding: 0 4px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1152px;
  }
}
</style>