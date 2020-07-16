<template>
    <div :class="eggClass">
        <div>
            感谢搜索JS哦！
        </div>
    </div>
</template>

<script>
    export default {
        name: "Egg",
        props: {
            go: {
                type: Boolean
            }
        },
        data: function () {
            return {
                eggClass: "egg-hide"
            }
        },
        watch: {
            go: function () {
                if (this.go === true) {
                    this.showAndHide();
                }
            }
        },
        mounted: function () {
            this.showAndHide();
        },
        methods: {
            showAndHide: function () {
                this.eggClass = "egg-hide";
                let _this = this;
                setTimeout(function () {
                    _this.eggClass = "egg";
                    setTimeout(function () {
                        _this.eggClass = "egg-hide";
                    }, 1000)
                }, 1000)
            }
        }
    }
</script>

<style lang="less" scoped>
    .egg {
        position: fixed;
        top: -25vh;
        width: 80vw;
        height: 20vh;
        left: 10vw;
        background-color: #42b983;
        border-radius: 30px;
        box-shadow: 5px 5px 5px gray;
        padding: 10vw;
        box-sizing: border-box;

        transition: 1s;
        transform: translateY(200%);

        div {
            text-align: center;
            margin: auto;
        }
    }

    .egg-hide {
        position: fixed;
        top: -25vh;
        width: 80vw;
        height: 20vh;
        left: 10vw;
        background-color: #42b983;
        border-radius: 30px;
        box-shadow: 5px 5px 5px gray;
        padding: 10vw;
        box-sizing: border-box;
        transition: 1s;
        transform: translateY(0);

        div {
            text-align: center;
            margin: auto;
        }
    }

</style>