<script setup>
import qari from '@/assets/data/qari.json'
const router = useRoute()
let surahNumber = router.params.number;

const urduTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/ur.maududi`
const englishTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
const url = `https://api.alquran.cloud/v1/surah/${surahNumber}`
const { data: surah, pending } = await useFetch(url)


let surahName = ref(`${surah.value.data.englishName} - ${surah.value.data.name}`);

surah.value.data.ayahs.forEach((ayah) => {
    ayah.playing = false
    ayah.loadingAudio = false
})
let selectTranslation = ref("");
let isTranslations = ref(false);
let urduTranslation = ref(null);
let isPlayAudio = ref(false);
let showDetails = ref(true);
let loadingTranslations = ref(false);
let selectedRecitation = ref("128/ar.alafasy");
async function showTranslations() {

    urduTranslation.value = null
    loadingTranslations.value = true

    if (selectTranslation.value == "urdu") {
        const { data: translation } = await useLazyFetch(urduTranslationApi)
        urduTranslation.value = translation.value
        isTranslations.value = true
        loadingTranslations.value = false

    } else if (selectTranslation.value == "english") {
        const { data: translation } = await useLazyFetch(englishTranslationApi)
        urduTranslation.value = translation.value
        isTranslations.value = true
        loadingTranslations.value = false
    } else if (selectTranslation.value = "none") {
        isTranslations.value = false
        loadingTranslations.value = false
    }

}

let audio = null;

function resetAyah() {
    surah.value.data.ayahs.forEach((ayah) => {
        ayah.playing = false
        ayah.loadingAudio = false
    })
}


async function playAudio(ayahNumber, index) {
    resetAyah()

    const ayah = surah.value.data.ayahs[index];
    ayah.loadingAudio = true;
    if (isPlayAudio.value == true) {
        if (audio !== null) {
            // Pause and reset the current audio playback
            audio.pause();
            audio.currentTime = 0;
            // loadingAudio.value = false;

        }

        // Create a new Audio object and play W
        audio = new Audio(`https://cdn.islamic.network/quran/audio/${selectedRecitation.value}/${ayahNumber}.mp3`);

        // audio = new Audio(audioUrl);
        await audio.play();
        ayah.loadingAudio = false;
        ayah.playing = true;

        // Add an event listener to set isPlayAudio to false when the audio playback ends
        audio.addEventListener('ended', () => {
            isPlayAudio.value = false;
            ayah.playing = false;
            // loadingAudio.value = false;

        });
    }
}

function pauseAudio(ayahNumber, index) {
    resetAyah()
    const ayah = surah.value.data.ayahs[index];
    ayah.loadingAudio = false;
    ayah.playing = false;


}


// Add a watcher to the isPlayAudio.value reactive variable
watch(isPlayAudio, (newVal, oldVal) => {
    if (newVal === false && oldVal === true) {
        // Pause and reset the current audio playback
        if (audio !== null) {
            audio.pause();
            // audio.currentTime = 0;
        }
    }
});



useHead({
    title: surahName,
    meta: [
        {
            name: 'description',
            content: 'Al-Quran Online is a free website that allows you to read, listen to, and explore the Quran. Discover its teachings, learn the Arabic language, and deepen your understanding of Islam'
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
})
</script>

<template>
    <section>
        <div class="menu">
            <div class="translation-menu">
                <select name="" id="" v-model="selectTranslation" @change="showTranslations()">
                    <option value="" disabled selected>Translation</option>
                    <option value="urdu">Urdu</option>
                    <option value="english">English</option>
                    <option value="none">None</option>
                </select>
            </div>

            <div class="recitation-menu">
                <select v-model="selectedRecitation">
                    <option disabled selected>Recitation</option>
                    <option v-for="q in qari" :value="q.bitRate + '/' + q.iden">{{ q.name }}</option>
                </select>
            </div>
            <div class="show-details">
                <label for="show-details">Details</label>
                <input type="checkbox" name="" id="show-details" v-model="showDetails">
            </div>



        </div>
        <div class="container">
            <div v-if="pending">
                <Loading />
            </div>
            <div>
                <!-- <button @click="showTranslations">Show</button> -->
                <h2 class="surah-number">{{ surah.data.number }}.</h2>

                <h1 class="surah-name">{{ surah.data.name }}</h1>
                <div class="ayah" v-for="(ayahs, index) in surah.data.ayahs" :key="index">
                    <span class="ayah-number-surah">{{ ayahs.numberInSurah }}.</span>

                    <span class="play" v-if="!ayahs.playing" @click="isPlayAudio = true, playAudio(ayahs.number, index)">
                        <i class=" 	fas fa-circle-notch" v-if="ayahs.loadingAudio"></i>
                        <i class="fa fa-play-circle" v-else></i>
                    </span>
                    <span class="play" v-else @click="isPlayAudio = false, pauseAudio(ayahs.number, index)">
                        <!-- <IconsPause /> -->
                        <i class="fa fa-stop-circle"></i>

                    </span>

                    <div class="ayah-text">
                        <p>{{ ayahs.text }}</p>
                    </div>
                    <div v-if="loadingTranslations" class="loading-translations w-100 flex-center">
                        <i class="fa fa-spinner"></i>

                    </div>
                    <div v-else>
                        <div v-if="isTranslations && selectTranslation == 'urdu'" class="ayah-urdu-translation">
                            <p>{{ urduTranslation.data.ayahs[index].text }}</p>
                        </div>

                        <div v-if="isTranslations && selectTranslation == 'english'" class="ayah-english-translation">
                            <p>{{ urduTranslation.data.ayahs[index].text }}</p>
                        </div>

                    </div>

                    <div class="ayah-details" v-if="showDetails">
                        <span class="ayah-number">Ayah : {{ ayahs.number }}</span>
                        <span class="surah-ruku">Ruku : {{ ayahs.ruku }}</span>
                        <span class="juz">Juz : {{ ayahs.juz }}</span>
                        <span class="manzil">Manzil : {{ ayahs.manzil }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.container {
    padding: 2rem;
}

.loading-translations {
    color: var(--primary);

    .fa-spinner {
        font-size: 2rem;
        margin: 1rem;
    }
}

.fa-spinner,
.fa-circle-notch {
    animation: spin 2s linear infinite;

}


@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 1rem;
    flex-wrap: wrap;
    div{
        margin: 0.3rem;
    }

    .translation-menu,
    .recitation-menu {
        select {
            padding: 6px;
            font-size: 1rem;
            cursor: pointer;
            outline: none;
            border: none;
            border-bottom: 6px;
            background: var(--primary);
            color: var(--accent);
            border-radius: 10px;
        }
    }

    .show-details {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary);
        color: var(--accent);
        border-radius: 10px;
        padding: 0rem 0.4rem;

        label {
            margin: 0.4rem;
        }
    }
}


.surah-number {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 8px;
    margin-right: -4px;
    text-align: right;

}

.surah-name {
    text-align: right;
    margin-right: 1rem;
    font-size: 3rem;
}

.ayah {
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    .ayah-text {
        color: var(--primary);
        font-size: 2rem;
        font-weight: 500;
        word-spacing: 4px;

        p {
            font-family: 'noorehira', sans-serif !important;
            text-align: end;
        }
    }

    .ayah-urdu-translation {
        margin: 1rem auto;
        color: var(--primary);
        font-size: 1.1rem;
        font-weight: 500;
        word-spacing: 4px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        p {
            text-align: end;
            font-family: 'Noto Nastaliq Urdu', serif;

        }
    }

    .ayah-english-translation {
        margin: 1rem auto;
        color: var(--primary);
        font-size: 1.1rem;
        font-weight: 500;
        word-spacing: 4px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        p {
            text-align: start;

        }
    }

    .ayah-number-surah {
        color: var(--accent);
        font-weight: 600;
        margin-bottom: 8px;
        margin-left: -4px;
    }

    .ayah-details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;


        span {
            display: block;
            margin-left: 1rem;
            margin-top: 1rem;
        }
    }
}
</style>