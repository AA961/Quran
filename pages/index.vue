<script setup>
import fav from '../assets/imgs/quran.ico'
const url = "https://api.alquran.cloud/v1/surah"
const { data, pending } = await useLazyAsyncData('count', () => $fetch(url))

useHead({
    title: " Al-Quran Online - Read, Listen, and Explore the Quran",
    meta: [
        {
            name: 'description',
            content: 'Al-Quran Online is a free website that allows you to read, listen to, and explore the Quran. Discover its teachings, learn the Arabic language, and deepen your understanding of Islam.'
        },
        {
            name: 'keywords',
            content: "Quran, Al-Quran , online Quran , Quran reading, Quran listening, Quran exploration, Islamic teachings, Arabic language, Islamic studies"
        },
        {
            name: "content-language",
            lang: 'eng'
        }
    ],
    links: [
        {
            rel: 'icon',
            href: fav
        }
    ]
})
</script>
  
<template>
    <section>
        <div class="container">
            <h1>Surahs of the Quran</h1>
            <div v-if="pending">
                <Loading />
            </div>
            <div v-else>
                <div v-for="(surah, index) in data.data" :key="index">
                    <div class="surah-details">
                        <span class="surah-number">{{ surah.number }}.</span>
                        <nuxt-link :to="'/surah/' + surah.number" class="surah-name">
                            <h2>{{ surah.name }}</h2>
                        </nuxt-link>
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
.surah-details {
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

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