<template>
    <div class="foot">
        <div>Created By Keven Ge</div>
        <div>API Provided By ByteDance</div>
    </div>
</template>

<script>
    export default {
        name: "Foot.vue",
        data: function () {
            return {}
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .foot {
        width: 100%;
        height: 50px;
        background-color: #120136;
        color: white;
        font-size: small;

        div {
            line-height: 25px;
        }
    }
</style>