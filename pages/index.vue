<script setup>
const url = "https://api.alquran.cloud/v1/surah"
const { data, pending } = await useLazyAsyncData('count', () => $fetch(url))
const surahClass = (surah) => {
  return surah.revelationType == 'Meccan' ? 'surah-details makki' : 'surah-details madni';
}

// useHead({
  
// })
</script>
  
<template>
    <section>
        <div class="container">
            <!-- <h1>Quran Majeed</h1> -->
            <img src="@/assets/imgs/quran.png" class="head-img" alt="">
            <div v-if="pending">
                <Loading />
            </div>
            <div v-else class="w-100">
              
                <div v-for="(surah, index) in data.data" :key="index"  class="w-100">
    <div :class="surahClass(surah)" class="w-100">
        <nuxt-link :to="'/surah/' + surah.number" class="surah-name">
        <div class="surah-background"></div>
    </nuxt-link>
      <span class="surah-number">{{ surah.number }}.</span>
        <h2>{{ surah.name }}</h2>
      <h3>{{ surah.englishName }}</h3>
      <p class="name-meaning">{{ surah.englishNameTranslation }}</p>
      <span class="total-ayah">{{ surah.numberOfAyahs }}</span>
      <span class="revelation-type">{{ surah.revelationType }}</span>
    </div>
  </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped >
.head-img{
    width: 60%;
}
 .madni {
    background-color: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  
  /* Makki Surahs */
  .makki {
    background-color: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255,255,255,0.5);
  }

  .surah-background {
  position: absolute;
  border-radius: 10px;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.5;
}

.makki .surah-background {
    background-repeat: no-repeat;
    background-size: cover;

    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),
        url('@/assets/imgs/kabaa.jpg');
}

.madni .surah-background {
    background-repeat: no-repeat;
background-size: cover;
    background: linear-gradient(rgba(56, 199, 9, 0.3), rgba(7, 182, 53, 0.7)),
        url('@/assets/imgs/madina.jpg');}
.container {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.surah-details {
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    .surah-name {
        // font-family: 'Cairo', sans-serif;
        color: var(--accent);
        font-family: 'Amiri', serif;

        cursor: pointer;
        text-decoration: none;
    }

    .surah-number {
        color: var(--accent);
    }
}
</style>