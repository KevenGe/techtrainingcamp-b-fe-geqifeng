<template>
    <div>
        <div @click="handleSettingShow" :class="iconClass">

            <template v-if="white">
                <img src="../assets/setting-white.svg" alt="设置">
            </template>
            <template v-else>
                <img src="../assets/setting.svg" alt="设置">
            </template>
        </div>
        <div :class="settingStyle" id="setting">
            <div class="setting-header">
                <div @click="handleSettingShow">
                    &lt; CLOSE
                </div>
            </div>

            <!-- 选项的项目 -->
            <div class="item-list">
                <div class="item">
                    <div>浏览设置</div>
                    <div>
                        <div>
                            <div>显示来源（作者）</div>
                            <div>
                                <sliding-block v-model="$store.state.showAuthor"></sliding-block>
                            </div>
                        </div>
                        <div>
                            <div>
                                显示创建时间
                            </div>
                            <div>
                                <sliding-block v-model="$store.state.showCreatedTime"></sliding-block>
                            </div>
                        </div>
                        <div>
                            <div>
                                显示搜索标签
                            </div>
                            <div>
                                <sliding-block v-model="$store.state.showTags"></sliding-block>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div>其他设置</div>
                    <div>
                        <div>
                            <div>
                                显示搜索候选
                            </div>
                            <div>
                                <sliding-block v-model="$store.state.showSearchCandidate"></sliding-block>
                            </div>
                        </div>
                        <div>
                            <div>
                                无限加载
                            </div>
                            <div>
                                <sliding-block v-model="$store.state.unlimitedScroll"></sliding-block>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SlidingBlock from "./SlidingBlock";

    export default {
        name: "Setting",
        components: {SlidingBlock},
        props: {
            white:{
                type:Boolean,
            }
        },
        data: function () {
            return {
                show: false,
                settingStyle: "setting",
                iconClass: "setting-icon",

                val1: false,
            }
        },
        watch: {
            show: function () {
                if (this.show) {
                    this.settingStyle = "setting-show";
                } else {
                    this.settingStyle = "setting";
                }
            }
        },
        mounted: function () {
            this.continueAnimotion();
        },
        methods: {
            handleSettingShow: function () {
                this.show = !this.show;
            },

            test: function () {
                console.log(this.$store.state.simpleMode);
            },

            continueAnimotion: function () {
                switch (this.iconClass) {
                    case "setting-icon":
                        this.iconClass = "setting-icon-half";
                        break;
                    case "setting-icon-half":
                        this.iconClass = "setting-icon-all";
                        break;
                    case "setting-icon-all":
                        this.iconClass = "setting-icon-half";
                        break;
                }
                // console.log(this.iconClass);
                setTimeout(this.continueAnimotion, 1000);
            }
        }
    }
</script>

<style lang="less" scoped>
    .setting-icon {
        display: inline-block;
        height: 10vh;

        img {
            height: 5vh;
            transition: 1s;
            transform: rotateZ(0deg);
            transform-origin: 50% 50%;
        }

        &-half {
            img {
                height: 5vh;
                transition: 1s;
                transform: rotateZ(180deg);
                transform-origin: 50% 50%;
            }
        }

        &-all {
            img {
                height: 5vh;
                transition: 1s;
                transform: rotateZ(0deg);
                transform-origin: 50% 50%;
            }
        }
    }

    .setting {
        height: 100vh;
        width: 100vw;
        background-color: white;

        position: absolute;
        top: 0;
        left:0;

        transition: 1s;
        transform: translateX(-120%);

        z-index: 99;
    }

    .setting-show {
        height: 100vh;
        width: 100vw;

        background-color: white;
        position: absolute;
        top: 0;

        transition: 1s;
        transform: translateX(0);

        z-index: 99;
    }

    .setting-header {
        height: 7vh;
        text-align: center;
        border-bottom: 1px solid gray;

        div {
            display: inline-block;
            margin: 1vh 4vw;
            line-height: 5vh;
            /*border: 1px solid gray;*/
            background-color: #035aa6;
            color: white;
            border-radius: 10px;
            padding-left: 2vw;
            padding-right: 2vw;

            &:nth-of-type(1) {
                float: left;
            }

            &:nth-of-type(2) {
                float: right;
            }

        }
    }

    .item-list {
        text-align: left;
        margin-left: 10vw;
        margin-right: 10vw;

        .item {
            & > div {
                &:first-of-type {
                    text-align: center;
                    font-weight: bold;
                    padding-top: 2vh;
                    padding-bottom: 1vh;
                    border-bottom: 1px solid gray;
                }

                &:nth-of-type(2) {
                    & > div {
                        overflow: auto;
                        padding-top: 1vh;
                        padding-bottom: 1vh;
                        border-bottom: 1px solid gray;

                        & > div {
                            &:first-of-type {
                                float: left;
                            }

                            &:nth-of-type(2) {
                                float: right;
                            }
                        }
                    }

                }
            }
        }
    }
</style>