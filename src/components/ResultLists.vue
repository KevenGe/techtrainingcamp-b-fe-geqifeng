<template>
    <div class="top" id="results-top">
        <template v-for="page in pages">
            <div :key="page" :class="pageClasses[page-1]" :id="'page'+page">
                <result-list
                        :searchText="searchText"
                        :currentPage="page"
                        :num-of-page="numOfPage"
                        :unlimited-scroll="unlimitedScroll"
                        :show-created-time="$store.state.showCreatedTime"
                        :show-tags="$store.state.showTags"
                        :show-author="$store.state.showAuthor"></result-list>
            </div>
        </template>
    </div>
</template>

<script>
    import ResultList from "./ResultList";

    export default {
        name: "ResultLists",
        model: {
            prop: "currentPage",
            event: "changePage"
        },
        components: {
            ResultList
        },
        props: {
            // 当前的搜索内容
            searchText: {
                type: String
            },
            // 当前的页码
            currentPage: {
                type: Number,
            },
            // 每页的数量
            numOfPage: {
                type: Number
            },
            // 无线滚动
            unlimitedScroll: {
                type: Boolean
            }
        },
        data: function () {
            return {
                pages: [],
                pageClasses: [],
                pageElements: [],
                beforePage: 1,
            }
        },
        watch: {
            currentPage: function () {
                // 更改不同的界面的类
                if (this.currentPage > this.beforePage) {

                    // 下一页，向左滑
                    if (this.currentPage >= this.pages.length) {
                        this.pages.push(this.pages.length + 1);
                        this.pageClasses.push("hide-right");
                    } else {
                        this.pages = this.pages.slice(0); // 刷新
                    }

                    this.pageClasses[this.beforePage - 1] = "hide-left";
                    this.pageClasses[this.currentPage - 1] = "show";
                } else if (this.currentPage < this.beforePage) {
                    // 上一页，向右滑
                    this.pages = this.pages.slice(0); // 刷新
                    this.pageClasses[this.beforePage - 1] = "hide-right";
                    this.pageClasses[this.currentPage - 1] = "show";
                }

                this.beforePage = this.currentPage;
            },
            unlimitedScroll:function () {
                // 如果当前是无线循环，那么只加载一个页面
                this.pages = new Array(1);
                this.pages[0] = 1;

                this.pageClasses = new Array(1);
                this.pageClasses[0] = "show";

                this.beforePage = this.currentPage;
            }
        },
        mounted: function () {
            if (this.$store.state.unlimitedScroll) {
                // 如果当前是无线循环，那么只加载一个页面
                this.pages = new Array(1);
                this.pages[0] = 1;

                this.pageClasses = new Array(1);
                this.pageClasses[0] = "show";

                this.beforePage = this.currentPage;
            } else {
                // 初始化Page
                this.pages = new Array(this.currentPage + 1);
                for (let i = 0; i <= this.currentPage; i++) {
                    this.pages[i] = i + 1;
                }

                // 初始化PageClasses
                this.pageClasses = new Array(this.currentPage + 1);
                for (let i = 0; i <= this.currentPage; i++) {
                    this.pageClasses[i] = "hide-left";
                }
                this.pageClasses[this.currentPage - 1] = "show";
                this.pageClasses[this.currentPage] = "hide-right";

                this.setTouchMove("results-top");
                this.$nextTick(function () {
                    // console.log(document.getElementById("page1"));
                    this.pageElements = new Array(this.currentPage + 1);
                    for (let i = 0; i <= this.currentPage; i++) {
                        this.pageElements[i] = document.getElementById("page" + (i + 1));
                    }
                });

                this.beforePage = this.currentPage;
            }
        },
        updated: function () {
            // 在更新的时候更新元素Element
            if (this.$store.state.unlimitedScroll === false && this.pages.length > this.pageElements.length) {
                for (let i = 0; i <= this.currentPage; i++) {
                    this.pageElements[i] = document.getElementById("page" + (i + 1));
                }
            }
            // 在更新的时候更新页面的高度，达到高速自适应的功能
            this.updateTopHeight();
        },
        methods: {
            /**
             * @description 更新本页面的高度
             */
            updateTopHeight: function () {
                // 设置显示的高度
                document.getElementById("results-top").style.height = document.getElementById("page" + this.currentPage).clientHeight + 10 + "px";
            },

            /**
             * @description 设置页码
             */
            setCurrentPage: function (offset) {
                if (this.currentPage + offset >= 0) {
                    this.isSlide = true;
                    this.$emit("changePage", this.currentPage + offset);
                }
            },

            /**
             * 给展示添加触摸事件
             * @param elementId
             */
            setTouchMove: function (elementId) {
                let top = document.getElementById(elementId);

                let sx = 0;
                let ex = 0;

                let _this = this;

                top.addEventListener("touchstart", function (e) {
                    sx = e.touches[0].clientX;
                    _this.pageElements[_this.currentPage - 1].style = "";
                    _this.pageElements[_this.currentPage - 1].style.transition = "0s";
                }, false);

                top.addEventListener("touchmove", function (e) {
                    ex = e.touches[0].clientX;
                    _this.pageElements[_this.currentPage - 1].style.transform = "translateX(" + (ex - sx) + "px)";
                }, false);

                top.addEventListener("touchend", function () {
                    if (Math.abs(ex - sx) > 100) {
                        if (ex < sx) {
                            // 向左滑，下一页
                            if (_this.unlimitedScroll) {
                                _this.pageElements[_this.currentPage - 1].style.transition = "0.5s";
                                _this.pageElements[_this.currentPage - 1].style.transform = "translateX(" + 0 + "px)";
                                _this.pageElements[_this.currentPage - 1].className = "show";
                            } else {
                                _this.pageElements[_this.currentPage - 1].className = "hide-left";
                                _this.pageElements[_this.currentPage - 1].style = null;

                                _this.pageElements[_this.currentPage].className = "show";
                                _this.pageElements[_this.currentPage].style = null;

                                _this.setCurrentPage(1);
                            }
                        } else {
                            // 向右滑，上一页
                            if (_this.currentPage === 1 || _this.unlimitedScroll) {
                                _this.pageElements[_this.currentPage - 1].style.transition = "0.5s";
                                _this.pageElements[_this.currentPage - 1].style.transform = "translateX(" + 0 + "px)";
                                _this.pageElements[_this.currentPage - 1].className = "show";
                            } else {
                                _this.pageElements[_this.currentPage - 1].className = "hide-right";
                                _this.pageElements[_this.currentPage - 1].style = null;

                                _this.pageElements[_this.currentPage - 2].className = "show";
                                _this.pageElements[_this.currentPage - 2].style = null;

                                _this.setCurrentPage(-1);
                            }
                        }
                    } else {
                        // 在没有达到翻页条件的情况下，回复原来位置，包含过渡动画
                        _this.pageElements[_this.currentPage - 1].style.transition = "0.5s";
                        _this.pageElements[_this.currentPage - 1].style.transform = "translateX(" + 0 + "px)";
                        _this.pageElements[_this.currentPage - 1].className = "show";
                    }

                }, false);
            }
        }
    }
</script>

<style lang="less" scoped>

    .top {
        overflow-x: hidden;
        position: relative;
        width: 100%;
        height: 230vh;
    }

    .show {
        transition: 0.5s;
        transform: translateX(0);
        position: absolute;
        width: 100%;
    }

    .hide-left {
        transition: 0.5s;
        transform: translateX(-100%);
        position: absolute;
        width: 100%;
    }

    .hide-right {
        transition: 0.5s;
        transform: translateX(100%);
        position: absolute;
        width: 100%;
    }

</style>