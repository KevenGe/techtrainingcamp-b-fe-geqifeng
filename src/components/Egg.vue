<template>
    <div :class="eggClass">
        <div>
            <div>***彩蛋***</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Egg",
        model: {
            prop: "go",
            event: "closeEgg"
        },
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
        },
        methods: {
            showAndHide: function () {
                this.eggClass = "egg-hide";
                let _this = this;
                this.$emit("closeEgg", false);
                setTimeout(function () {
                    _this.eggClass = "egg";
                    setTimeout(function () {
                        _this.eggClass = "egg-hide";
                    }, 1000)
                }, 500)
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

        transition: 0.5s;
        transform: translateY(200%);

        div {
            text-align: center;
            margin: auto;

            div{
                font-weight: bold;
                margin-bottom: 10px;
            }
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
        transition: 0.5s;
        transform: translateY(0);

        div {
            text-align: center;
            margin: auto;

            div{
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
    }

</style>