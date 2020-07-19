<template>
    <div>
        <search @search="handleSearch"
                :search-text-initial="searchText"
                top
                fix></search>
        <ResultLists style="margin-top: 40px"
                     :searchText="searchText"
                     v-model="currentPage"
                     :num-of-page="this.$store.state.numOfPage"
                     :unlimited-scroll="this.$store.state.unlimitedScroll"></ResultLists>
        <PageSelect v-model="currentPage"></PageSelect>
        <foot></foot>
        <egg style="z-index: 999" v-model="eggShow">{{ eggText }}</egg>
    </div>
</template>

<script>
    // import axios from "axios"
    import Search from "../components/Search";
    import ResultLists from "../components/ResultLists";
    import PageSelect from "../components/PageSelect";
    import Foot from "../components/Foot";
    import Egg from "../components/Egg";

    export default {
        name: "Result",
        components: {
            PageSelect,
            Search,
            ResultLists,
            Foot,
            Egg
        },
        data: function () {
            return {
                searchText: this.$route.query.searchText,     ///< 搜索的内容
                currentPage: Number(this.$route.query.currentPage),      ///< 当前的页码
                eggText: "",
                eggShow: false
            }
        },
        computed: {
            unlimitedScroll: function () {
                return this.$store.state.unlimitedScroll;
            }
        },
        watch: {
            currentPage: function () {
                console.log(this.currentPage);
                this.$router.push({path: "result", query: {searchText: this.searchText, currentPage: this.currentPage}})
            },
            searchText: function () {
                console.log(this.searchText);
                if (this.searchText === "js") {
                    this.eggText = "JS这门语言很有用哦！";
                    this.eggShow = true;
                } else if (this.searchText === "css") {
                    this.eggText = "CSS可以作出很漂亮的东西";
                    this.eggShow = true;
                } else if (this.searchText === "html") {
                    this.eggText = "HTMl可以很轻松地做出具有一定结构的页面";
                    this.eggShow = true;
                }
            },
            unlimitedScroll: function () {
                if (this.unlimitedScroll) {
                    this.currentPage = 1;
                }
            }
        },
        mounted: function () {
        },
        methods: {
            handleSearch: function (searchText) {
                this.searchText = searchText;
                this.$router.push({path: 'result', query: {searchText: searchText, currentPage: 1}})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>