<script setup>
import qari from '@/assets/data/qari.json'
const router = useRoute()
let surahNumber = router.params.number;

const urduTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/ur.maududi`
const englishTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
const url = `https://api.alquran.cloud/v1/surah/${surahNumber}`
const { data: surah, pending } = await useFetch(url)

let urduTranslation = ref(null);
let isTranslations = ref(false);
let loadingTranslations = ref(true);




const { data: translation, pending: loadingTrans } = await useFetch(urduTranslationApi)
urduTranslation.value = translation.value
isTranslations.value = true
loadingTranslations.value = false





let surahName = ref(`${surah.value.data.englishName} - ${surah.value.data.name}`);
let autoPlay = ref(true);
let showMenu = ref(false)

surah.value.data.ayahs.forEach((ayah) => {
    ayah.playing = false
    ayah.loadingAudio = false
})
let selectTranslation = ref("urdu");
let isPlayAudio = ref(false);
let showDetails = ref(false);
let selectedRecitation = ref("128/ar.alafasy");
async function showTranslations() {
    // urduTranslation.value = null
    isTranslations.value = false
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

onMounted(() => {
    // showTranslations()
})

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

        }

        // Create a new Audio object and play W
        audio = new Audio(`https://cdn.islamic.network/quran/audio/${selectedRecitation.value}/${ayahNumber}.mp3`);

        // audio = new Audio(audioUrl);
        await audio.play();
        ayah.loadingAudio = false;
        ayah.playing = true;

        // Add an event listener to set isPlayAudio to false when the audio playback ends
        audio.addEventListener('ended', () => {

            if (autoPlay.value == true && index < surah.value.data.ayahs.length - 1) {
                ayahNumber++;
                index++;
                playAudio(ayahNumber, index)
            } else {
                isPlayAudio.value = false;
                ayah.playing = false;

            }
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
    <transition name="menu" mode="out-in">
        <div class="menu" v-if="showMenu">
            <div class="translation-menu">
                <label for="selectTranslation">Translation</label>
                <select name="" id="selectTranslation" v-model="selectTranslation" @change="showTranslations()">
                    <!-- <option value="" disabled selected>Translation</option> -->
                    <option value="urdu">Urdu</option>
                    <option value="english">English</option>
                    <option value="none">None</option>
                </select>
            </div>

            <div class="recitation-menu">
                <label for="selectRecitation">Recitation</label>
                <select v-model="selectedRecitation" id="selectRecitation">
                    <!-- <option disabled selected>Recitation</option> -->
                    <option v-for="q in qari" :value="q.bitRate + '/' + q.iden">{{ q.name }}</option>
                </select>
            </div>
            <div class="show-details">
                <label for="show-details">Details</label>
                <input type="checkbox" name="" id="show-details" v-model="showDetails">
            </div>
            <div class="show-details">
                <label for="show-details">Autoplay</label>
                <input type="checkbox" name="" id="show-details" v-model="autoPlay">
            </div>



        </div>


    </transition>

    <div class="menu-toggle-wrapper">
        <div class="menu-toggle" @click="showMenu = !showMenu">
            <span class="bar"></span>
            <!-- <span class="arrow"></span> -->
            <!-- <i class="fas fa-sort-down arrow"></i> -->
            <span class="option" v-if="!showMenu">
                Options
            </span>

            <span class="option" v-else>
                Close
            </span>
        </div>
    </div>
    <section>




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

                    <div v-show="!showDetails" class="ayah-numbering">
                        <span>{{ surah.data.number }} : {{ index + 1 }}</span>
                    </div>

                    <div class="ayah-text">
                        <p>
                            {{ ayahs.text }}
                        </p>

                    </div>
                    <div v-if="loadingTranslations" class="loading-translations w-100 flex-center">
                        <i class="fa fa-spinner"></i>

                    </div>
                    <div v-else>
                        <div v-if="!loadingTrans && selectTranslation == 'urdu'" class="ayah-urdu-translation">
                            <p>{{ urduTranslation.data.ayahs[index].text }}</p>
                        </div>

                        <div v-if="isTranslations && selectTranslation == 'english'" class="ayah-english-translation">
                            <p>{{ urduTranslation.data.ayahs[index].text }}</p>
                        </div>

                    </div>

                    <div class="ayah-details" v-show="showDetails">
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


.menu-toggle-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-top: -2.8rem;

    // img {
    //     width: 100px;
    //     height: 70px;
    //     position: absolute;
    //     top: -12px;

    //     @media (max-width: 850px) {
    //         height: 50px;
    //         width: 15px;
    //     }
    // }
}

.menu-toggle {
    position: relative;
    width: 100%;
    height: 50px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    // margin-top: -2.8rem;

    span.option {
        padding: 0.6rem 0.5rem 0.4rem 0.5rem;

        // border: 1px solid var(--accent);
        background: var(--primary);
        color: var(--accent);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        font-weight: 600;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

}

.menu-toggle .bar {
    position: absolute;
    top: 3;

    // top: 13px;
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
    z-index: 1;
}

.menu-toggle .arrow {
    position: absolute;
    top: 0px;
    width: 100%;

    transition: all 0.2s ease-in-out;
}

.menu-toggle.active .bar {
    transform: rotate(45deg);
    background-color: #fff;
}

.menu-toggle.active .arrow {
    transform: rotate(-135deg);
    border-color: #fff;
}


input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 5px;
    cursor: pointer;
    position: relative;
    top: 2px;
}

input[type="checkbox"]:checked::before {
    content: "\f00c";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


.menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    position: relative;
    background: var(--primary);
    flex-wrap: wrap;
    top: 0;

    @media (max-width: 850px) {
        flex-direction: column;
        height: 200px;
        justify-content: center;
        align-items: flex-start;


    }

    div {
        @media (max-width: 850px) {
            margin: auto 2rem;
        }
    }

    label {
        color: var(--accent);
        margin-right: 1rem;
        font-size: 1.1rem;


    }

    #selectRecitation {
        @media (max-width: 850px) {
            margin-top: 1rem;
        }
    }
}

.menu-enter-active {
    animation: slide-down 0.3s;
}

.menu-leave-active {
    animation: slide-up 0.3s;
}

.translation-menu select,
.recitation-menu select {
    // border: none;
    // background: none;
    color: var(--accent);
    background: var(--primary);
    padding: 0rem 0.4rem;
    font-size: 14px;
    border: 2px solid var(--accent);
    border-radius: 6px;
}

.translation-menu select:focus,
.recitation-menu select:focus {
    outline: none;
}

// .translation-menu::after,
// .recitation-menu::after {
//     content: "\f107";
//     font-family: "Font Awesome 5 Free";
//     font-weight: 900;
//     color: #fff;
//     margin-left: 10px;
//     font-size: 14px;
// }

.show-details input[type="checkbox"] {
    margin-right: 5px;
}

@keyframes slide-down {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-100%);
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
    font-family: 'ar-ALHAWE_QURAN';
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
            font-family: 'Noorehira', sans-serif;
            direction: rtl;
            position: relative;

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

    .ayah-numbering {
        width: 100%;
        display: flex;

        span {
            border: 1px solid var(--primary);
            padding: 0.1rem 0.2rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 500;
        }
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