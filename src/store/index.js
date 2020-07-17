import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        simpleMode: true,
        showCommentNumber: true,
        showCreatedTime: true,
        showTags: true,
        showDescription: true,
        showAuthor: true,

        darkMode: false,
        showSearchCandidate: true,
        languageIsChinese: true,
        numOfPage: 10,
        showSwiper: true,
        unlimitedScroll: false
    },
    mutations: {
        changeSimpleMode: (state) => {
            state.simpleMode = !state.simpleMode;
        },
        changeShowCommentNumber: (state) => {
            state.showCommentNumber = !state.showCommentNumber;
        },
        changeShowCreatedTime: (state) => {
            state.showCreatedTime = !state.showCreatedTime;
        },
        changeShowTags: (state) => {
            state.showTags = !state.showTags;
        },
        changeShowDescription: (state) => {
            state.showDescription = !state.showDescription;
        },

        changeDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        changeShowSearchCandidate: (state) => {
            state.showSearchCandidate = !state.showSearchCandidate;
        },
        changeLanguageIsChinese: (state) => {
            state.languageIsChinese = !state.languageIsChinese;
        },
        changeNumOfPage: (state, payload) => {
            state.numOfPage = payload.numOfPage;
        },
        changeShowSwiper: (state) => {
            state.showSwiper = !state.showSwiper;
        },
        changeUnlimitedScroll: (state, payload) => {
            state.unlimitedScroll = payload.unlimitedScroll;
        }
    },
    actions: {},
    modules: {}
})
