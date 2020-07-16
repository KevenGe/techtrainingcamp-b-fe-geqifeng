<template>
    <div>

        <div id="top" style="height:10px;margin-bottom: 30px"></div>
        <search @search="handleSearch" :search-text-initial="searchText" top></search>
        <ResultList style="margin-top: 40px"
                    :searchText="searchText"
                    :currentPage="currentPage"
                    :num-of-page="this.$store.state.numOfPage"
                    :unlimited-scroll="this.$store.state.unlimitedScroll"></ResultList>
        <PageSelect v-model="currentPage"></PageSelect>
        <foot></foot>
        <egg style="z-index: 999"></egg>
    </div>
</template>

<script>
    // import axios from "axios"
    import Search from "../components/Search";
    import ResultList from "../components/ResultList";
    import PageSelect from "../components/PageSelect";
    import Foot from "../components/Foot";
    import Egg from "../components/Egg";

    export default {
        name: "Result",
        components: {
            PageSelect,
            Search,
            ResultList,
            Foot,
            Egg
        },
        data: function () {
            return {
                searchText: "",
                currentPage: 1
            }
        },
        watch: {
            currentPage: function () {
                console.log(this.currentPage);
                window.location.href = "#top";
            },
            searchText: function () {

            }
        },
        mounted: function () {
            this.searchText = this.$route.query.searchText;
        },
        methods: {
            handleSearch: function (searchText) {
                this.searchText = searchText;
                console.log(this.searchText);
                this.$router.push({path: 'result', query: {searchText: searchText, currentPage: 1}})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>